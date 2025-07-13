<script lang="ts">
	import { onMount } from 'svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';

	export let selectedImage: string | null = null;
	export let placeholder: string = 'Click Here or Drag and Drop your Image';
	export let className: string = '';
	export let onFileSelected: ((file: File, imageUrl: string) => void) | undefined = undefined;
	export let onFileRemoved: (() => void) | undefined = undefined;

	let isDragOver = false;
	let fileInput: HTMLInputElement;
	// eslint-disable-next-line
	let selectedFile: File | null = null;
	// eslint-disable-next-line
	let dcraw: any;
	let isProcessing = false;

	const rawExtensions = ['.arw', '.srf', '.sr2', 'cr2', 'cr3', '.nef', '.nrw', '.raf', '.rw2'];

	onMount(async () => {
		const script = document.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/npm/dcraw'; //this dynamically loads dcraw library
		script.onload = () => {
			// eslint-disable-next-line
			dcraw = (window as any).dcraw;
		};
		document.head.appendChild(script);
	});

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
		isDragOver = true;
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
		isDragOver = false;
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
		isDragOver = false;

		const files = event.dataTransfer?.files;
		if (files && files.length > 0) {
			processFiles(files);
		}
	}

	function handleClick() {
		if (selectedImage) return; // No upload functionality when already there is an uploaded image.
		fileInput?.click();
	}

	function handleFileInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target.files;
		if (files && files.length > 0) {
			processFiles(files);
		}
	}

	function isRawFile(fileName: string): boolean {
		const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
		return rawExtensions.includes(extension);
	}

	async function processFiles(files: FileList) {
		const file = files[0]; // first file only

		if (!file) return;

		selectedFile = file;
		isProcessing = true;

		try {
			if (isRawFile(file.name)) {
				if (!dcraw) {
					isProcessing = false;
					return;
				}

				const reader = new FileReader();
				reader.onload = (e) => {
					try {
						const buf = new Uint8Array(e.target?.result as ArrayBuffer);

						const thumbnail = dcraw(buf, { extractThumbnail: true });

						const blob = new Blob([thumbnail], { type: 'image/jpeg' });
						const imageUrl = URL.createObjectURL(blob);

						selectedImage = imageUrl;
						isProcessing = false;
						onFileSelected?.(file, imageUrl);
					} catch {
						isProcessing = false;
					}
				};
				reader.readAsArrayBuffer(file);
			} else if (file.type.startsWith('image/')) {
				processRegularImage(file);
			} else {
				console.error('Unsupported file type');
				isProcessing = false;
			}
		} catch (error) {
			console.error('Error processing file:', error);
			isProcessing = false;
		}
	}

	function processRegularImage(file: File) {
		const reader = new FileReader();
		reader.onload = (e) => {
			const imageUrl = e.target?.result as string;
			selectedImage = imageUrl;
			isProcessing = false;
			onFileSelected?.(file, imageUrl);
		};
		reader.readAsDataURL(file);
	}

	function removeImage() {
		// object URL removal(created for RAW thumbnail)
		if (selectedImage && selectedImage.startsWith('blob:')) {
			URL.revokeObjectURL(selectedImage);
		}

		selectedImage = null;
		selectedFile = null;
		isProcessing = false;

		if (fileInput) {
			fileInput.value = '';
		}
		onFileRemoved?.();
	}

	// Clean up object URL if component gets destroyed without user removing the image.
	import { onDestroy } from 'svelte';
	onDestroy(() => {
		if (selectedImage && selectedImage.startsWith('blob:')) {
			URL.revokeObjectURL(selectedImage);
		}
	});
</script>

<div
	class="border-ring relative h-full w-full rounded-lg border-3 border-dashed {isDragOver
		? 'bg-muted/50'
		: ''} {className}"
	on:dragover={handleDragOver}
	on:dragleave={handleDragLeave}
	on:drop={handleDrop}
	on:click={handleClick}
	role="button"
	tabindex="0"
	on:keydown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleClick() : null)}
>
	<Skeleton class="h-full w-full opacity-0" />

	{#if isProcessing}
		<div class="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/20">
			<div class="text-center">
				<div class="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
				<div class="text-sm text-white">Processing RAW file...</div>
			</div>
		</div>
	{:else if selectedImage}
		<img
			src={selectedImage}
			alt="Selected preview"
			class="absolute inset-0 h-full w-full rounded-lg object-cover"
		/>
		<button
			on:click|stopPropagation={removeImage}
			class="absolute top-2 right-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
			aria-label="Remove image"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
	{:else}
		<div class="absolute inset-0 z-10 flex cursor-pointer items-center justify-center">
			{placeholder}
		</div>
	{/if}

	<input
		bind:this={fileInput}
		type="file"
		accept="image/*,.raw,.cr2,.nef,.arw,.dng,.raf,.orf,.rw2,.pef,.srw,.x3f"
		class="hidden"
		on:change={handleFileInput}
	/>
</div>

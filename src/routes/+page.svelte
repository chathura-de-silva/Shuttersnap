<script lang="ts">
	import FileUploader from '$lib/components/file-uploader.svelte';
	import { extractSonyShutterCount } from '$lib/extract';

	let selectedImage: string | null = null;
	let shutterCount: number | null = null;
	let cameraModel: string | null = null;

	async function handleFileSelected(file: File, imageUrl: string) {
		selectedImage = imageUrl;

		// EXIF parsing logic
		const result = await extractSonyShutterCount(file);
		shutterCount = result.shutterCount;
		cameraModel = result.cameraModel;
	}

	function handleFileRemoved() {
		selectedImage = null;
		shutterCount = null;
		cameraModel = null;
	}
</script>

<div class="flex h-[calc(100vh-theme(spacing.24))] flex-col p-8 lg:flex-row">
	<FileUploader
		bind:selectedImage
		className="md:w-3/5"
		onFileSelected={handleFileSelected}
		onFileRemoved={handleFileRemoved}
	/>

	<div class="flex h-full w-full flex-col p-4 md:w-2/5">
		<div class="flex flex-1 basis-1/5 items-center justify-center text-center">
			<h1 class="text-xl font-bold">Shutter Count 👇</h1>
		</div>

		<div class="flex flex-1 basis-4/5 items-center justify-center text-center">
			<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl">
				{shutterCount !== null ? shutterCount.toLocaleString() : '...'}
			</h1>
		</div>
		{#if cameraModel}
			<div
				class="mt-4 flex flex-1 items-center justify-center text-center opacity-100 transition-opacity duration-300"
			>
				<span class="text-lg font-medium">Model: {cameraModel}</span>
			</div>
		{:else}
			<div
				class="pointer-events-none mt-4 flex flex-1 items-center justify-center text-center opacity-0 select-none"
				aria-hidden="true"
			>
				<span class="text-lg font-medium">&nbsp;</span>
			</div>
		{/if}
	</div>
</div>

<script lang="ts">
	import FileUploader from '$lib/components/file-uploader.svelte';

	let selectedImage: string | null = null;
	let shutterCount: number = 12345; // Ignore the initial value, it will be updated after EXIF parsing

	function handleFileSelected(file: File, imageUrl: string) {
		selectedImage = imageUrl;

		// TO be done: EXIF parsing logic here
		// Parse EXIF data and update shutterCount
	}

	function handleFileRemoved() {
		selectedImage = null;
		shutterCount = 0;
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
				{shutterCount.toLocaleString()}
			</h1>
		</div>
	</div>
</div>

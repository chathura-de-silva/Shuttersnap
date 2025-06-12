<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
</script>

<div class="flex h-[calc(100vh-theme(spacing.24))] flex-col p-8 lg:flex-row">
	<div class="border-ring relative h-full w-full rounded-lg border-3 border-dashed md:w-3/5">
		<Skeleton class="h-full w-full opacity-0" />
		<div class="absolute inset-0 z-10 flex items-center justify-center">
			Click Here or Drag and Drop your Image
		</div>
	</div>

	<div class="flex h-full w-full flex-col p-4 md:w-2/5">
		<div class="flex flex-1 basis-1/5 items-center justify-center text-center">
			<h1 class="text-xl font-bold">Shutter Count 👇</h1>
		</div>

		<div class="flex flex-1 basis-4/5 items-center justify-center text-center">
			<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl">12,546</h1>
		</div>
	</div>
</div>

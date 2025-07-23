<script lang="ts">
	import BuyMeACoffeeButton from '$lib/components/BuyMeACoffeeButton.svelte';
</script>

<svelte:head>
	<title>About | Shuttersnap</title>
	<meta
		name="description"
		content="Learn more about Shuttersnap, the easiest way to check your Sony camera's shutter count."
	/>
</svelte:head>

<div
	class="bg-background text-foreground flex min-h-[70vh] flex-col items-center justify-center px-4 py-12"
>
	<div class="bg-card border-border w-full max-w-2xl rounded-xl border p-8 shadow-lg">
		<h1 class="mb-4 text-center text-4xl font-extrabold tracking-tight">
			About <span class="text-primary">Shuttersnap</span>
		</h1>
		<div class="mt-8 flex flex-col items-center gap-4">
			<p class="text-muted-foreground text-md mb-6 text-center">
				<span class="font-semibold">Shuttersnap</span> is a simple, privacy & user-friendly tool
				that helps you instantly check the shutter count and model of your Sony(currently) camera.
				Just pick your RAW file, and get your camera's shutter count in seconds, no installs, no
				signups, no waiting times for uploading and your raw files never leave your device as all
				the processing is done on your browser.
				<br />
				Also it's worth mentioning that this tool is made possible by the underlying mechanism of shutter
				count extraction introduced by
				<a
					href="https://shuttertool.com"
					target="_blank"
					rel="noopener noreferrer"
					class="text-primary italic">shuttertool.com</a
				> which is completely client side and by the dcraw library which is used to extract the embedded
				JPEGs for preview.
			</p>
			<BuyMeACoffeeButton username="chathuradesilva" />
			<span class="text-muted-foreground text-xs">Support the project and help keep it free!</span>
			<span class="text-muted-foreground mt-2 text-xs">
				Found an issue or want to get in touch? Email me at
				<a href="mailto:your@email.com" class="text-primary underline">ac.chathura@gmail.com</a>
			</span>
		</div>
	</div>
</div>

<script lang="ts">
</script>

<svelte:head>
	<title>FAQ | Shuttersnap</title>
	<meta name="description" content="Frequently Asked Questions about Shuttersnap." />
</svelte:head>

<div
	class="bg-background text-foreground flex min-h-[70vh] flex-col items-center justify-center px-4 py-12"
>
	<div class="bg-card border-border w-full max-w-4xl rounded-xl border p-8 shadow-lg">
		<h1 class="mb-4 text-center text-4xl font-extrabold tracking-tight">
			<span class="text-primary">FAQ</span> - Frequently Asked Questions
		</h1>
		<div class="mt-8 flex flex-col gap-8">
			<section>
				<h2 class="text-primary mb-2 text-2xl font-bold">General</h2>
				<ul class="text-md text-muted-foreground list-inside list-disc space-y-4 pl-4">
					<li>
						<span class="text-primary font-semibold">What is Shuttersnap?</span><br />
						Shuttersnap is a free web tool that lets you check your camera's shutter count instantly
						by picking a RAW file.
					</li>
					<li>
						<span class="text-primary font-semibold">What is Shutter Count?</span><br />
						All DSLRs and most of the mirrorless cameras have two moving curtains<span
							class="italic">(Mechanical shutter)</span
						>
						that actuate each time you take a photo. Manufacturers define an
						<span class="font-semibold italic">expected lifetime</span>
						of actuations per model for these shutters<span class="italic"
							>(like 100,000, 200,000 or even more with some pro grade models)</span
						>
						as they wear out with usage and end up failing.
						<span class="italic"
							>(Number of actuations of these two curtains are referred to as the shutter count.)</span
						>
						Although it's replaceable, shutter count is a crucial factor when determining the expected
						lifetime of your camera's shutter and when it comes to camera buying decisions.
					</li>
					<li>
						<span class="text-primary font-semibold">Is this relevant for any camera?</span><br />
						This is valid for all DSLR cameras and most of the mirrorless cameras except some of the
						modern flagship mirrorless cameras like Sony A9 iii, Nikon Z8 and Nikon Z9 where there is
						no mechanical shutter to wear. Instead, they use an electronic shutter mechanism which does
						not wear out as you use it. But with many mirrorless cameras, there is an option to use an
						electronic shutter in addition to the existing mechanical shutter which will not cause an
						increase in at most shutter count.
					</li>
				</ul>
			</section>
			<section>
				<h2 class="text-primary mb-2 text-2xl font-bold">Raw Files</h2>
				<ul class="text-md text-muted-foreground list-inside list-disc space-y-4 pl-4">
					<li>
						<span class="text-primary font-semibold">What file types can I pick?</span><br />
						You can retrieve the shutter counts from the RAW files taken from supported cameras<span
							class="italic">(refer the "Supported Devices" tab)</span
						>. Some common formats include .arw, .sr2, .srf and others.
					</li>
					<li>
						<span class="text-primary font-semibold"
							>How should I transfer raw images for accurate shutter data?</span
						><br />
						Always use raw images directly from the camera without any manipulation or without going
						through a saving pipeline from any third-party software. Make sure the image is
						<strong>completely unedited</strong> and in its original state, as saved by the camera. Open
						your file manager, locate the latest image from the folder, and drag it into the tool.
					</li>
					<li>
						<span class="text-primary font-semibold">What should I avoid?</span><br />
						<ul class="ml-5 list-disc">
							<li>Do <strong>not</strong> use special transfer software.</li>
							<li>Do <strong>not</strong> open or edit the image in any photo editor.</li>
							<li>Editing software often <strong>destroys embedded shutter count data</strong>.</li>
						</ul>
					</li>
				</ul>
			</section>
			<section>
				<h2 class="text-primary mb-2 text-2xl font-bold">Privacy & Security</h2>
				<ul class="text-md text-muted-foreground list-inside list-disc space-y-4 pl-4">
					<li>
						<span class="font-semibold">Are my photos uploaded to a server?</span><br />
						No. All processing happens locally in your browser. Your RAW files never leave your device.
					</li>
					<li>
						<span class="font-semibold">Is any data stored?</span><br />
						No data or images are stored or sent anywhere. Once you close the tab, everything is gone.
						Literally 100% privacy-friendly.
					</li>
				</ul>
			</section>
			<section>
				<h2 class="text-primary mb-2 text-2xl font-bold">Troubleshooting</h2>
				<ul class="text-md text-muted-foreground list-inside list-disc space-y-4 pl-4">
					<li>
						<span class="font-semibold">My file isn't working. What should I do?</span><br />
						Make sure your file is a supported RAW format and is from a supported camera model. Try another
						raw file if it still fails.
					</li>
				</ul>
			</section>
		</div>
		<div class="text-muted-foreground mt-10 text-center text-xs">
			<p>
				Didn't find your answer? Drop me an email on <a
					href="mailto:ac.chathura@gmail.com"
					class="text-primary hover:text-primary/80 italic underline-offset-2 transition-colors hover:underline"
					>ac.chathura@gmail.com</a
				>
			</p>
		</div>
	</div>
</div>

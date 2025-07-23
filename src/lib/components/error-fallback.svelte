<script lang="ts">
	import { base } from '$app/paths';
	export let status: number;
	export let message: string;
</script>

<svelte:head>
	<title>{status} Error | Shuttersnap</title>
</svelte:head>

<div
	class="bg-background text-foreground flex min-h-[70vh] flex-col items-center justify-center px-4 py-12"
>
	<div
		class="bg-card border-border animate-fade-in flex w-full max-w-xl flex-col items-center rounded-xl border py-10 shadow-2xl"
	>
		<div class="mb-6 flex flex-col items-center">
			<h1 class="text-primary mb-2 text-9xl font-extrabold tracking-tight drop-shadow-lg">
				{status}
			</h1>
			<p class="text-muted-foreground mb-2 text-center text-lg font-medium">
				Oops! An error occurred.
			</p>
			<p class="text-foreground text-md mb-4 text-center">
				{message ?? 'Unknown error'}
			</p>
		</div>
		<a
			href={base + '/'}
			class="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring mt-4 inline-block rounded-lg px-6 py-3 text-lg font-semibold shadow transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
		>
			Go back home
		</a>
	</div>
	<div class="text-muted-foreground mt-8 text-center text-xs">
		If you believe this is a bug, please let me know by <a
			href="https://github.com/chathura-de-silva/Shuttersnap/issues"
			target="_blank"
			class="text-primary hover:text-primary/80 underline">opening an issue here.</a
		>.
	</div>
</div>

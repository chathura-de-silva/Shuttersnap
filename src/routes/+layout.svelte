<script lang="ts">
	import NavigationBar from '$lib/components/navigation-bar.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';

	onMount(() => {
		if (location.hostname !== 'localhost') {
			const script = document.createElement('script');
			script.setAttribute('async', '');
			script.setAttribute('data-goatcounter', 'https://chthura.goatcounter.com/count');
			script.src = '//gc.zgo.at/count.js';
			document.body.appendChild(script);
		}
	});
	let { children } = $props();
	let navigationBarRef: NavigationBar;

	function handleClickOutside(event: MouseEvent) {
		navigationBarRef?.handleClickOutside(event);
	}
</script>

<ModeWatcher />
<div onclick={handleClickOutside} role="presentation">
	<NavigationBar bind:this={navigationBarRef} />

	<div class="mt-[73px]">
		{@render children()}
	</div>
</div>

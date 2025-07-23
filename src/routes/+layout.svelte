<script lang="ts">
	import NavigationBar from '$lib/components/navigation-bar.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

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

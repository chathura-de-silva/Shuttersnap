<script lang="ts">
	import ModeToggle from '$lib/components/mode-toggle.svelte';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { page } from '$app/state';
	import { baseRoutes, cn, supportedBrands } from '$lib/utils';
	import { base } from '$app/paths';
	let { children } = $props();
</script>

<ModeWatcher />

<NavigationMenu.Root
	viewport={false}
	class="bg-background/80 fixed top-0 right-0 left-0 z-50
		flex max-w-full items-center justify-between border-b px-6 py-4 shadow-sm backdrop-blur"
>
	<NavigationMenu.List class="relative">
		<NavigationMenu.Item
			class={cn('font-semibold', page.url.pathname === baseRoutes.app && 'bg-accent rounded-lg')}
		>
			<NavigationMenu.Link href={base + baseRoutes.app}>App</NavigationMenu.Link>
		</NavigationMenu.Item>

		<NavigationMenu.Item class="relative">
			<NavigationMenu.Trigger
				class={cn(
					page.url.pathname.startsWith(base + baseRoutes.supportedDevices) && 'bg-accent rounded-lg'
				)}>Supported Devices</NavigationMenu.Trigger
			>
			<NavigationMenu.Content
				class="bg-background/80 absolute top-full left-0 mt-2 min-w-[200px] rounded-lg border p-2 shadow-lg backdrop-blur-sm md:w-auto"
			>
				{#each supportedBrands as brand (brand.path)}
					<NavigationMenu.Link
						href={base + baseRoutes.supportedDevices + '/' + brand.path}
						class={cn(
							'block w-full',
							page.url.pathname.startsWith(base + baseRoutes.supportedDevices + brand.path) &&
								'bg-accent rounded-lg'
						)}>{brand.name}</NavigationMenu.Link
					>
				{/each}
			</NavigationMenu.Content>
		</NavigationMenu.Item>
		<NavigationMenu.Item
			class={cn('font-semibold', page.url.pathname === baseRoutes.faq && 'bg-accent rounded-lg')}
		>
			<NavigationMenu.Link href={base + baseRoutes.faq}>FAQ</NavigationMenu.Link>
		</NavigationMenu.Item>
		<NavigationMenu.Item
			class={cn(
				'font-semibold',
				page.url.pathname.startsWith(baseRoutes.about) && 'bg-accent rounded-lg'
			)}
		>
			<NavigationMenu.Link href={base + baseRoutes.about}>About</NavigationMenu.Link>
		</NavigationMenu.Item>
	</NavigationMenu.List>

	<NavigationMenu.List class="flex items-center gap-4">
		<NavigationMenu.Item>
			<NavigationMenu.Link href={baseRoutes.github} target="_blank">Github</NavigationMenu.Link>
		</NavigationMenu.Item>

		<NavigationMenu.Item>
			<ModeToggle />
		</NavigationMenu.Item>
	</NavigationMenu.List>
</NavigationMenu.Root>

<div class="mt-[73px]">
	{@render children()}
</div>

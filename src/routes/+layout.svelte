<script lang="ts">
	import ModeToggle from '$lib/components/mode-toggle.svelte';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { page } from '$app/state';
	import { cn } from '$lib/utils';
	let { children } = $props();

	const supportedBrands: { name: string; path: string }[] = [
		{ name: 'Sony', path: '/sony' },
		{ name: 'Canon', path: '/canon' },
		{ name: 'Nikon', path: '/nikon' },
		{ name: 'Fujifilm', path: '/fuji' },
		{ name: 'Panasonic', path: '/panasonic' }
	];
	const baseRoutes = {
		app: '/',
		supportedDevices: '/supported',
		about: '/about',
		github: 'https://github.com/chathura-de-silva/Shuttersnap'
	} as const;
</script>

<ModeWatcher />

<NavigationMenu.Root
	viewport={false}
	class="bg-background/80 flex max-w-full items-center justify-between border-b
		px-6 py-4 shadow-sm  backdrop-blur"
>
	<NavigationMenu.List>
		<NavigationMenu.Item class={cn(page.url.pathname === baseRoutes.app && 'bg-accent rounded-lg')}>
			<NavigationMenu.Link href={baseRoutes.app}>App</NavigationMenu.Link>
		</NavigationMenu.Item>

		<NavigationMenu.Item>
			<NavigationMenu.Trigger
				class={cn(
					page.url.pathname.startsWith(baseRoutes.supportedDevices) && 'bg-accent rounded-lg'
				)}>Supported Devices</NavigationMenu.Trigger
			>
			<NavigationMenu.Content>
				<ul class="grid w-[200px] gap-4 p-2">
					<li>
						{#each supportedBrands as brand (brand.path)}
							<NavigationMenu.Link
								href={baseRoutes.supportedDevices + brand.path}
								class={cn(
									page.url.pathname.startsWith(baseRoutes.supportedDevices + brand.path) &&
										'bg-accent rounded-lg'
								)}>{brand.name}</NavigationMenu.Link
							>
						{/each}
					</li>
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>

		<NavigationMenu.Item
			class={cn(page.url.pathname.startsWith(baseRoutes.about) && 'bg-accent rounded-lg')}
		>
			<NavigationMenu.Link href={baseRoutes.about}>About</NavigationMenu.Link>
		</NavigationMenu.Item>
	</NavigationMenu.List>

	<NavigationMenu.List class="flex items-center gap-4">
		<NavigationMenu.Item>
			<NavigationMenu.Link href={baseRoutes.github}>Github</NavigationMenu.Link>
		</NavigationMenu.Item>

		<NavigationMenu.Item>
			<ModeToggle />
		</NavigationMenu.Item>
	</NavigationMenu.List>
</NavigationMenu.Root>

{@render children()}

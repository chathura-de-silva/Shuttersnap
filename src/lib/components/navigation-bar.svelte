<script lang="ts">
	import ModeToggle from './mode-toggle.svelte';
	import * as NavigationMenu from './ui/navigation-menu/index.js';
	import { MoreVertical, X } from '@lucide/svelte/icons';
	import { page } from '$app/state';
	import { baseRoutes, cn, supportedBrands } from '$lib/utils';
	import { base } from '$app/paths';

	let mobileDropdownOpen = $state(false);

	function toggleMobileDropdown() {
		mobileDropdownOpen = !mobileDropdownOpen;
	}

	function closeMobileDropdown() {
		mobileDropdownOpen = false;
	}

	export function handleClickOutside(event: MouseEvent) {
		const target = event.target as Element;
		if (mobileDropdownOpen && !target.closest('[data-dropdown]')) {
			closeMobileDropdown();
		}
	}
</script>

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

		<!-- Supported Devices tab is hidden on mobile, shown on larger screens -->
		<NavigationMenu.Item class="relative hidden md:block">
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

		<!-- FAQ and About tabs are hidden on mobile, shown on larger screens -->
		<NavigationMenu.Item
			class={cn(
				'hidden font-semibold md:block',
				page.url.pathname === baseRoutes.faq && 'bg-accent rounded-lg'
			)}
		>
			<NavigationMenu.Link href={base + baseRoutes.faq}>FAQ</NavigationMenu.Link>
		</NavigationMenu.Item>
		<NavigationMenu.Item
			class={cn(
				'hidden font-semibold md:block',
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

		<!-- Mobile three-dot dropdown: only shown on mobile -->
		<NavigationMenu.Item class="relative md:hidden" data-dropdown>
			<button
				onclick={toggleMobileDropdown}
				class="text-foreground hover:bg-accent focus:ring-ring inline-flex items-center justify-center rounded-md p-2 focus:ring-2 focus:outline-none focus:ring-inset"
				aria-expanded={mobileDropdownOpen}
				aria-label="More options"
			>
				{#if !mobileDropdownOpen}
					<MoreVertical class="h-5 w-5" />
				{:else}
					<X class="h-5 w-5" />
				{/if}
			</button>

			<!-- Mobile dropdown content -->
			{#if mobileDropdownOpen}
				<div
					class="bg-background/95 absolute top-full right-0 mt-2 w-48 rounded-lg border p-2 shadow-lg backdrop-blur-sm"
				>
					<!-- Supported Devices section for mobile -->
					<div class="mb-2">
						<div
							class="text-muted-foreground px-3 py-2 text-xs font-medium tracking-wide uppercase"
						>
							Supported Devices
						</div>
						{#each supportedBrands as brand (brand.path)}
							<a
								href={base + baseRoutes.supportedDevices + '/' + brand.path}
								onclick={closeMobileDropdown}
								class={cn(
									'hover:bg-accent block rounded-md px-4 py-2 text-sm transition-colors',
									page.url.pathname.startsWith(base + baseRoutes.supportedDevices + brand.path) &&
										'bg-accent'
								)}
							>
								{brand.name}
							</a>
						{/each}
					</div>

					<!-- Divider -->
					<div class="my-2 border-t"></div>

					<!-- Other navigation items -->
					<a
						href={base + baseRoutes.faq}
						onclick={closeMobileDropdown}
						class={cn(
							'hover:bg-accent block rounded-md px-3 py-2 text-sm font-medium transition-colors',
							page.url.pathname === baseRoutes.faq && 'bg-accent'
						)}
					>
						FAQ
					</a>
					<a
						href={base + baseRoutes.about}
						onclick={closeMobileDropdown}
						class={cn(
							'hover:bg-accent block rounded-md px-3 py-2 text-sm font-medium transition-colors',
							page.url.pathname.startsWith(baseRoutes.about) && 'bg-accent'
						)}
					>
						About
					</a>
				</div>
			{/if}
		</NavigationMenu.Item>
	</NavigationMenu.List>
</NavigationMenu.Root>

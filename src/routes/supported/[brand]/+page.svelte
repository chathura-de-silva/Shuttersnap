<script lang="ts">
	import { supportedBrands } from '$lib/utils';
	import { page } from '$app/state';
	const { data } = $props();

	const currentBrand = $derived(page.params.brand);
	// Get the current brand details from the loaded data
	const brandDetails = $derived(data?.brandInfo);
</script>

<svelte:head>
	<title>{brandDetails?.name || currentBrand} - Brand Page</title>
	<meta name="description" content="Information about {brandDetails?.name || currentBrand} brand" />
</svelte:head>

<h1>Brand Page</h1>
<p>
	This is the <strong>{brandDetails?.name || currentBrand}</strong> brand page.
</p>

{#if brandDetails}
	<div class="brand-info">
		<h2>Brand Details</h2>
		<p><strong>Name:</strong> {brandDetails.name}</p>
		<p><strong>Path:</strong> {brandDetails.path}</p>
		<!-- Add any other brand-specific information here -->
	</div>
{/if}

<h2>All Supported Brands</h2>
<ul>
	{#each supportedBrands as brand (brand.path)}
		<li>
			<a href="/supported/{brand.path}">
				{brand.name} ({brand.path})
			</a>
		</li>
	{/each}
</ul>

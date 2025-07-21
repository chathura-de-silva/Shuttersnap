import { supportedBrands } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { PageLoadEvent } from './$types';

// this standard function tells sveltekit which routes to pre-render
export async function entries() {
	return supportedBrands.map((brand) => ({
		brand: brand.path
	}));
}

// Load function that runs at build time for each brand
export async function load({ params }: PageLoadEvent) {
	const brandInfo = supportedBrands.find((brand) => brand.path === params.brand);
	if (!brandInfo) {
		throw error(404, `Brand "${params.brand}" not found`);
	}
	// Returning brand information to be used in the component
	return {
		brandInfo
	};
}

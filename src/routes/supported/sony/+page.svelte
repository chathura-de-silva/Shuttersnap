<script lang="ts">
	import { sonyModels, sonySeries } from '$lib/constants';
	import { GroupedTable } from '$lib/components/ui/table';

	// Create a reverse mapping from type number to series name
	const typeToSeries: Record<number, string> = Object.fromEntries(
		Object.entries(sonySeries).map(([k, v]) => [v, k])
	);

	// Group models by series
	const groupedModels: Record<string, Array<{ code: string; name: string }>> = {};
	for (const [code, { name, type }] of Object.entries(sonyModels)) {
		const series = typeToSeries[type];
		if (!groupedModels[series]) groupedModels[series] = [];
		groupedModels[series].push({ code, name });
	}

	const seriesOrder = Object.keys(sonySeries); // To keep order consistent

	const headers = [
		{ key: 'name', label: 'Display Name' },
		{ key: 'code', label: 'Model Code' }
	];
</script>

<svelte:head>
	<title>Support - Sony | Shuttersnap</title>
	<meta name="description" content="Sony cameras supported by Shuttersnap." />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-10">
	<h1 class="text-primary mb-8 text-3xl font-bold">Supported Sony Camera Models</h1>

	<GroupedTable groupedData={groupedModels} {headers} {seriesOrder} />
</div>

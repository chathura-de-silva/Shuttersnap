<script lang="ts">
	import Table from './table.svelte';
	export let groupedData: Record<string, Array<Record<string, unknown>>> = {};
	export let headers: Array<{ key: string; label: string; className?: string }> = [];
	export let seriesOrder: string[] = [];
	export let className: string = '';
</script>

<div class="columns-1 gap-8 [column-fill:_balance] lg:columns-2">
	{#each seriesOrder as series (series)}
		{#if groupedData[series]?.length}
			<div class="mb-8 break-inside-avoid">
				<h2
					class="text-secondary-foreground mb-3 rounded-t-md border-y px-3 py-1 text-xl font-semibold"
				>
					{series} Series
				</h2>
				<Table data={groupedData[series]} {headers} {className} striped={true} hover={true}>
					<svelte:fragment slot="cell" let:row let:header let:value>
						<slot name="cell" {row} {header} {value}>
							{value}
						</slot>
					</svelte:fragment>
				</Table>
			</div>
		{/if}
	{/each}
</div>

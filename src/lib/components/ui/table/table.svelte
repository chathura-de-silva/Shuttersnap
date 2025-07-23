<script lang="ts">
	import { cn } from '$lib/utils';

	export let data: Array<Record<string, unknown>> = [];
	export let headers: Array<{ key: string; label: string; className?: string }> = [];
	export let className: string = '';
	export let striped: boolean = true;
	export let hover: boolean = true;

	// Allow custom cell rendering through slots
	export let cellClass: string = '';
</script>

<div class="border-border bg-card overflow-x-auto rounded-lg border shadow">
	<table
		class={cn(
			'divide-border min-w-full divide-y',
			'bg-background text-foreground',
			'dark:bg-card dark:text-foreground',
			className
		)}
	>
		<thead>
			<tr>
				{#each headers as header (header.key)}
					<th
						class={cn(
							'bg-secondary px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase',
							header.className
						)}
					>
						{header.label}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody class="divide-border divide-y">
			{#each data as row, i (i)}
				<tr
					class={cn(
						striped && i % 2 === 0 ? 'bg-background dark:bg-card' : 'bg-muted/30 dark:bg-muted/10',
						hover && 'hover:bg-accent/30 dark:hover:bg-accent/20 transition-colors'
					)}
				>
					{#each headers as header (header.key)}
						<td
							class={cn(
								'px-4 py-2',
								cellClass,
								header.key === 'code' ? 'font-mono text-sm whitespace-nowrap' : 'text-base'
							)}
						>
							<slot name="cell" {row} {header} value={row[header.key]}>
								{row[header.key]}
							</slot>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

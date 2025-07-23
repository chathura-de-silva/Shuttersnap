<script lang="ts">
	export let username: string = 'yourusername';
</script>

<a
	href={`https://www.buymeacoffee.com/${username}`}
	target="_blank"
	rel="noopener noreferrer"
	class="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 text-lg font-semibold text-black shadow transition-colors hover:bg-yellow-300"
	aria-label="Buy me a coffee"
>
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M17.5 19C17.5 20.3807 16.3807 21.5 15 21.5H9C7.61929 21.5 6.5 20.3807 6.5 19"
			stroke="#000"
			stroke-width="1.5"
			stroke-linecap="round"
		/>
		<path
			d="M20 8.5V13C20 16.3137 17.3137 19 14 19H10C6.68629 19 4 16.3137 4 13V8.5C4 7.11929 5.11929 6 6.5 6H17.5C18.8807 6 20 7.11929 20 8.5Z"
			fill="#FFDD00"
			stroke="#000"
			stroke-width="1.5"
		/>
		<path
			d="M7.5 3.5C7.5 2.67157 8.17157 2 9 2C9.82843 2 10.5 2.67157 10.5 3.5"
			stroke="#000"
			stroke-width="1.5"
			stroke-linecap="round"
		/>
		<path
			d="M13.5 3.5C13.5 2.67157 14.1716 2 15 2C15.8284 2 16.5 2.67157 16.5 3.5"
			stroke="#000"
			stroke-width="1.5"
			stroke-linecap="round"
		/>
	</svg>
	Buy me a coffee
</a>

<script lang="ts">
	import type { EntryListData } from './entry_list';
	import EntryListItem from './entry_list_item.svelte';

	export let data: EntryListData;
</script>

<div class="entry-list">
	{#each data as entry}
		<EntryListItem data={entry} />
	{/each}
</div>

<style>
	.entry-list {
		display: flex;
		flex-direction: column;
	}

	@media (min-width: 768px) {
		.entry-list {
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-evenly;
		}
	}

	@media (min-width: 1024px) {
		.entry-list {
			justify-content: space-between;
		}
	}
</style>

<script lang="ts">
	import type { HabitListData } from './habit_list';
	import HabitListItem from './habit_list_item.svelte';

	export let data: HabitListData;
</script>

<div class="habit-list">
	{#each data as habit}
		<HabitListItem data={habit} />
	{/each}
</div>

<style>
	.habit-list {
		display: flex;
		flex-direction: column;
	}

	@media (min-width: 768px) {
		.habit-list {
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-evenly;
		}
	}

	@media (min-width: 1024px) {
		.habit-list {
			justify-content: space-between;
		}
	}
</style>

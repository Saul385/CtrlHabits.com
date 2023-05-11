<script lang="ts">
	import type { HabitListItemData } from './habit_list';

	export let data: HabitListItemData;
</script>

<div class="habit">
	<h2>
		<a href="/users/{data.user_id}/habits/{data.id}">
			{data.name}
		</a>
	</h2>
	<p>{data.description}</p>
	<p>{data.frequency}</p>
	<p>{data.start_date}</p>
	<p>{data.end_date}</p>
	<p>{data.private}</p>
</div>

<style>
	.habit {
		border: 1px solid black;
		padding: 1rem;
		margin: 1rem;
	}

	.habit h2 {
		margin: 0;
	}

	.habit p {
		margin: 0;
	}
</style>

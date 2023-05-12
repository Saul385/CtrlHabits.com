<script lang="ts">
	import type { EntryListItemData } from './entry_list';

	export let data: EntryListItemData;
</script>

<div class="entry">
	<h2>
		<a href="/users/{data.user_id}/habits/{data.habit_id}/entries/{data.id}">
			{data.date}
		</a>
	</h2>
	<p>{data.value}</p>
	<p>{data.content}</p>
	<p>{data.created_at}</p>
	<p>{data.updated_at}</p>
</div>

<style>
	.entry {
		border: 1px solid black;
		padding: 1rem;
		margin: 1rem;
	}

	.entry h2 {
		margin: 0;
	}

	.entry p {
		margin: 0;
	}
</style>

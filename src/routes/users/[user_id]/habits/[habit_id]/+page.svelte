<script lang="ts">
	import type { PageData } from './$types';
	import UpdateHabitForm from '$lib/components/update_habit_form/update_habit_form.svelte';
	import HabitDetail from '$lib/components/habit_detail/habit_detail.svelte';
	import EntryList from '$lib/components/entry_list/entry_list.svelte';

	export let data: PageData;
</script>

{#if data.habit.data}
	<HabitDetail data={data.habit.data} />
	<UpdateHabitForm data={data.habit.data} />
{:else}
	<p>Error: {data.habit.error}</p>
{/if}

{#if data.entries.data}
	<EntryList data={data.entries.data.entries} />
{:else}
	<p>Error: {data.entries.error}</p>
{/if}

<a href="entries">Add an entry</a>

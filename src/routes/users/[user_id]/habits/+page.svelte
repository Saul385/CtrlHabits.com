<script lang="ts">
	import type { PageData } from './$types';
	import AddHabitForm from '$lib/components/add_habit_form/add_habit_form.svelte';
	import HabitList from '$lib/components/habit_list/habit_list.svelte';

	export let data: PageData;
</script>

<AddHabitForm />

{#if data.habits.data}
	<HabitList data={data.habits.data.habits} />
{/if}

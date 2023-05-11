<script lang="ts">
	import type { PageData } from './$types';
	import UpdateHabitForm from '$lib/components/update_habit_form/update_habit_form.svelte';

	export let data: PageData;
</script>

<UpdateHabitForm {data} />

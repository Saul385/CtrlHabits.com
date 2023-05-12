<script lang="ts">
	import type { PageData } from './$types';
	import UserDetail from '$lib/components/user_detail/user_detail.svelte';
	import UpdateUserForm from '$lib/components/update_user_form/update_user_form.svelte';
	import HabitList from '$lib/components/habit_list/habit_list.svelte';

	export let data: PageData;
</script>

{#if data.profile.data}
	<UserDetail data={data.profile.data} />
{/if}

<hr />

{#if data.habits.data}
	<!-- TODO: Handle pagination -->
	<HabitList data={data.habits.data.habits} />
{/if}

<hr />

{#if data.profile.data && data.profile.data.id === data.user?.id}
	<UpdateUserForm data={data.user} />
{/if}

<script lang="ts">
	import type { PageData } from './$types';
	import EntryDetail from '$lib/components/entry_detail/entry_detail.svelte';
	import UpdateEntryForm from '$lib/components/update_entry_form/update_entry_form.svelte';

	export let data: PageData;
</script>

{#if data.entry.data}
	<EntryDetail data={data.entry.data} />
	<UpdateEntryForm data={data.entry.data} />
{:else}
	<p>Error: {data.entry.error}</p>
{/if}

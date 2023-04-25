<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import type { ExperimentSearchParams } from '$lib/search_params';
	import { parseExperimentSearchParams } from '$lib/search_params';
	import { LOCAL_STORAGE_KEY_EXPERIMENT_PARAMS } from '$lib/env';
	import { LocalStorageKVService } from '$lib/kv/local_storage';
	import { Modals, closeModal } from 'svelte-modals';

	beforeNavigate(async (event) => {
		const kv = makeExperimentKVService();
		if (!kv) {
			return;
		}

		const previousURL = event.from?.url;
		const currentURL = event.to?.url;
		console.log({ previousURL, currentURL }); // TODO: Figure out how to properly persist the experiment search params.

		const experimentSearchParams = parseExperimentSearchParams($page.url);
		await kv.set(LOCAL_STORAGE_KEY_EXPERIMENT_PARAMS, experimentSearchParams);
	});

	afterNavigate(async (event) => {
		const kv = makeExperimentKVService();
		if (!kv) {
			return;
		}

		const previousExperimentSearchParams = await kv.get(LOCAL_STORAGE_KEY_EXPERIMENT_PARAMS);
		if (!previousExperimentSearchParams) {
			return;
		}

		// TODO: Figure out how to properly persist the experiment search params.
		console.log({ event });
	});

	/**
	 * makeExperimentKVService returns a LocalStorageKVService for the experiment
	 * search params. If localStorage is not available, it returns null.
	 */
	function makeExperimentKVService(): LocalStorageKVService<ExperimentSearchParams> | null {
		if (!window.localStorage) {
			console.warn('localStorage is not available');
			return null;
		}

		return new LocalStorageKVService<ExperimentSearchParams>(window.localStorage);
	}
</script>

<Modals>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div slot="backdrop" class="backdrop" on:click={closeModal} />
</Modals>
<slot />

<style>
	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}
</style>

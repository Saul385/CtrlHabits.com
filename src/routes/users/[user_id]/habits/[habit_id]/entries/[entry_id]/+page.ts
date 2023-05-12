import type { PageLoadEvent } from './$types';
import { makeCTRLHabitsAPI } from '$lib/ctrlhabits/api/utils/make_ctrlhabits_api';

/**
 * load function for:
 * GET /users/[user_id]/habits/[habit_id]/entries/[entry_id]
 */
export async function load(event: PageLoadEvent) {
	const api = makeCTRLHabitsAPI(event.fetch);
	return {
		entry: await api.getEntriesEntryID({
			id: event.params.habit_id
		})
	};
}

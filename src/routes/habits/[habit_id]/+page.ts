import type { PageLoadEvent } from './$types';
import { makeCTRLHabitsAPI } from '$lib/ctrlhabits/api/utils/make_ctrlhabits_api';

/**
 * load function for:
 * `GET /habits/[habit_id]`
 */
export async function load(event: PageLoadEvent) {
	const api = makeCTRLHabitsAPI();
	return await api.getHabitsHabitID({
		id: event.params.habit_id
	});
}

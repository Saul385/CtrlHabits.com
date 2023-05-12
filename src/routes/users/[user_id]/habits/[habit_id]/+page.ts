import type { PageLoadEvent } from './$types';
import { makeCTRLHabitsAPI } from '$lib/ctrlhabits/api/utils/make_ctrlhabits_api';

/**
 * load function for:
 * GET /users/[user_id]/habits/[habit_id]
 * ?offset=[offset]&limit=[limit]
 */
export async function load(event: PageLoadEvent) {
	const api = makeCTRLHabitsAPI(event.fetch);
	const [habit, entries] = await Promise.all([
		api.getHabitsHabitID({
			id: event.params.habit_id
		}),
		api.getEntries({
			habit_id: event.params.habit_id,
			offset: parseInt(event.url.searchParams.get('offset') ?? '0'),
			limit: parseInt(event.url.searchParams.get('limit') ?? '10')
		})
	]);
	return {
		habit,
		entries
	};
}

import type { PageLoadEvent } from './$types';
import { makeCTRLHabitsAPI } from '$lib/ctrlhabits/api/utils/make_ctrlhabits_api';

/**
 * load function for:
 * `GET /users/[user_id]/habits`
 */
export async function load(event: PageLoadEvent) {
	const api = makeCTRLHabitsAPI(event.fetch);
	return {
		habits: await api.getHabits({
			user_id: event.params.user_id,
			offset: parseInt(event.url.searchParams.get('offset') ?? '0'),
			limit: parseInt(event.url.searchParams.get('limit') ?? '10')
		})
	};
}

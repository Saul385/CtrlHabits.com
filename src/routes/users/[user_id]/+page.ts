import type { PageLoadEvent } from './$types';
import { makeCTRLHabitsAPI } from '$lib/ctrlhabits/api/utils/make_ctrlhabits_api';

/**
 * load function for:
 * `GET /users/[user_id]`
 */
export async function load(event: PageLoadEvent) {
	const api = makeCTRLHabitsAPI(event.fetch.bind(event));
	const [profile, habits] = await Promise.all([
		api.getUsersUserID({
			id: event.params.user_id
		}),
		api.getHabits({
			user_id: event.params.user_id,
			offset: parseInt(event.url.searchParams.get('offset') ?? '0'),
			limit: parseInt(event.url.searchParams.get('limit') ?? '10')
		})
	]);
	return {
		profile,
		habits
	};
}

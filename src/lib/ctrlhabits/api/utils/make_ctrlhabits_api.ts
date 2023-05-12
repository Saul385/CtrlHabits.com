import { CTRLHabitsAPI } from '$lib/ctrlhabits/api';

/**
 * makeCTRLHabitsAPI creates a new CTRLHabitsAPI instance.
 */
export function makeCTRLHabitsAPI(fetcher: typeof fetch, baseURL = '/') {
	return new CTRLHabitsAPI(fetcher, baseURL);
}

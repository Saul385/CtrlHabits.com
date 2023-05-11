import { CTRLHabitsAPI } from '$lib/ctrlhabits/api';

/**
 * makeCTRLHabitsAPI creates a new CTRLHabitsAPI instance.
 */
export function makeCTRLHabitsAPI(baseURL = '/') {
	return new CTRLHabitsAPI(baseURL);
}

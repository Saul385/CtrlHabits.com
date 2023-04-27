import type { LayoutServerLoadEvent } from './$types';
import { DEV_FLAG_ENABLED } from '$lib/env';

/**
 * load in "src/routes/+layout.server.svelte" makes the `user` variable
 * visible to all pages.
 */
export function load(event: LayoutServerLoadEvent) {
	return {
		user: event.locals.user,
		DEV_FLAG_ENABLED
	};
}

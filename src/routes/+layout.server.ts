import type { LayoutServerLoadEvent } from './$types';

/**
 * load in "src/routes/+layout.server.svelte" makes the `user` variable
 * visible to all pages.
 */
export function load(event: LayoutServerLoadEvent) {
	return {
		user: event.locals.user
	};
}

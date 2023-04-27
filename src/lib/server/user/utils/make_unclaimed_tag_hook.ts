import type { Handle } from '@sveltejs/kit';

/**
 * makeUnclaimedTagHook creates a hook that redirects the user to the unclaimed tag page
 * if they are not logged in.
 *
 * ignoreList configures the hook to ignore certain paths.
 */
export function makeUnclaimedTagHook(claimPathname: string, ignoreList: string[]): Handle {
	return async ({ event, resolve }) => {
		// Redirect the user home to claim a tag if they are not logged in.
		if (event.url.pathname === claimPathname && event.locals.user === null) {
			return new Response('Log in to claim a tag.', {
				status: 302,
				headers: { Location: '/' }
			});
		}

		// The user may proceed if:
		// 1. They are not logged in.
		// 2. They have not claimed a tag.
		// 3. They are on an ignored path.
		if (
			event.locals.user === null ||
			event.locals.user.tag !== null ||
			[claimPathname].concat(ignoreList).includes(event.url.pathname)
		) {
			return resolve(event);
		}

		// Otherwise, redirect them to claim a tag.
		return new Response('Unclaimed tag', {
			status: 302,
			headers: { Location: claimPathname }
		});
	};
}

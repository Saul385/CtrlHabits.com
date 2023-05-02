import type { Handle } from '@sveltejs/kit';

/**
 * makeUnclaimedTagHook creates a hook that redirects the user to the unclaimed tag page
 * if they are not logged in.
 *
 * makeUnclaimedTagHook applies to all paths except those in the ignoreList.
 *
 * makeUnclaimedTagHook applies to only the GET method.
 */
export function makeUnclaimedTagHook(claimPathname: string, ignoreList: string[]): Handle {
	return async ({ event, resolve }) => {
		const isOnClaimPath = event.url.pathname === claimPathname;
		const isLoggedIn = event.locals.user !== null;
		const isTagClaimed = event.locals.user?.tag !== null;
		const isOnIgnoredPath = ignoreList.some((path) => event.url.pathname === path);
		if (event.request.method !== 'GET') {
			return resolve(event);
		}

		if (isOnClaimPath) {
			if (!isLoggedIn) {
				return new Response('Log in to claim a tag.', {
					status: 302,
					headers: { Location: '/' }
				});
			}

			if (isTagClaimed) {
				return new Response('You have already claimed a tag.', {
					status: 302,
					headers: { Location: '/' }
				});
			}

			return resolve(event);
		}

		if (!isOnIgnoredPath && !isOnClaimPath && isLoggedIn && !isTagClaimed) {
			return new Response('Unclaimed tag', {
				status: 302,
				headers: { Location: claimPathname }
			});
		}

		return resolve(event);
	};
}

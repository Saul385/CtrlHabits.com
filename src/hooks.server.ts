import { sequence } from '@sveltejs/kit/hooks';
import { makeGetUserByJWTHook } from '$lib/server/ctrlhabits/utils/get_user_by_jwt';
import { JWT_SECRET } from '$lib/server/env';
import { makeUnclaimedTagHook } from '$lib/server/ctrlhabits/utils/make_unclaimed_tag_hook';

/**
 * See:
 * https://kit.svelte.dev/docs/hooks#server-hooks
 */
export const handle = sequence(
	// Add the user to the event locals if they have a valid JWT.
	makeGetUserByJWTHook(JWT_SECRET),
	// Redirect to /claim if the user has not claimed a tag.
	makeUnclaimedTagHook('/claim', ['/api/logout'])
);

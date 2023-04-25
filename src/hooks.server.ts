import { sequence } from '@sveltejs/kit/hooks';
import { makeGetUserByJWTHook } from '$lib/server/user/utils/get_user_by_jwt';
import { JWT_SECRET } from '$lib/server/env';

/**
 * See:
 * https://kit.svelte.dev/docs/hooks#server-hooks
 */
export const handle = sequence(makeGetUserByJWTHook(JWT_SECRET));

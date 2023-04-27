import type { Handle } from '@sveltejs/kit';
import type { User, UserServiceInterface } from '$lib/server/user';
import { verifyJWT } from '$lib/server/jwt';
import { JWT_COOKIE, USER_SERVICE_TYPE } from '$lib/server/env';
import { makeUserService } from './make_user_service';

/**
 * makeGetUserByJWTHook makes a hook that gets the user by the JWT.
 */
export function makeGetUserByJWTHook(secret: string): Handle {
	return async ({ event, resolve }) => {
		// Initialize the local user.
		event.locals.user = null;

		// Get the JWT from the request cookies.
		const jwt = event.cookies.get(JWT_COOKIE);
		if (!jwt) {
			return resolve(event);
		}

		// Parse the user service from the URL params.
		const userService = makeUserService(USER_SERVICE_TYPE);

		// Get the user by the JWT.
		event.locals.user = await getUserByJWT(userService, jwt, secret);
		console.log('event.locals.user', event.locals.user); // TODO: Remove this.
		return resolve(event);
	};
}

/**
 * getUserByJWT gets the user by the JWT.
 */
export async function getUserByJWT(
	userService: UserServiceInterface,
	jwt: string,
	secret: string
): Promise<User | null> {
	const userID = verifyJWT(jwt, secret);
	if (!userID) {
		return null;
	}

	return await userService.getUserByID({ id: userID });
}

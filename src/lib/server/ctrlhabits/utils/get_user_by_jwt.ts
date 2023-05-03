import type { Handle } from '@sveltejs/kit';
import type { CTRLHabitsServiceInterface, User } from '$lib/server/ctrlhabits';
import { verifyJWT } from '$lib/server/jwt';
import { CTRLHABITS_SERVICE_TYPE, JWT_COOKIE } from '$lib/server/env';
import { makeCTRLHabitsService } from './make_ctrlhabits_service';

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
		const userService = makeCTRLHabitsService(CTRLHABITS_SERVICE_TYPE);

		// Get the user by the JWT.
		event.locals.user = await getUserByJWT(userService, jwt, secret)
			.then((user) => user)
			.catch((error) => {
				console.error(error);
				return null;
			});

		return resolve(event);
	};
}

/**
 * getUserByJWT gets the user by the JWT.
 */
export async function getUserByJWT(
	ctrlhabitsService: CTRLHabitsServiceInterface,
	jwt: string,
	secret: string
): Promise<User | null> {
	const userID = verifyJWT(jwt, secret);
	if (!userID) {
		return null;
	}

	return await ctrlhabitsService.getUserByID({ id: userID });
}

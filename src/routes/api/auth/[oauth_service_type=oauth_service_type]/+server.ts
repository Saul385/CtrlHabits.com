import type { RequestEvent } from './$types';
import type { User } from '$lib/server/ctrlhabits';
import { getUserByOAuthData } from '$lib/server/ctrlhabits/utils/get_user_by_oauth_data';
import { makeCTRLHabitsService } from '$lib/server/ctrlhabits/utils/make_ctrlhabits_service';
import { makeJWT } from '$lib/server/jwt';
import { makeOAuthService } from '$lib/server/oauth/utils/make_oauth_service';
import { CTRLHABITS_SERVICE_TYPE, JWT_COOKIE, JWT_SECRET } from '$lib/server/env';
import { parseOAuthServiceType } from '$lib/oauth';
import { parseAuthSearchParams } from './search_params';

/**
 * The server-side load function for:
 * `/api/auth/[oauth_service_type]/?code=[code]`
 */
export async function GET(event: RequestEvent): Promise<Response> {
	// If the user is already logged in, redirect them to the home page.
	if (event.locals.user) {
		return new Response('Logged in', {
			status: 302,
			headers: { Location: '/' }
		});
	}

	// Parse the OAuth service type from the pathname.
	const oauthServiceType = parseOAuthServiceType(event.params.oauth_service_type);
	if (!oauthServiceType) {
		return ERROR_RESPONSE_UNKNOWN_OAUTH;
	}

	// If the user does not have a code, redirect them to the OAuth provider.
	const url = new URL(event.request.url);
	const parsedSearchParams = parseAuthSearchParams(url);
	const oauthService = makeOAuthService(oauthServiceType);
	if (!parsedSearchParams.code) {
		return Response.redirect(oauthService.getURL());
	}

	// Verify the code and get the OAuth data.
	const token = await oauthService.verify(parsedSearchParams.code);
	if (!token) {
		return ERROR_RESPONSE_INVALID_CODE;
	}

	// Get the user's OAuth data.
	const oauthData = await oauthService.getData(token);
	console.log({ oauthData }); // TODO: Remove this.

	// Create a new user if they do not exist.
	const ctrlhabitsService = makeCTRLHabitsService(CTRLHABITS_SERVICE_TYPE);
	const user = await getUserByOAuthData(ctrlhabitsService, oauthServiceType, oauthData);
	if (!user) {
		const newUser = await ctrlhabitsService.addUser({ oauthData });
		return makeJWTResponse('/claim', newUser);
	}

	// Otherwise, log the user in.
	return makeJWTResponse('/', user);
}

/**
 * makeJWTResponse creates a response that sets a JWT cookie and redirects the user to
 * the destination.
 */
function makeJWTResponse(pathname: string, user: User): Response {
	// Create a new JWT token and pass it as a cookie with their user ID.
	const jwt = makeJWT(user.id, JWT_SECRET);
	return new Response('Logged in', {
		status: 302,
		headers: {
			'Set-Cookie': `${JWT_COOKIE}=${jwt}; Path=/; Max-Age=604800`,
			Location: pathname
		}
	});
}

/** Error response when code is invalid. */
const ERROR_RESPONSE_INVALID_CODE = new Response('Invalid code', {
	status: 400
});

/** Error response when the OAuth provider is unknown. */
const ERROR_RESPONSE_UNKNOWN_OAUTH = new Response('Unknown OAuth provider', {
	status: 400
});

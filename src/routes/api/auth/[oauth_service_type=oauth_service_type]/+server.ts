import type { RequestEvent } from './$types';
import type { User } from '$lib/server/user';
import { getUserByOAuthData } from '$lib/server/user/utils/get_user_by_oauth_data';
import { makeUserService } from '$lib/server/user/utils/make_user_service';
import { makeJWT } from '$lib/server/jwt';
import { makeOAuthService } from '$lib/server/oauth/utils/make_oauth_service';
import { JWT_COOKIE, JWT_SECRET, USER_SERVICE_TYPE } from '$lib/server/env';
import { parseOAuthServiceType } from '$lib/oauth';
import { parseAuthSearchParams } from './search_params';

/**
 * The server-side load function for:
 * `/api/auth/[oauth_service_type]/?code=[code]`
 */
export async function GET(event: RequestEvent): Promise<Response> {
	if (event.locals.user) {
		// The user is already logged in.
		return Response.redirect('/');
	}

	const oauthServiceType = parseOAuthServiceType(event.params.oauth_service_type);
	if (!oauthServiceType) {
		return ERROR_RESPONSE_UNKNOWN_OAUTH;
	}

	const oauthService = makeOAuthService(oauthServiceType);
	const url = new URL(event.request.url);
	const parsedSearchParams = parseAuthSearchParams(url);
	if (!parsedSearchParams.code) {
		return Response.redirect(oauthService.getURL());
	}

	const token = await oauthService.verify(parsedSearchParams.code);
	if (!token) {
		return ERROR_RESPONSE_INVALID_CODE;
	}

	const oauthData = await oauthService.getData(token);
	console.log({ oauthData }); // TODO: Remove this.

	// If the user already exists in the database, log them in. Otherwise, create a new user.
	const userService = makeUserService(USER_SERVICE_TYPE);
	const user = await getUserByOAuthData(userService, oauthServiceType, oauthData);
	if (!user) {
		const newUser = await userService.addUser({ oauthData });
		return makeJWTResponse('/join', newUser);
	}

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

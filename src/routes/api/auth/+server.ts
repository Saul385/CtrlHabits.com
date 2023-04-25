import type { RequestEvent } from './$types';
import { OAuthServiceType } from '$lib/server/oauth';
import { makeOAuthService } from '$lib/server/oauth/utils/make_oauth_service';
import type { User } from '$lib/server/user';
import type { AuthSearchParams, ExperimentSearchParams } from '$lib/search_params';
import { parseAuthSearchParams, parseExperimentSearchParams } from '$lib/search_params';
import { getUserByOAuthData } from '$lib/server/user/utils/get_user_by_oauth_data';
import { makeUserService } from '$lib/server/user/utils/make_user_service';
import { makeJWT } from '$lib/server/jwt';
import { JWT_COOKIE, JWT_SECRET } from '$lib/server/env';
import { UserServiceType } from '$lib/server/user';

/**
 * The server-side load function for:
 * `/api/auth/?code=[string]`.
 */
export async function GET(event: RequestEvent): Promise<Response> {
	if (event.locals.user) {
		// The user is already logged in.
		return Response.redirect('/');
	}

	const url = new URL(event.request.url);
	const parsedSearchParams = parseSearchParams(url);
	if (!parsedSearchParams.authSearchParams.oauthServiceType) {
		return ERROR_RESPONSE_UNKNOWN_OAUTH;
	}

	if (!parsedSearchParams.authSearchParams.code) {
		return ERROR_RESPONSE_MISSING_CODE;
	}

	// TODO: Change to GITHUB and FIRESTORE respectively once tests are done.
	const oauthService = makeOAuthService(
		parsedSearchParams.authSearchParams.oauthServiceType ?? OAuthServiceType.LOCAL_GITHUB
	);
	const token = await oauthService.verify(parsedSearchParams.authSearchParams.code);
	if (!token) {
		return ERROR_RESPONSE_INVALID_CODE;
	}

	const oauthData = await oauthService.getData(token);
	console.log({ oauthData }); // TODO: Remove this.

	// If the user already exists in the database, log them in. Otherwise, create a new user.
	const userService = makeUserService(
		parsedSearchParams.experimentSearchParams.userServiceType ?? UserServiceType.LOCAL // TODO: Change to FIRESTORE once tests are done.
	);
	const user = await getUserByOAuthData(
		userService,
		parsedSearchParams.authSearchParams.oauthServiceType,
		oauthData
	);
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
function makeJWTResponse(destination: string, user: User): Response {
	// Create a new JWT token and pass it as a cookie with their user ID.
	const jwt = makeJWT(user.id, JWT_SECRET);
	return new Response('Logged in', {
		status: 302,
		headers: {
			'Set-Cookie': `${JWT_COOKIE}=${jwt}; Path=/; Max-Age=604800`,
			Location: destination
		}
	});
}

/** Error response when the code is missing. */
const ERROR_RESPONSE_MISSING_CODE = new Response('Missing code', {
	status: 400
});

/** Error response when code is invalid. */
const ERROR_RESPONSE_INVALID_CODE = new Response('Invalid code', {
	status: 400
});

/** Error response when the OAuth provider is unknown. */
const ERROR_RESPONSE_UNKNOWN_OAUTH = new Response('Unknown OAuth provider', {
	status: 400
});

/**
 * parseSearchParams parses the search params from the URL of the request on this endpoint.
 */
function parseSearchParams(url: URL): {
	authSearchParams: AuthSearchParams;
	experimentSearchParams: ExperimentSearchParams;
} {
	return {
		authSearchParams: parseAuthSearchParams(url),
		experimentSearchParams: parseExperimentSearchParams(url)
	};
}

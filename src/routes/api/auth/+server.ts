import type { RequestEvent } from './$types';
import type { OAuthServiceType } from '$lib/server/oauth';
import type { AuthSearchParams, ExperimentSearchParams } from '$lib/search_params';
import {
	parseAuthSearchParams,
	parseExperimentSearchParams,
	SEARCH_PARAM_OAUTH_SERVICE_TYPE
} from '$lib/search_params';
import { getUserByOAuthData } from '$lib/server/user/utils/get_user_by_oauth_data';
import { makeJWT } from '$lib/server/jwt';
import { JWT_SECRET } from '$lib/server/env';
import { makeServices } from './services';

/**
 * The server-side load function for:
 * `/api/auth/?code=[string]&tag=[string]`.
 */
export async function GET(event: RequestEvent): Promise<Response> {
	const parsedSearchParams = parseSearchParams(new URL(event.request.url));
	if (!parsedSearchParams.authSearchParams.oauthServiceType) {
		return ERROR_RESPONSE_UNKNOWN_OAUTH;
	}

	if (!parsedSearchParams.authSearchParams.code) {
		return ERROR_RESPONSE_MISSING_CODE;
	}

	const { oauthService, userService } = makeServices({
		oauth: parsedSearchParams.authSearchParams.oauthServiceType,
		user: parsedSearchParams.experimentSearchParams.userServiceType
	});

	const token = await oauthService.verify(parsedSearchParams.authSearchParams.code);
	if (!token) {
		return ERROR_RESPONSE_INVALID_CODE;
	}

	const oauthData = await oauthService.getData(token);
	console.log({ oauthData }); // TODO: Remove this.

	// If the user already exists in the database, log them in. Otherwise, create a new user.
	const user = await getUserByOAuthData(
		userService,
		parsedSearchParams.authSearchParams.oauthServiceType,
		oauthData
	);
	if (!user) {
		// Redirect the user to the registration page to claim a username and associate it with their OAuth account.
		return new Response('Redirecting to registration page', {
			status: 302,
			headers: {
				Location: makeRegistrationURL(parsedSearchParams.authSearchParams.oauthServiceType)
			}
		});
	}

	// Create a new JWT token and pass it as a cookie with their user ID.
	const jwt = makeJWT(user.id, JWT_SECRET); // TODO: Verify in [hook](https://kit.svelte.dev/docs/hooks#server-hooks).
	return new Response('Logged in', {
		status: 302,
		headers: {
			'Set-Cookie': `jwt=${jwt}; Path=/; Max-Age=604800`,
			Location: '/'
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

/**
 * makeRegistrationURL makes the URL to redirect the user to the registration page.
 */
function makeRegistrationURL(oauthServiceType: OAuthServiceType): string {
	const locationSearchParams = new URLSearchParams();
	locationSearchParams.set(SEARCH_PARAM_OAUTH_SERVICE_TYPE, oauthServiceType);
	return `/register?${locationSearchParams}`;
}

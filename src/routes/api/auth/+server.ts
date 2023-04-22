import type { RequestEvent } from './$types';
import type { User, UserServiceInterface } from '$lib/server/user';
import type { AuthSearchParams, ExperimentSearchParams } from '$lib/search_params';
import { parseAuthSearchParams, parseExperimentSearchParams } from '$lib/search_params';
import { makeServices } from './services';
import type { OAuthData } from '$lib/server/oauth';
import { OAuthServiceType } from '$lib/server/oauth';

/**
 * The server-side load function for:
 * `/api/auth/[oauth]?code=[string]&guest=[boolean]&tag=[string]`.
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
	console.log({ oauthData });

	// If the user already exists in the database, log them in. Otherwise, create a new user.
	const user = await getUserByOAuthData(
		userService,
		parsedSearchParams.authSearchParams.oauthServiceType,
		oauthData
	);
	if (user) {
		// TODO: Create a new JWT token and pass it as a cookie.
	}

	// TODO: Redirect the user to the registration page to claim a username and associate it with their OAuth account.

	return new Response('Logged in as guest', {
		status: 302,
		headers: {
			'Set-Cookie': `guest=true; Path=/; Max-Age=604800`,
			Location: `/`
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
 * getUserByOAuthData gets the user by the OAuth data.
 */
async function getUserByOAuthData(
	userService: UserServiceInterface,
	oauthServiceType: OAuthServiceType,
	oauthData: OAuthData
): Promise<User | null> {
	let user: Promise<User | null>;
	switch (oauthServiceType) {
		case OAuthServiceType.GITHUB: {
			user = userService.getUserByGitHubID({ github_id: oauthData.id });
			break;
		}

		case OAuthServiceType.GOOGLE: {
			user = userService.getUserByGoogleID({ google_id: oauthData.id });
			break;
		}

		default: {
			return null;
		}
	}

	try {
		return await user;
	} catch (error) {
		console.error('Failed to get user by OAuth data', { error });
		return null;
	}
}

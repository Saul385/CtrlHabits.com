import type { RequestEvent } from './$types';
import { Firestore } from '@google-cloud/firestore';
import type { UserServiceInterface } from '$lib/server/user';
import type { OAuthServiceInterface } from '$lib/server/oauth';
import { OAuthProvider } from '$lib/server/oauth';
import { GitHubOAuthService } from '$lib/server/oauth/github/github_oauth_service';
import { LocalFakeGitHubOAuthService } from '$lib/server/oauth/github/local_fake_github_oauth_service';
import { FirestoreUserService } from '$lib/server/user/firestore_user_service';
import { LocalFakeUserService } from '$lib/server/user/local_fake_user_service';
import { parseBoolean } from '$lib/parse_boolean';
import { GITHUB_CLIENT } from '$lib/env';
import {
	GITHUB_SECRET,
	LOCAL_GITHUB_OAUTH_PATH,
	LOCAL_USERS_PATH,
	FIRESTORE_CLIENT_EMAIL,
	FIRESTORE_PRIVATE_KEY,
	FIRESTORE_PROJECT_ID
} from '$lib/server/env';

/**
 * The server-side load function for:
 * `/api/auth/[oauth]?code=[string]&guest=[boolean]&tag=[string]`.
 */
export async function GET(event: RequestEvent): Promise<Response> {
	// name is the name of the OAuth provider. It is the first segment of the path.
	const name = event.params.oauth;
	if (!name) {
		return ERROR_RESPONSE_UNKNOWN_OAUTH;
	}

	const url = new URL(event.request.url);
	const tag = url.searchParams.get('tag');
	const isGuest = parseBoolean(url.searchParams.get('guest'));
	const code = url.searchParams.get('code'); // TODO: Code is for GitHub OAuth and might vary for other OAuth providers.
	if (!code) {
		return ERROR_RESPONSE_MISSING_CODE;
	}

	const { oauthService, userService } = makeServices(name, isGuest);
	const token = await oauthService.verify(code);
	if (!token) {
		return ERROR_RESPONSE_INVALID_CODE;
	}

	const oauthData = await oauthService.getData(token);

	// TODO: If user already exists, create a new JWT token and pass it as a cookie.
	// const user = await userService.addUser({ tag, oauth: oauthData });

	// Only add user if they are not a guest and they are not already in the database.
	await userService.addUser({ tag, oauth: oauthData });

	// TODO: Create a new JWT token and pass it as a cookie.
	return new Response('Logged in as guest', {
		status: 302,
		headers: {
			'Set-Cookie': `guest=true; Path=/; Max-Age=604800`,
			Location: `/`
		}
	});
}

/**
 * makeServices creates the required services for the given OAuth provider.
 */
function makeServices(
	name: string,
	isGuest: boolean
): {
	oauthService: OAuthServiceInterface;
	userService: UserServiceInterface;
} {
	const userService = makeUserService(isGuest);
	const oauthService = makeOAuthService(name, isGuest);
	return { oauthService, userService };
}

/**
 * makeUserService returns the relevant user service.
 */
function makeUserService(isGuest: boolean): UserServiceInterface {
	if (isGuest) {
		return new LocalFakeUserService(LOCAL_USERS_PATH);
	}

	const firestoreClient = new Firestore({
		projectId: FIRESTORE_PROJECT_ID,
		credentials: {
			client_email: FIRESTORE_CLIENT_EMAIL,
			private_key: FIRESTORE_PRIVATE_KEY
		}
	});

	return new FirestoreUserService(firestoreClient, 'users');
}

/**
 * makeOAuthService creates an OAuth service for the given OAuth provider.
 */
function makeOAuthService(name: string, isGuest: boolean): OAuthServiceInterface {
	switch (name) {
		case OAuthProvider.GITHUB: {
			if (isGuest) {
				return new LocalFakeGitHubOAuthService(LOCAL_GITHUB_OAUTH_PATH);
			}

			return new GitHubOAuthService(GITHUB_CLIENT, GITHUB_SECRET);
		}

		case OAuthProvider.GOOGLE: {
			// TODO: Add a local fake Google OAuth service.
			// return new LocalFakeGoogleOAuthService('./dev/google_oauth.json');
			throw new Error('Unimplemented');
		}

		default: {
			throw new Error(`Unknown OAuth provider: ${name}`);
		}
	}
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

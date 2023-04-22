import { Firestore } from '@google-cloud/firestore';
import type { UserServiceInterface } from '$lib/server/user';
import { UserServiceType } from '$lib/server/user';
import type { OAuthServiceInterface } from '$lib/server/oauth';
import { OAuthServiceType } from '$lib/server/oauth';
import { GitHubOAuthService } from '$lib/server/oauth/github/github_oauth_service';
import { LocalFakeGitHubOAuthService } from '$lib/server/oauth/github/local_fake_github_oauth_service';
import { FirestoreUserService } from '$lib/server/user/firestore_user_service';
import { LocalFakeUserService } from '$lib/server/user/local_fake_user_service';
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
 * MakeServicesInput is the input for makeServices.
 */
export interface MakeServicesInput {
	/**
	 * oauth is the Auth provider name.
	 */
	oauth?: OAuthServiceType;

	/**
	 * user is the user service type.
	 */
	user?: UserServiceType;
}

/**
 * MakeServicesOutput is the output for makeServices.
 */
export interface MakeServicesOutput {
	oauthService: OAuthServiceInterface;
	userService: UserServiceInterface;
}

/**
 * makeServices creates the required services for the given OAuth provider.
 */
export function makeServices(input: MakeServicesInput): MakeServicesOutput {
	const oauthService = makeOAuthService(input.oauth ?? OAuthServiceType.LOCAL_GITHUB); // TODO: Change to GITHUB.
	const userService = makeUserService(input.user ?? UserServiceType.LOCAL); // TODO: Change to FIRESTORE.
	return { oauthService, userService };
}

/**
 * makeUserService returns the relevant user service.
 */
function makeUserService(userServiceType: UserServiceType): UserServiceInterface {
	switch (userServiceType) {
		// Note: The following switch statement cases change according to enum UserServiceType.
		case UserServiceType.LOCAL: {
			return new LocalFakeUserService(LOCAL_USERS_PATH);
		}

		case UserServiceType.FIRESTORE: {
			const firestoreClient = new Firestore({
				projectId: FIRESTORE_PROJECT_ID,
				credentials: {
					client_email: FIRESTORE_CLIENT_EMAIL,
					private_key: FIRESTORE_PRIVATE_KEY
				}
			});
			return new FirestoreUserService(firestoreClient, 'users');
		}

		default: {
			throw new Error(`Unknown user service: ${userServiceType}`);
		}
	}
}

/**
 * makeOAuthService creates an OAuth service for the given OAuth provider.
 */
function makeOAuthService(oauthServiceType: OAuthServiceType): OAuthServiceInterface {
	switch (oauthServiceType) {
		// Note: The following switch statement cases change according to enum OAuthServiceType.
		case OAuthServiceType.GITHUB: {
			return new GitHubOAuthService(GITHUB_CLIENT, GITHUB_SECRET);
		}

		case OAuthServiceType.LOCAL_GITHUB: {
			return new LocalFakeGitHubOAuthService(LOCAL_GITHUB_OAUTH_PATH);
		}

		case OAuthServiceType.GOOGLE: {
			// TODO: Add a local fake Google OAuth service.
			throw new Error('Unimplemented');
		}

		case OAuthServiceType.LOCAL_GOOGLE: {
			throw new Error('Unimplemented');
		}

		default: {
			throw new Error(`Unknown OAuth provider: ${oauthServiceType}`);
		}
	}
}

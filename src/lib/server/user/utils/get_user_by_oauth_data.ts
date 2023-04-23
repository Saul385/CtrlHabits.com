import type { User, UserServiceInterface } from '../';
import type { OAuthData } from '$lib/server/oauth';
import { OAuthServiceType } from '$lib/server/oauth';

/**
 * getUserByOAuthData gets the user by the OAuth data.
 */
export async function getUserByOAuthData(
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

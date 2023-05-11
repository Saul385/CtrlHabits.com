import type { CTRLHabitsServiceInterface, User } from '$lib/server/ctrlhabits';
import type { OAuthData } from '$lib/oauth';
import { OAuthServiceType } from '$lib/oauth';

/**
 * getUserByOAuthData gets the user by the OAuth data.
 *
 * TODO: Cover this function with tests.
 */
export async function getUserByOAuthData(
	ctrlhabitsService: CTRLHabitsServiceInterface,
	oauthServiceType: OAuthServiceType,
	oauthData: OAuthData
): Promise<User | null> {
	let userPromise: Promise<User | null>;
	switch (oauthServiceType) {
		case (OAuthServiceType.GITHUB, OAuthServiceType.LOCAL_GITHUB): {
			userPromise = ctrlhabitsService.getUserByGitHubID({
				github_id: oauthData.id
			});
			break;
		}

		case (OAuthServiceType.GOOGLE, OAuthServiceType.LOCAL_GOOGLE): {
			userPromise = ctrlhabitsService.getUserByGoogleID({
				google_id: oauthData.id
			});
			break;
		}

		default: {
			return null;
		}
	}

	return userPromise
		.then((user) => user)
		.catch((error) => {
			console.error('Failed to get user by OAuth data', { error });
			return null;
		});
}

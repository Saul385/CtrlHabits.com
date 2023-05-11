import { OAuthServiceType } from '$lib/oauth';
import type { OAuthData } from '$lib/oauth';

/**
 * parseGitHubID parses the GitHub ID from the OAuthData and OAuthServiceType.
 */
export function parseGitHubID(
	oauthServiceType: OAuthServiceType,
	oauthData: OAuthData
): string | null {
	switch (oauthServiceType) {
		case (OAuthServiceType.GITHUB, OAuthServiceType.LOCAL_GITHUB): {
			return oauthData.id;
		}

		default: {
			return null;
		}
	}
}

/**
 * parseGoogleID parses the Google ID from the OAuthData and OAuthServiceType.
 */
export function parseGoogleID(
	oauthServiceType: OAuthServiceType,
	oauthData: OAuthData
): string | null {
	switch (oauthServiceType) {
		case (OAuthServiceType.GOOGLE, OAuthServiceType.LOCAL_GOOGLE): {
			return oauthData.id;
		}

		default: {
			return null;
		}
	}
}

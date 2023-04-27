/**
 * OAuthServiceType is an enum of OAuth providers.
 */
export enum OAuthServiceType {
	GITHUB = 'github',
	LOCAL_GITHUB = 'local_github',
	GOOGLE = 'google',
	LOCAL_GOOGLE = 'local_google'
}

/**
 * parseOAuthServiceType parses an OAuthServiceType from a string.
 */
export function parseOAuthServiceType(
	oauthServiceType: string | null
): OAuthServiceType | undefined {
	switch (oauthServiceType) {
		case OAuthServiceType.GITHUB: {
			return OAuthServiceType.GITHUB;
		}

		case OAuthServiceType.LOCAL_GITHUB: {
			return OAuthServiceType.LOCAL_GITHUB;
		}

		case OAuthServiceType.GOOGLE: {
			return OAuthServiceType.GOOGLE;
		}

		case OAuthServiceType.LOCAL_GOOGLE: {
			return OAuthServiceType.LOCAL_GOOGLE;
		}

		default: {
			return;
		}
	}
}

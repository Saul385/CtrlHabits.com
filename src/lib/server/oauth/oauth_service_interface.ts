/**
 * OAuthServiceInterface is the interface for OAuth services.
 */
export interface OAuthServiceInterface {
	/**
	 * verify gets an access token.
	 */
	verify(code: string): Promise<string>;

	/**
	 * getData gets data from an OAuth provider.
	 */
	getData(token: string): Promise<OAuthData>;
}

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

/**
 * OAuthData is the data returned from an OAuth provider.
 */
export interface OAuthData {
	id: string;
	tag: string;
	bio: string;
	avatar_url: string;
}

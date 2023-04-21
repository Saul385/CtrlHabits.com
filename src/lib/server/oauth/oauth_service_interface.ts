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
 * OAuthProvider is an enum of OAuth providers.
 */
export enum OAuthProvider {
	GITHUB = 'github',
	GOOGLE = 'google'
}

/**
 * OAuthData is the data returned from an OAuth provider.
 */
export interface OAuthData {
	name: OAuthProvider;
	user_id: string;
	user_tag: string;
	user_bio: string;
	user_avatar_url: string;
}

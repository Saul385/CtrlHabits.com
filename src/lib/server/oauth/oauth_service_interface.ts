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

	/**
	 * getURL gets the URL to redirect the user to authenticate with the OAuth
	 * provider.
	 */
	getURL(): URL;
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

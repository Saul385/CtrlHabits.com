import type { OAuthData, OAuthServiceInterface } from '../oauth_service_interface';

/**
 * FakeGitHubOAuthServiceData is the data used by FakeGitHubOAuthService.
 */
export interface FakeGitHubOAuthServiceData {
	tokens: { [code: string]: string };
	users: { [token: string]: OAuthData };
}

/**
 * FakeGitHubOAuthService is a fake GitHub OAuth service used for testing or local development.
 *
 * This class is NOT intended to be used in production.
 */
export class FakeGitHubOAuthService implements OAuthServiceInterface {
	constructor(private readonly data: FakeGitHubOAuthServiceData) {}

	public async verify(code: string): Promise<string> {
		const token = this.data.tokens[code];
		if (!token) {
			throw new Error('Invalid code');
		}

		return token;
	}

	public async getData(token: string): Promise<OAuthData> {
		const user = this.data.users[token];
		if (!user) {
			throw new Error('Invalid token');
		}

		return user;
	}

	public getURL(): URL {
		throw new Error('Not implemented');
	}
}

import { OAuthServiceType } from '$lib/oauth';
import type { OAuthData, OAuthServiceInterface } from '../oauth_service_interface';

/**
 * GitHubOAuthService is the service for GitHub OAuth.
 */
export class GitHubOAuthService implements OAuthServiceInterface {
	constructor(private readonly clientID: string, private readonly clientSecret: string) {}

	public async verify(code: string): Promise<string> {
		const response = await fetch('https://github.com/login/oauth/access_token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				client_id: this.clientID,
				client_secret: this.clientSecret,
				code
			})
		});

		const data = await response.json();
		return data.access_token;
	}

	public async getData(token: string): Promise<OAuthData> {
		const response = await fetch('https://api.github.com/user', {
			headers: { Authorization: `Bearer ${token}` }
		});
		if (!response.ok) {
			throw new Error(`Failed to get user data. Status: ${response.status}`);
		}

		const data = await response.json();
		const result: OAuthData = {
			type: OAuthServiceType.GITHUB,
			id: data.id,
			tag: data.login,
			bio: data.bio,
			avatar_url: data.avatar_url
		};

		console.log({ data, result }); // TODO: This is for testing. Delete me later!
		return result;
	}

	public getURL(): URL {
		const url = new URL('https://github.com/login/oauth/authorize');
		url.searchParams.append('client_id', this.clientID);
		return url;
	}
}

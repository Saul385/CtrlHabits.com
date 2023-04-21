import type { OAuthServiceInterface, OAuthData } from '../oauth_service_interface';
import { OAuthProvider } from '../oauth_service_interface';

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
		console.log({ data }); // TODO: This is for testing. Delete me later!
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
		console.log({ data }); // TODO: This is for testing. Delete me later!
		return makeGitHubOAuthData(data.id, data.login, data.bio, data.avatar_url);
	}
}

function makeGitHubOAuthData(id: string, tag: string, bio: string, avatar_url: string): OAuthData {
	return {
		name: OAuthProvider.GITHUB,
		user_id: id,
		user_tag: tag,
		user_bio: bio,
		user_avatar_url: avatar_url
	};
}

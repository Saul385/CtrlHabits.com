import type { OAuthServiceInterface } from '$lib/server/oauth';
import { OAuthServiceType } from '$lib/server/oauth';
import { GitHubOAuthService } from '$lib/server/oauth/github/github_oauth_service';
import { LocalFakeGitHubOAuthService } from '$lib/server/oauth/github/local_fake_github_oauth_service';
import { GITHUB_CLIENT } from '$lib/env';
import { GITHUB_SECRET, LOCAL_GITHUB_OAUTH_PATH } from '$lib/server/env';

/**
 * makeOAuthService creates an OAuth service for the given OAuth provider.
 */
export function makeOAuthService(oauthServiceType: OAuthServiceType): OAuthServiceInterface {
	switch (oauthServiceType) {
		// Note: The following switch statement cases change according to enum OAuthServiceType.
		case OAuthServiceType.GITHUB: {
			return new GitHubOAuthService(GITHUB_CLIENT, GITHUB_SECRET);
		}

		case OAuthServiceType.LOCAL_GITHUB: {
			return new LocalFakeGitHubOAuthService(LOCAL_GITHUB_OAUTH_PATH);
		}

		case OAuthServiceType.GOOGLE: {
			// TODO: Add a local fake Google OAuth service.
			throw new Error('Unimplemented');
		}

		case OAuthServiceType.LOCAL_GOOGLE: {
			throw new Error('Unimplemented');
		}

		default: {
			throw new Error(`Unknown OAuth provider: ${oauthServiceType}`);
		}
	}
}

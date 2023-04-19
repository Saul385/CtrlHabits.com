import type { OAuthServiceInterface } from '../oauth_service_interface';

/**
 * GitHubOAuthServiceInterface is the interface for GitHub OAuth services.
 */
export type GitHubOAuthServiceInterface = OAuthServiceInterface<GitHubOAuthCredentials>;

/**
 * GitHubOAuthCredentials is the credentials data used to get an access token from GitHub.
 *
 * See:
 * https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow
 */
export interface GitHubOAuthCredentials {
	code: string;
}

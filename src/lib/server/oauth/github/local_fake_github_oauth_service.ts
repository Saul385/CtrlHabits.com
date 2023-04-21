import { readFileSync } from 'node:fs';
import type { FakeGitHubOAuthServiceData } from './fake_github_oauth_service';
import { FakeGitHubOAuthService } from './fake_github_oauth_service';

/**
 * LocalFakeGitHubOAuthService is a fake GitHub OAuth service that uses a local
 * file to read the data from. This service is read-only.
 */
export class LocalFakeGitHubOAuthService extends FakeGitHubOAuthService {
	constructor(filePath: string) {
		super(JSON.parse(readFileSync(filePath, 'utf-8')) as FakeGitHubOAuthServiceData);
	}
}

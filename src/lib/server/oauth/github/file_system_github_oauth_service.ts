import { readFileSync } from 'node:fs';
import type { InMemoryGitHubOAuthServiceData } from './in_memory_github_oauth_service';
import { InMemoryGitHubOAuthService } from './in_memory_github_oauth_service';

/**
 * FileSystemGitHubOAuthService is a fake GitHub OAuth service that uses a local
 * file to read the data from. This service is read-only.
 */
export class FileSystemGitHubOAuthService extends InMemoryGitHubOAuthService {
	constructor(filePath: string) {
		const data = JSON.parse(readFileSync(filePath, 'utf-8')) as InMemoryGitHubOAuthServiceData;
		super(data);
	}
}

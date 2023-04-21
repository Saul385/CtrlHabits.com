import { test, expect } from 'vitest';

import { OAuthProvider } from '../oauth_service_interface';
import type { FakeGitHubOAuthServiceData } from './fake_github_oauth_service';
import { FakeGitHubOAuthService } from './fake_github_oauth_service';

const FAKE_DATA: FakeGitHubOAuthServiceData = {
	tokens: { code_01: 'token_01' },
	users: {
		token_01: {
			name: OAuthProvider.GITHUB,
			user_id: '01',
			user_tag: 'JohnDoe',
			user_bio: 'I am John Doe',
			user_avatar_url: 'https://placekitten.com/g/150/150'
		}
	}
};

test('FakeGitHubOAuthService.verify returns a valid token for a valid code', async () => {
	const fakeService = new FakeGitHubOAuthService(FAKE_DATA);
	const token = await fakeService.verify('code_01');
	expect(token).toEqual('token_01');
});

test('FakeGitHubOAuthService.verify throws an error for an invalid code', async () => {
	const fakeService = new FakeGitHubOAuthService(FAKE_DATA);
	await expect(fakeService.verify('invalidCode')).rejects.toThrow('Invalid code');
});

test('FakeGitHubOAuthService.getData returns valid data for a valid token', async () => {
	const fakeService = new FakeGitHubOAuthService(FAKE_DATA);
	const data = await fakeService.getData('token_01');
	expect(data.name).toEqual(OAuthProvider.GITHUB);
	expect(data.user_id).toEqual('01');
	expect(data.user_tag).toEqual('JohnDoe');
	expect(data.user_bio).toEqual('I am John Doe');
	expect(data.user_avatar_url).toEqual('https://placekitten.com/g/150/150');
});

test('FakeGitHubOAuthService.getData throws an error for an invalid token', async () => {
	const fakeService = new FakeGitHubOAuthService(FAKE_DATA);
	await expect(fakeService.getData('invalidToken')).rejects.toThrow('Invalid token');
});

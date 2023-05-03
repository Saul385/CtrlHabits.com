import { expect, test } from 'vitest';
import type { FakeGitHubOAuthServiceData } from './fake_github_oauth_service';
import { FakeGitHubOAuthService } from './fake_github_oauth_service';
import { OAuthServiceType } from '$lib/oauth';

const FAKE_CODE_01 = 'code_01';
const FAKE_TOKEN_01 = 'token_01';
const FAKE_DATA: FakeGitHubOAuthServiceData = {
	tokens: { [FAKE_CODE_01]: FAKE_TOKEN_01 },
	users: {
		[FAKE_TOKEN_01]: {
			type: OAuthServiceType.LOCAL_GITHUB,
			id: '01',
			tag: 'JohnDoe',
			bio: 'I am John Doe',
			avatar_url: 'https://placekitten.com/g/150/150'
		}
	}
};

test('FakeGitHubOAuthService.verify returns a valid token for a valid code', async () => {
	const fakeService = new FakeGitHubOAuthService(FAKE_DATA);
	const token = await fakeService.verify(FAKE_CODE_01);
	expect(token).toEqual(FAKE_TOKEN_01);
});

test('FakeGitHubOAuthService.verify throws an error for an invalid code', async () => {
	const fakeService = new FakeGitHubOAuthService(FAKE_DATA);
	await expect(fakeService.verify('invalidCode')).rejects.toThrow('Invalid code');
});

test('FakeGitHubOAuthService.getData returns valid data for a valid token', async () => {
	const fakeService = new FakeGitHubOAuthService(FAKE_DATA);
	const data = await fakeService.getData(FAKE_TOKEN_01);
	expect(data.type).toEqual(OAuthServiceType.LOCAL_GITHUB);
	expect(data.id).toEqual('01');
	expect(data.tag).toEqual('JohnDoe');
	expect(data.bio).toEqual('I am John Doe');
	expect(data.avatar_url).toEqual('https://placekitten.com/g/150/150');
});

test('FakeGitHubOAuthService.getData throws an error for an invalid token', async () => {
	const fakeService = new FakeGitHubOAuthService(FAKE_DATA);
	await expect(fakeService.getData('invalidToken')).rejects.toThrow('Invalid token');
});

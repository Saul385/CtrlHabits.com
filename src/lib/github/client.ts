import { GITHUB_SECRET } from '$lib/server/env';
import { GITHUB_CLIENT } from '$lib/env';

export async function getAccessToken(code: string): Promise<string> {
	const url = makeAccessTokenURL(code);
	const data = await fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json'
		}
	}).then((response) => response.json());
	return data.access_token;
}

function makeAccessTokenURL(code: string) {
	const url = new URL('https://github.com/login/oauth/access_token');
	url.searchParams.set('client_id', GITHUB_CLIENT);
	url.searchParams.set('client_secret', GITHUB_SECRET);
	url.searchParams.set('code', code);
	return url;
}

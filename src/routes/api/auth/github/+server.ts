import type { RequestEvent } from '@sveltejs/kit';
import { GITHUB_CLIENT } from '$lib/env';
import { GITHUB_SECRET } from '$lib/server/env';
import { makeUUID } from '$lib/user/json_user_service';
import { parseBoolean } from '$lib/parse_boolean';
import { GitHubClient } from '$lib/github';

/**
 * The server-side load function for `/api/auth/github`.
 */
export async function GET(event: RequestEvent): Promise<Response> {
	const url = new URL(event.request.url);
	const code = url.searchParams.get('code');
	if (!code) {
		return ERROR_RESPONSE_MISSING_CODE;
	}

	const isGuest = parseBoolean(url.searchParams.get('guest'));
	if (isGuest) {
		const guestID = makeUUID();
		return new Response('Logged in as guest', {
			status: 302,
			headers: {
				'Set-Cookie': `guest=true; Path=/; Max-Age=604800`,
				Location: `/`
			}
		});
	}

	const client = new GitHubClient(GITHUB_CLIENT, GITHUB_SECRET);
	const token = await client.getAccessToken(code);
	if (!token) {
		return ERROR_RESPONSE_INVALID_CODE;
	}

	return Response.redirect('/');
}

/** Error response when the code is missing. */
const ERROR_RESPONSE_MISSING_CODE = new Response('Missing code', {
	status: 400
});

/** Error response when code is invalid. */
const ERROR_RESPONSE_INVALID_CODE = new Response('Invalid code', {
	status: 400
});

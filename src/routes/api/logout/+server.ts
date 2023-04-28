import type { RequestEvent } from './$types';
import { JWT_COOKIE } from '$lib/server/env';

/**
 * The server-side load function for:
 * `GET /api/logout/`
 */
export async function GET(event: RequestEvent): Promise<Response> {
	// Check if the user is already logged out.
	if (!event.locals.user) {
		return new Response('Logged out', {
			status: 302,
			headers: { Location: '/' }
		});
	}

	// Otherwise, log the user out.
	return new Response('Logged out', {
		status: 302,
		headers: {
			'Set-Cookie': `${JWT_COOKIE}=deleted; path=/; expires=${new Date(0).toUTCString()}`,
			Location: '/'
		}
	});
}

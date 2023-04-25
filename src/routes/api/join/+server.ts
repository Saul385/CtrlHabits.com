import type { RequestEvent } from './$types';

/**
 * The server-side load function for:
 * `/api/join?tag=[string]`.
 */
export async function GET(event: RequestEvent): Promise<Response> {
	// TODO: Implement this endpoint.
	console.log({ event });
	return Response.redirect('/');
}

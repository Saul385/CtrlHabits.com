import type { RequestEvent } from './$types';

/**
 * The server-side load function for:
 * `POST /api/claim`
 */
export async function POST(event: RequestEvent): Promise<Response> {
	if (event.locals.user === null) {
		return new Response('Unauthorized', { status: 401 });
	}

	if (event.locals.user.tag !== null) {
		return new Response('Forbidden', { status: 403 });
	}

	// TODO: Fix this!
	console.log('/api/claim: ', { event });
	// TODO:
	// - See: https://www.youtube.com/shorts/LmnGMOkNaC0
	// - See: https://youtu.be/9pB3lwfeCJI
	// - See: https://youtu.be/6pv70d7i-3Q
	// - See: https://youtu.be/fY34H1IfA94

	return new Response('OK', { status: 200 });

	// TODO:
	// Visit http://localhost:5173/api/auth/local_github?code=fake_code_001.
	//
	// Check if the chosen tag is available. If so, return an error.
	// const userService = makeUserService(USER_SERVICE_TYPE);
	// const existingUser = await userService.getUserByTag({
	// 	tag:
	// });

	// Otherwise, associate the tag with the user.
	// const newUser = await userService.updateUser({
	// 	id: event.locals.user.id,
	// 	tag:
	// });
}

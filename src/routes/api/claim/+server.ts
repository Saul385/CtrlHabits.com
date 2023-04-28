import type { RequestEvent } from './$types';
import { USER_SERVICE_TYPE } from '$lib/server/env';
import { makeUserService } from '$lib/server/user/utils/make_user_service';

/**
 * The server-side load function for:
 * `POST /api/claim`
 */
export async function POST(event: RequestEvent): Promise<Response> {
	// Check if the user is logged in. If not, return an error.
	if (event.locals.user === null) {
		return new Response('Unauthorized', { status: 401 });
	}

	// Check if the user already has a tag. If so, return an error.
	if (event.locals.user.tag !== null) {
		return new Response('Forbidden', { status: 403 });
	}

	// Get the tag from the form data. If it is missing, return an error.
	const formData = await event.request.formData();
	const tag = formData.get('tag');
	if (typeof tag !== 'string') {
		return new Response("Missing 'tag' in form data", { status: 400 });
	}

	// Check if the chosen tag is available. If so, return an error.
	const userService = makeUserService(USER_SERVICE_TYPE);
	const existingUser = await userService
		.getUserByTag({ tag })
		.then((user) => user)
		.catch((error) => {
			console.error(error);
			return null;
		});
	if (existingUser) {
		return new Response('Tag already taken', { status: 409 });
	}

	// Otherwise, associate the tag with the user.
	await userService.updateUser({
		id: event.locals.user.id,
		tag
	});

	// All is well. Redirect home.
	return new Response('Claimed tag', {
		status: 302,
		headers: { Location: '/' }
	});
}

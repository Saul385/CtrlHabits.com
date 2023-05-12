import type { RequestEvent } from './$types';
import { makeCTRLHabitsService } from '$lib/server/ctrlhabits/utils/make_ctrlhabits_service';
import { toUpdateUserRequest } from '$lib/server/ctrlhabits/utils/formdata';
import { CTRLHABITS_SERVICE_TYPE } from '$lib/server/env';

/**
 * The server-side load function for:
 * `GET /api/users/[user_id]`
 */
export async function GET(event: RequestEvent): Promise<Response> {
	const ctrlhabitsService = makeCTRLHabitsService(CTRLHABITS_SERVICE_TYPE);
	const user = await ctrlhabitsService.getUserByID({
		id: event.params.user_id
	});
	return new Response(JSON.stringify(user), { status: 200 });
}

/**
 * The server-side load function for:
 * `PATCH /api/users/[user_id]`
 */
export async function PATCH(event: RequestEvent): Promise<Response> {
	// Check if the user is logged in. If not, return an error.
	if (event.locals.user === null) {
		return new Response('Unauthorized', { status: 401 });
	}

	// Check if the user already has a tag. If so, return an error.
	if (event.locals.user.tag !== null) {
		return new Response('Forbidden', { status: 403 });
	}

	// Get the user data from the form data.
	const formData = await event.request.formData();
	const { error, request: updateUserRequest } = toUpdateUserRequest(formData, event.locals.user.id);
	if (error !== null) {
		return new Response(JSON.stringify({ error }), { status: 400 });
	}

	// Check if the user is changing their user data.
	if (updateUserRequest.id !== event.locals.user.id) {
		return new Response('Forbidden', { status: 403 });
	}

	// Update the user.
	const ctrlhabitsService = makeCTRLHabitsService(CTRLHABITS_SERVICE_TYPE);
	const user = await ctrlhabitsService.updateUser(updateUserRequest);
	return new Response(JSON.stringify(user), { status: 200 });
}

import type { RequestEvent } from './$types';
import type { ListHabitsByUserRequest } from '$lib/ctrlhabits';
import { makeCTRLHabitsService } from '$lib/server/ctrlhabits/utils/make_ctrlhabits_service';
import { toAddHabitRequest } from '$lib/server/ctrlhabits/utils/formdata';
import { CTRLHABITS_SERVICE_TYPE } from '$lib/server/env';

/**
 * The server-side load function for:
 * `GET /api/habits`
 */
export async function GET(event: RequestEvent): Promise<Response> {
	const ctrlhabitsService = makeCTRLHabitsService(CTRLHABITS_SERVICE_TYPE);
	const request = (await event.request.json()) as ListHabitsByUserRequest;
	const habits = await ctrlhabitsService.listHabitsByUser(request);
	return new Response(JSON.stringify(habits), { status: 200 });
}

/**
 * The server-side load function for:
 * `POST /api/habits`
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

	// Get the habit data from the form data.
	const formData = await event.request.formData();
	const { error, request: addHabitRequest } = toAddHabitRequest(formData, event.locals.user.id);
	if (error !== null) {
		return new Response(JSON.stringify({ error }), { status: 400 });
	}

	// Add the habit to the database.
	const ctrlhabitsService = makeCTRLHabitsService(CTRLHABITS_SERVICE_TYPE);
	const habit = await ctrlhabitsService.addHabit(addHabitRequest);
	return new Response(JSON.stringify(habit), { status: 200 });
}

import type { RequestEvent } from './$types';
import { makeCTRLHabitsService } from '$lib/server/ctrlhabits/utils/make_ctrlhabits_service';
import { toUpdateHabitRequest } from '$lib/server/ctrlhabits/utils/formdata';
import { CTRLHABITS_SERVICE_TYPE } from '$lib/server/env';

/**
 * The server-side load function for:
 * `PATCH /api/habits/[habit_id]`
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

	// Get the habit data from the form data.
	const formData = await event.request.formData();
	const { error, request: updateHabitRequest } = toUpdateHabitRequest(
		formData,
		event.params.habit_id
	);
	if (error !== null) {
		return new Response(JSON.stringify({ error }), { status: 400 });
	}

	// Check if the user is the owner of the habit. If not, return an error.
	const ctrlhabitsService = makeCTRLHabitsService(CTRLHABITS_SERVICE_TYPE);
	const oldHabit = await ctrlhabitsService.getHabitByID({
		id: updateHabitRequest.id
	});
	if (oldHabit.user_id !== event.locals.user.id) {
		return new Response('Forbidden', { status: 403 });
	}

	// Update the habit in the database.
	const habit = await ctrlhabitsService.updateHabit(updateHabitRequest);
	return new Response(JSON.stringify(habit), { status: 200 });
}

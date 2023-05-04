import type { RequestEvent } from './$types';
import type { AddHabitRequest, ID } from '$lib/server/ctrlhabits';
import { makeCTRLHabitsService } from '$lib/server/ctrlhabits/utils/make_ctrlhabits_service';
import { CTRLHABITS_SERVICE_TYPE } from '$lib/server/env';
import { parseBoolean } from '$lib/parse_boolean';

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
	const { error, request: addHabitRequest } = makeAddHabitRequest(formData, event.locals.user.id);
	if (error !== null) {
		return new Response(error, { status: 400 });
	}

	// Check if the chosen tag is available. If so, return an error.
	const ctrlhabitsService = makeCTRLHabitsService(CTRLHABITS_SERVICE_TYPE);
	const habit = await ctrlhabitsService.addHabit(addHabitRequest);
	return new Response(JSON.stringify(habit), { status: 200 });
}

/**
 * The server-side load function for:
 * `PATCH /api/habits`
 *
 * TODO: Implement this. Also, implement the makeUpdateHabitRequest
 * helper function.
 */

/**
 * makeAddHabitRequest takes a FormData object and returns an AddHabitRequest
 * object if the form data is valid. Otherwise, it returns an error message.
 *
 * TODO(EthanThatOneKid): Manually test this function.
 */
function makeAddHabitRequest(
	formData: FormData,
	userID: ID
): { request: AddHabitRequest; error: null } | { request: null; error: string } {
	const name = formData.get('name');
	if (typeof name !== 'string') {
		return { error: "Missing 'name' in form data", request: null };
	}

	const description = formData.get('description');
	if (typeof description !== 'string') {
		return { error: "Missing 'description' in form data", request: null };
	}

	const frequency = formData.get('frequency');
	if (typeof frequency !== 'string') {
		return { error: "Missing 'frequency' in form data", request: null };
	}

	const startDate = formData.get('start_date');
	if (typeof startDate !== 'string') {
		return { error: "Missing 'start_date' in form data", request: null };
	}

	const endDate = formData.get('end_date');
	if (typeof endDate !== 'string') {
		return { error: "Missing 'end_date' in form data", request: null };
	}

	const isPrivate = formData.get('private');
	if (typeof isPrivate !== 'string') {
		return { error: "Missing 'private' in form data", request: null };
	}

	return {
		request: {
			name,
			description,
			frequency: parseFloat(frequency),
			start_date: startDate,
			end_date: endDate,
			private: parseBoolean(isPrivate),
			user_id: userID
		},
		error: null
	};
}

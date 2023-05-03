import type { AddHabitRequest, ID } from '$lib/server/ctrlhabits';
import { makeCTRLHabitsService } from '$lib/server/ctrlhabits/utils/make_ctrlhabits_service';
import { CTRLHABITS_SERVICE_TYPE } from '$lib/server/env';
import type { RequestEvent } from './$types';

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

	// Get the tag from the form data. If it is missing, return an error.
	const formData = await event.request.formData();
	const addHabitRequest = makeAddHabitRequest(formData, event.locals.user.id);
	const tag = formData.get('tag');
	if (typeof tag !== 'string') {
		return new Response("Missing 'tag' in form data", { status: 400 });
	}

	// Check if the chosen tag is available. If so, return an error.
	const ctrlhabitsService = makeCTRLHabitsService(CTRLHABITS_SERVICE_TYPE);
	const existingUser = await ctrlhabitsService
		.addHabit({
			description,
			end_date,
			frequency,
			name,
			private,
			start_date,
			user_id: event.locals.user.id
		})
		.then((user) => user)
		.catch((error) => {
			console.error(error);
			return null;
		});
	if (existingUser) {
		return new Response('Tag already taken', { status: 409 });
	}
}

function makeAddHabitRequest(
	formData: FormData,
	userID: ID
): { request?: AddHabitRequest; error: string | null } {
	const name = formData.get('name');
	if (typeof name !== 'string') {
		return { error: "Missing 'tag' in form data" };
	}

	// TODO(EthanThatOneKid): Finish this.
	const description;

	return {
		request: {
			name,
			desc
		},
		error: null
	};
}

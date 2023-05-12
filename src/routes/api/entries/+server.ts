import type { RequestEvent } from './$types';
import type { ListEntriesByHabitRequest } from '$lib/ctrlhabits';
import { makeCTRLHabitsService } from '$lib/server/ctrlhabits/utils/make_ctrlhabits_service';
import { toAddEntryRequest } from '$lib/server/ctrlhabits/utils/formdata';
import { CTRLHABITS_SERVICE_TYPE } from '$lib/server/env';

/**
 * The server-side load function for:
 * `GET /api/entries`
 */
export async function GET(event: RequestEvent): Promise<Response> {
	const ctrlhabitsService = makeCTRLHabitsService(CTRLHABITS_SERVICE_TYPE);
	const request = (await event.request.json()) as ListEntriesByHabitRequest;
	const entries = await ctrlhabitsService.listEntriesByHabit(request);
	return new Response(JSON.stringify(entries), { status: 200 });
}

/**
 * The server-side load function for:
 * `POST /api/entries`
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

	// Get the entry data from the form data.
	const formData = await event.request.formData();
	const { error, request: addEntryRequest } = toAddEntryRequest(formData, event.locals.user.id);
	if (error !== null) {
		return new Response(JSON.stringify({ error }), { status: 400 });
	}

	// Add the entry to the database.
	const ctrlhabitsService = makeCTRLHabitsService(CTRLHABITS_SERVICE_TYPE);
	const entry = await ctrlhabitsService.addEntry(addEntryRequest);
	return new Response(JSON.stringify(entry), { status: 200 });
}
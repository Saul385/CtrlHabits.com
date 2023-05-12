import type { RequestEvent } from './$types';
import { makeCTRLHabitsService } from '$lib/server/ctrlhabits/utils/make_ctrlhabits_service';
import { toUpdateEntryRequest } from '$lib/server/ctrlhabits/utils/formdata';
import { CTRLHABITS_SERVICE_TYPE } from '$lib/server/env';

/**
 * The server-side load function for:
 * `GET /api/entries/[entry_id]`
 */
export async function GET(event: RequestEvent): Promise<Response> {
	const ctrlhabitsService = makeCTRLHabitsService(CTRLHABITS_SERVICE_TYPE);
	const entry = await ctrlhabitsService.getEntryByID({
		id: event.params.entry_id
	});
	return new Response(JSON.stringify(entry), { status: 200 });
}

/**
 * The server-side load function for:
 * `PATCH /api/entries/[entry_id]`
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

	// Get the entry data from the form data.
	const formData = await event.request.formData();
	const { error, request: updateEntryRequest } = toUpdateEntryRequest(
		formData,
		event.params.entry_id
	);
	if (error !== null) {
		return new Response(JSON.stringify({ error }), { status: 400 });
	}

	// Check if the user is the owner of the entry. If not, return an error.
	const ctrlhabitsService = makeCTRLHabitsService(CTRLHABITS_SERVICE_TYPE);
	const oldEntry = await ctrlhabitsService.getEntryByID({
		id: updateEntryRequest.id
	});
	if (oldEntry.user_id !== event.locals.user.id) {
		return new Response('Forbidden', { status: 403 });
	}

	// Update the entry in the database.
	const entry = await ctrlhabitsService.updateEntry(updateEntryRequest);
	return new Response(JSON.stringify(entry), { status: 200 });
}

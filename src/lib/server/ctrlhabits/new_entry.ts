import type { ID } from '$lib/oauth';
import type {
	AddEntryRequest,
	Entry,
	UpdateEntryRequest
} from '../../ctrlhabits/ctrlhabits_service_interface';
import { getCurrentTimestamp, makeUUID } from './utils/get_storage_options';

/**
 * NewEntryOptions is the data needed to create a new user in the database that was not provided by the request.
 */
export interface NewEntryOptions {
	id: ID;
	timestamp: string;
}

/**
 * makeNewEntry creates a new user from the request and options.
 */
export function makeNewEntry(request: AddEntryRequest, options: NewEntryOptions): Entry {
	return {
		id: options.id,
		user_id: request.user_id,
		date: request.date,
		habit_id: request.habit_id,
		value: request.value,
		content: request.content,
		created_at: options.timestamp,
		updated_at: options.timestamp
	};
}

/**
 * makeUpdatedEntry creates a new user from the request and options.
 */
export function makeUpdatedEntry(
	entry: Entry,
	request: UpdateEntryRequest,
	{ timestamp }: NewEntryOptions
): Entry {
	return {
		id: entry.id,
		user_id: entry.user_id,
		habit_id: entry.habit_id,
		date: request.date ?? entry.date,
		value: request.value ?? entry.value,
		content: request.content ?? entry.content,
		created_at: entry.created_at,
		updated_at: timestamp
	};
}

/**
 * getNewEntryOptions returns the default options for a new user.
 */
export function getNewEntryOptions(): NewEntryOptions {
	return {
		id: makeUUID(),
		timestamp: getCurrentTimestamp()
	};
}

/**
 * ERROR_USER_NOT_FOUND is the error returned when a user is not found.
 */
export const ERROR_USER_NOT_FOUND = new Error('Entry not found');

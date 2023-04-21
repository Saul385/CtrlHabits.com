import type { AddUserRequest, User } from './user_service_interface';

/**
 * NewUserOptions is the data needed to create a new user in the database that was not provided by the request.
 */
export interface NewUserOptions {
	id: string;
	timestamp: string;
}

/**
 * makeNewUser creates a new user from the request and options.
 */
export function makeNewUser(request: AddUserRequest, options: NewUserOptions): User {
	const githubID = request.oauth.name === 'github' ? request.oauth.user_id : null;
	const googleID = request.oauth.name === 'google' ? request.oauth.user_id : null;
	return {
		id: options.id,
		tag: request.tag ?? request.oauth.user_tag,
		bio: request.oauth.user_bio,
		avatar_url: request.oauth.user_avatar_url,
		github_id: githubID,
		google_id: googleID,
		created_at: options.timestamp,
		updated_at: options.timestamp
	};
}

/**
 * getNewUserOptions returns the default options for a new user.
 */
export function getNewUserOptions(): NewUserOptions {
	return {
		id: makeUUID(),
		timestamp: getCurrentTimestamp()
	};
}

/**
 * makeUUID generates a random UUID.
 */
export function makeUUID(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

/**
 * getCurrentTimestamp gets the current timestamp in ISO format.
 */
export function getCurrentTimestamp(date: Date = new Date()): string {
	return date.toISOString();
}

/**
 * ERROR_USER_NOT_FOUND is the error returned when a user is not found.
 */
export const ERROR_USER_NOT_FOUND = new Error('User not found');

import { randomUUID } from 'node:crypto';
import { parseGitHubID, parseGoogleID } from '$lib/server/oauth/utils/parse_oauth_id';
import type { AddUserRequest, User } from './user_service_interface';

/**
 * NewUserOptions is the data needed to create a new user in the database that was not provided by the request.
 */
export interface NewUserOptions {
	id: string;
	tag: string | null;
	timestamp: string;
}

/**
 * makeNewUser creates a new user from the request and options.
 */
export function makeNewUser(request: AddUserRequest, options: NewUserOptions): User {
	const githubID = parseGitHubID(request.oauthData.type, request.oauthData);
	const googleID = parseGoogleID(request.oauthData.type, request.oauthData);
	console.log({ googleID, githubID, request, options });
	return {
		id: options.id,
		tag: options.tag,
		bio: request.oauthData.bio,
		avatar_url: request.oauthData.avatar_url,
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
		tag: null,
		timestamp: getCurrentTimestamp()
	};
}

/**
 * makeUUID generates a random UUID.
 */
export function makeUUID(): string {
	return randomUUID();
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

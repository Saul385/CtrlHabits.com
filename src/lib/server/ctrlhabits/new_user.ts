import { parseGitHubID, parseGoogleID } from '$lib/server/oauth/utils/parse_oauth_id';
import type { AddUserRequest, User } from './ctrlhabits_service_interface';
import { getCurrentTimestamp, makeUUID } from './utils/get_storage_options';

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
 * ERROR_USER_NOT_FOUND is the error returned when a user is not found.
 */
export const ERROR_USER_NOT_FOUND = new Error('User not found');

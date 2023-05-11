import { parseGitHubID, parseGoogleID } from '$lib/server/oauth/utils/parse_oauth_id';
import type { ID } from '$lib/server/oauth';
import type {
	AddUserRequest,
	UpdateUserRequest,
	User
} from '../../ctrlhabits/ctrlhabits_service_interface';
import { getCurrentTimestamp, makeUUID } from './utils/get_storage_options';

/**
 * NewUserOptions is the data needed to create a new user in the database that was not provided by the request.
 */
export interface NewUserOptions {
	id: ID;
	tag: string | null;
	timestamp: string;
}

/**
 * makeNewUser creates a new user from the request and options.
 */
export function makeNewUser(request: AddUserRequest, options: NewUserOptions): User {
	const githubID = parseGitHubID(request.oauthData.type, request.oauthData);
	const googleID = parseGoogleID(request.oauthData.type, request.oauthData);
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
 * makeUpdatedUser creates a new user from the request and options.
 */
export function makeUpdatedUser(
	user: User,
	request: UpdateUserRequest,
	{ timestamp }: NewUserOptions
): User {
	return {
		id: user.id,
		tag: request.tag ?? user.tag,
		bio: request.bio ?? user.bio,
		avatar_url: request.avatar_url ?? user.avatar_url,
		github_id: request.github_id ?? user.github_id,
		google_id: request.google_id ?? user.google_id,
		created_at: user.created_at,
		updated_at: timestamp
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

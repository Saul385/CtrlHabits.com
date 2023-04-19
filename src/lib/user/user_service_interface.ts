import type { OAuthData } from '$lib/oauth/oauth_service_interface';

/**
 * UserServiceInterface is the interface for the user service.
 */
export interface UserServiceInterface {
	getUser(r: GetUserRequest): Promise<GetUserResponse>;
	addUser(r: AddUserRequest): Promise<AddUserResponse>;
	listUsers(r: ListUsersRequest): Promise<ListUsersResponse>;
	listUsersByTags(r: ListUsersByTagsRequest): Promise<ListUsersByTagsResponse>;
	remove(r: RemoveUserRequest): Promise<void>;
}

export interface User {
	id: string;
	tag: string;
	bio: string;
	avatar_url: string; // TODO: Verify that avatar_url has an allowed domain.
	github_id: string | null;
	google_id: string | null; // Unimplemented.
	created_at: string;
	updated_at: string;
}

/**
 * AddUserRequest is the request to add a user to storage.
 *
 * TODO: Allow user to customize bio and avatar_url on signup.
 */
export interface AddUserRequest {
	/**
	 * tag is the user's tag.
	 */
	tag: string;

	/**
	 * oauth is the user's verified OAuth data.
	 */
	oauth: OAuthData;
}

/**
 * AddUserResponse is the response from adding a user to storage.
 */
export type AddUserResponse = User;

/**
 * GetUserRequest is the request to get a single user from storage.
 */
export interface GetUserRequest {
	id: number;
}

/**
 * GetUserResponse is the response from getting a user from storage.
 */
export type GetUserResponse = User;

/**
 * ListUsersRequest is the request to list users from storage.
 */
export interface ListUsersRequest {
	limit: number;
	offset: number;
}

/**
 * ListUsersResponse is the response from listing users from storage.
 */
export interface ListUsersResponse {
	users: User[];
	total: number;
}

/**
 * ListUsersByNamesRequest is the request to list users by name from storage.
 */
export interface ListUsersByTagsRequest {
	tags: string[];
}

/**
 * ListUsersByNamesResponse is the response from listing users by name from storage.
 */
export interface ListUsersByTagsResponse {
	users: User[];
}

/**
 * RemoveUserRequest is the request to remove a user from storage.
 */
export interface RemoveUserRequest {
	id: number;
}

import type { OAuthData } from '$lib/server/oauth/oauth_service_interface';

/**
 * UserServiceInterface is the interface for the user service.
 */
export interface UserServiceInterface {
	/**
	 * addUser adds a user to storage. If the user already exists, it throws an error.
	 */
	addUser(r: AddUserRequest): Promise<AddUserResponse>;

	/**
	 * updateUser updates an existing user in storage.
	 */
	updateUser(r: UpdateUserRequest): Promise<UpdateUserResponse>;

	/**
	 * getUserByID gets a user from storage by ID.
	 */
	getUserByID(r: GetUserByIDRequest): Promise<GetUserByIDResponse>;

	/**
	 * getUserByGitHubID gets a user from storage by GitHub ID.
	 */
	getUserByGitHubID(r: GetUserByGitHubIDRequest): Promise<GetUserByGitHubIDResponse>;

	/**
	 * getUserByGoogleID gets a user from storage by Google ID.
	 */
	getUserByGoogleID(r: GetUserByGoogleIDRequest): Promise<GetUserByGoogleIDResponse>;

	/**
	 * listUsers lists all users in storage.
	 */
	listUsers(r: ListUsersRequest): Promise<ListUsersResponse>;

	/**
	 * removeUser removes a user from storage.
	 */
	removeUser(r: RemoveUserRequest): Promise<void>;
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
	tag: string | null;

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
 * UpdateUserRequest is the request to update a user in storage.
 */
export interface UpdateUserRequest {
	id: string;
	tag?: string;
	bio?: string;
	avatar_url?: string; // TODO: Verify that avatar_url has an allowed domain.
	github_id?: string | null;
	google_id?: string | null;
}

/**
 * UpdateUserResponse is the response from updating a user in storage.
 */
export type UpdateUserResponse = User;

/**
 * GetUserByIDRequest is the request to get a single user from storage.
 */
export interface GetUserByIDRequest {
	id: string;
}

/**
 * GetUserByIDResponse is the response from getting a user from storage.
 */
export type GetUserByIDResponse = User;

/**
 * GetUserByGitHubIDRequest is the request to get a single user from storage.
 */
export interface GetUserByGitHubIDRequest {
	github_id: string;
}

/**
 * GetUserByGitHubIDResponse is the response from getting a user from storage.
 */
export type GetUserByGitHubIDResponse = User;

/**
 * GetUserByGoogleIDRequest is the request to get a single user from storage.
 */
export interface GetUserByGoogleIDRequest {
	google_id: string;
}

/**
 * GetUserByGoogleIDResponse is the response from getting a user from storage.
 */
export type GetUserByGoogleIDResponse = User;

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
 * RemoveUserRequest is the request to remove a user from storage.
 */
export interface RemoveUserRequest {
	id: string;
}

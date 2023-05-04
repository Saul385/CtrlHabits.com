import type { OAuthData } from '$lib/server/oauth/oauth_service_interface';

/**
 * ID is an alias for the string type.
 */
export type ID = string;

/**
 * CTRLHabitsServiceInterface is the interface for the user service.
 */
export interface CTRLHabitsServiceInterface {
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
	 * getUserByTag gets a user from storage by tag.
	 */
	getUserByTag(r: GetUserByTagRequest): Promise<GetUserByTagResponse>;

	/**
	 * listUsers lists all users in storage.
	 */
	listUsers(r: ListUsersRequest): Promise<ListUsersResponse>;

	/**
	 * removeUser removes a user from storage.
	 */
	removeUser(r: RemoveUserRequest): Promise<void>;

	/**
	 * addHabit adds a habit to storage. If the habit already exists, it throws an error.
	 */
	addHabit(r: AddHabitRequest): Promise<AddHabitResponse>;

	/**
	 * updateHabit updates an existing habit in storage.
	 */
	// updateHabit(r: UpdateHabitRequest): Promise<UpdateHabitResponse>;

	// /**
	//  * getHabitByID gets a habit from storage by ID.
	//  */
	// getHabitByID(r: GetHabitByIDRequest): Promise<GetHabitByIDResponse>;

	/**
	 * listHabits lists all habits in storage.
	 *
	 * TODO: Implement listHabits.
	 */
	listHabits(r: ListHabitsRequest): Promise<ListHabitsResponse>;
}

/**
 * User is a user as stored in storage.
 */
export interface User {
	id: ID;
	tag: string | null;
	bio: string;
	avatar_url: string; // TODO: Verify that avatar_url has an allowed domain.
	github_id: ID | null;
	google_id: ID | null; // Unimplemented.
	created_at: string;
	updated_at: string;
}

/**
 * AddUserRequest is the request to add a user to storage.
 *
 * TODO: Allow user to customize tag, bio and avatar_url on signup.
 */
export interface AddUserRequest {
	/**
	 * oauthData is the user's verified OAuth data.
	 */
	oauthData: OAuthData;
}

/**
 * AddUserResponse is the response from adding a user to storage.
 */
export type AddUserResponse = User;

/**
 * UpdateUserRequest is the request to update a user in storage.
 */
export interface UpdateUserRequest {
	id: ID;
	tag?: string;
	bio?: string;
	avatar_url?: string; // TODO: Verify that avatar_url has an allowed domain.
	github_id?: ID | null;
	google_id?: ID | null;
}

/**
 * UpdateUserResponse is the response from updating a user in storage.
 */
export type UpdateUserResponse = User;

/**
 * GetUserByIDRequest is the request to get a single user from storage.
 */
export interface GetUserByIDRequest {
	id: ID;
}

/**
 * GetUserByIDResponse is the response from getting a user from storage.
 */
export type GetUserByIDResponse = User;

/**
 * GetUserByGitHubIDRequest is the request to get a single user from storage.
 */
export interface GetUserByGitHubIDRequest {
	github_id: ID;
}

/**
 * GetUserByGitHubIDResponse is the response from getting a user from storage.
 */
export type GetUserByGitHubIDResponse = User;

/**
 * GetUserByGoogleIDRequest is the request to get a single user from storage.
 */
export interface GetUserByGoogleIDRequest {
	google_id: ID;
}

/**
 * GetUserByGoogleIDResponse is the response from getting a user from storage.
 */
export type GetUserByGoogleIDResponse = User;

/**
 * GetUserByTagRequest is the request to get a single user from storage.
 */
export interface GetUserByTagRequest {
	tag: string;
}

/**
 * GetUserByTagResponse is the response from getting a user from storage.
 */
export type GetUserByTagResponse = User;

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
	id: ID;
}

/**
 * Habit is a habit as stored in storage.
 */
export interface Habit {
	id: ID;
	name: string;
	private: boolean;
	description: string;
	frequency: number;
	start_date: string;
	end_date: string;
	user_id: ID;
	created_at: string;
	updated_at: string;
}

/**
 * AddHabitRequest is the request to add a habit to storage.
 */
export interface AddHabitRequest {
	name: string;
	description: string;
	frequency: number;
	start_date: string;
	end_date: string;
	private: boolean;
	user_id: ID;
}

/**
 * AddHabitResponse is the response from adding a habit to storage.
 */
export type AddHabitResponse = Habit;

/**
 * ListHabitsRequest is the request to list habits from storage
 * for a given user.
 */
export interface ListHabitsRequest {
	user_id: ID;
	limit: number;
	offset: number;
}

/**
 * ListHabitsResponse is the response from listing habits from storage.
 */
export interface ListHabitsResponse {
	habits: Habit[];
}

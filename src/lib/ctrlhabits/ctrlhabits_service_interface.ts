import type { ID, OAuthData } from '$lib/oauth/oauth_service_interface';

/**
 * CTRLHabitsServiceInterface is the interface for the CTRLHabits storage service.
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
	updateHabit(r: UpdateHabitRequest): Promise<UpdateHabitResponse>;

	/**
	 * getHabitByID gets a habit from storage by ID.
	 */
	getHabitByID(r: GetHabitByIDRequest): Promise<GetHabitByIDResponse>;

	/**
	 * listHabitsByUser lists all habits in storage by user ID.
	 */
	listHabitsByUser(r: ListHabitsByUserRequest): Promise<ListHabitsByUserResponse>;

	/**
	 * removeHabit removes a habit from storage.
	 */
	removeHabit(r: RemoveHabitRequest): Promise<void>;

	/**
	 * addEntry adds an entry to storage.
	 */
	addEntry(r: AddEntryRequest): Promise<AddEntryResponse>;

	/**
	 * updateEntry updates an existing entry in storage.
	 */
	updateEntry(r: UpdateEntryRequest): Promise<UpdateEntryResponse>;

	/**
	 * getEntryByID gets an entry from storage by ID.
	 */
	getEntryByID(r: GetEntryByIDRequest): Promise<GetEntryByIDResponse>;

	/**
	 * listEntriesByHabit lists all entries in storage by habit ID.
	 */
	listEntriesByHabit(r: ListEntriesByHabitRequest): Promise<ListEntriesByHabitResponse>;

	/**
	 * removeEntry removes an entry from storage.
	 */
	removeEntry(r: RemoveEntryRequest): Promise<void>;
}

/**
 * User is a user as stored in storage.
 */
export interface User {
	/**
	 * id is the user's ID.
	 *
	 * The id is unique in a set of users.
	 */
	id: ID;

	/**
	 * tag is the user's tag.
	 *
	 * A null tag represents a user without a tag.
	 */
	tag: string | null;

	/**
	 * bio is the user's bio.
	 *
	 * Defaults to an empty string.
	 */
	bio: string;

	/**
	 * avatar_url is the user's avatar URL.
	 *
	 * Defaults to an empty string.
	 *
	 * Domain must be one of the valid domains:
	 * - https://avatars.githubusercontent.com
	 * - TODO(EthanThatOneKid): Add more domains.
	 */
	avatar_url: string;

	/**
	 * github_id is the user's GitHub ID.
	 */
	github_id: ID | null;

	/**
	 * google_id is the user's Google ID.
	 */
	google_id: ID | null;

	/**
	 * created_at is the time the user was created.
	 */
	created_at: string;

	/**
	 * updated_at is the time the user was last updated.
	 */
	updated_at: string;
}

/**
 * AddUserRequest is the request to add a user to storage.
 *
 * TODO(future work): Allow user to customize tag, bio and avatar_url on signup.
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
	avatar_url?: string;
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
	/**
	 * limit is the maximum number of users to return.
	 */
	limit: number;

	/**
	 * offset is the number of users to skip.
	 */
	offset: number;
}

/**
 * ListUsersResponse is the response from listing users from storage.
 */
export interface ListUsersResponse {
	/**
	 * users is the list of users.
	 */
	users: User[];

	/**
	 * offset is the offset to use for the next request.
	 */
	offset: number;

	/**
	 * has_more is whether there are more users to fetch.
	 */
	has_more: boolean;
}

/**
 * RemoveUserRequest is the request to remove a user from storage.
 */
export interface RemoveUserRequest {
	id: ID;
}

/**
 * Habit is a habit as stored in storage.
 *
 * TODO(EthanThatOneKid): Design a real habit interface:
 * - Add a habit timezone field.
 */
export interface Habit {
	/**
	 * id is the habit's ID.
	 */
	id: ID;

	/**
	 * name is the habit's name.
	 */
	name: string;

	/**
	 * private is whether the habit is private.
	 */
	private: boolean;

	/**
	 * description is the habit's description.
	 */
	description: string;

	/**
	 * frequency is the habit's frequency.
	 */
	frequency: number;

	/**
	 * start_date is the habit's start date.
	 */
	start_date: string;

	/**
	 * end_date is the habit's end date.
	 */
	end_date: string;

	/**
	 * user_id is the habit's user ID.
	 */
	user_id: ID;

	/**
	 * created_at is the time the habit was created.
	 */
	created_at: string;

	/**
	 * updated_at is the time the habit was last updated.
	 */
	updated_at: string;
}

/**
 * AddHabitRequest is the request to add a habit to storage..
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
 * UpdateHabitRequest is the request to update a habit in storage.
 */
export interface UpdateHabitRequest {
	id: ID;
	name?: string;
	description?: string;
	frequency?: number;
	start_date?: string;
	end_date?: string;
	private?: boolean;
}

/**
 * UpdateHabitResponse is the response from updating a habit in storage.
 */
export type UpdateHabitResponse = Habit;

/**
 * GetHabitByIDRequest is the request to get a single habit from storage.
 */
export interface GetHabitByIDRequest {
	id: ID;
}

/**
 * GetHabitByIDResponse is the response from getting a habit from storage.
 */
export type GetHabitByIDResponse = Habit;

/**
 * ListHabitsRequest is the request to list habits from storage
 * for a given user.
 */
export interface ListHabitsByUserRequest {
	/**
	 * user_id is the ID of the user to list habits for.
	 */
	user_id: ID;

	/**
	 * limit is the maximum number of habits to return.
	 */
	limit: number;

	/**
	 * offset is the offset into the list of habits.
	 */
	offset: number;
}

/**
 * ListHabitsByUserResponse is the response from listing habits from storage.
 */
export interface ListHabitsByUserResponse {
	/**
	 * habits is the list of habits.
	 */
	habits: Habit[];

	/**
	 * offset is the offset to use for the next request.
	 */
	offset: number;

	/**
	 * has_more is whether there are more habits to fetch.
	 */
	has_more: boolean;
}

/**
 * RemoveHabitRequest is the request to remove a habit from storage.
 * Removing a habit also removes all entries for that habit.
 */
export interface RemoveHabitRequest {
	id: ID;
}

/**
 * Entry is an entry as stored in storage.
 */
export interface Entry {
	/**
	 * id is the ID of the entry.
	 */
	id: ID;

	/**
	 * habit_id is the ID of the habit the entry belongs to.
	 */
	habit_id: ID;

	/**
	 * user_id is the ID of the user the entry belongs to.
	 */
	user_id: ID;

	/**
	 * date is the date of the entry.
	 */
	date: string;

	/**
	 * value is the value of the entry.
	 */
	value: number;

	/**
	 * content is the content of the entry.
	 */
	content: string;

	/**
	 * created_at is the time the entry was created.
	 */
	created_at: string;

	/**
	 * updated_at is the time the entry was last updated.
	 */
	updated_at: string;
}

/**
 * AddEntryRequest is the request to add an entry to storage.
 */
export interface AddEntryRequest {
	habit_id: ID;
	user_id: ID;
	date: string;
	value: number;
	content: string;
}

/**
 * AddEntryResponse is the response from adding an entry to storage.
 */
export type AddEntryResponse = Entry;

/**
 * UpdateEntryRequest is the request to update an entry in storage.
 */
export interface UpdateEntryRequest {
	id: ID;
	date?: string;
	content?: string;
	value?: number;
}

/**
 * UpdateEntryResponse is the response from updating an entry in storage.
 */
export type UpdateEntryResponse = Entry;

/**
 * GetEntryByIDRequest is the request to get a single entry from storage.
 */
export interface GetEntryByIDRequest {
	id: ID;
}

/**
 * GetEntryByIDResponse is the response from getting an entry from storage.
 */
export type GetEntryByIDResponse = Entry;

/**
 * ListEntriesByHabitRequest is the request to list entries from storage
 * for a given habit.
 */
export interface ListEntriesByHabitRequest {
	/**
	 * habit_id is the ID of the habit to list entries for.
	 */
	habit_id: ID;

	/**
	 * limit is the maximum number of entries to return.
	 */
	limit: number;

	/**
	 * offset is the offset into the list of entries.
	 * It is used for pagination.
	 */
	offset: number;
}

/**
 * ListEntriesByHabitResponse is the response from listing entries from storage.
 * The entries are sorted by date.
 */
export interface ListEntriesByHabitResponse {
	/**
	 * entries is the list of entries.
	 * The entries are sorted by date.
	 */
	entries: Entry[];

	/**
	 * offset is the offset into the list of entries.
	 */
	offset: number;

	/**
	 * has_more indicates if there are more entries to list.
	 */
	has_more: boolean;
}

/**
 * RemoveEntryRequest is the request to remove an entry from storage.
 */
export interface RemoveEntryRequest {
	id: ID;
}

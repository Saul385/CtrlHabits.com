import type {
	AddEntryRequest,
	AddEntryResponse,
	AddHabitRequest,
	AddHabitResponse,
	GetEntryByIDRequest,
	GetEntryByIDResponse,
	GetHabitByIDRequest,
	GetHabitByIDResponse,
	GetUserByIDRequest,
	GetUserByIDResponse,
	ListEntriesByHabitRequest,
	ListEntriesByHabitResponse,
	ListHabitsByUserRequest,
	ListHabitsByUserResponse,
	RemoveEntryRequest,
	RemoveHabitRequest,
	UpdateEntryRequest,
	UpdateEntryResponse,
	UpdateHabitRequest,
	UpdateHabitResponse,
	UpdateUserRequest,
	UpdateUserResponse
} from '$lib/ctrlhabits';

/**
 * CTRLHabitsAPIInterface is the interface for the https://ctrlhabits.com/api API.
 */
export interface CTRLHabitsAPIInterface {
	/**
	 * getHabits makes a GET request to https://ctrlhabits.com/api/habits.
	 */
	getHabits(r: APIHabitsGetRequest): Promise<APIHabitsGetResponse>;

	/**
	 * postHabits makes a POST request to https://ctrlhabits.com/api/habits.
	 *
	 * This endpoint creates a new habit for the authenticated user.
	 */
	postHabits(r: APIHabitsPostRequest): Promise<APIHabitsPostResponse>;

	/**
	 * getHabitsHabitID makes a GET request to https://ctrlhabits.com/api/habits/[habit_id].
	 *
	 * This endpoint returns a habit by its ID. If it is private, only the owner can access it.
	 */
	getHabitsHabitID(r: APIHabitsHabitIDGetRequest): Promise<APIHabitsHabitIDGetResponse>;

	/**
	 * patchHabitsHabitID makes a PATCH request to https://ctrlhabits.com/api/habits/[habit_id].
	 *
	 * This endpoint updates a habit by its ID. Only the owner can update it.
	 */
	patchHabitsHabitID(r: APIHabitsHabitIDPatchRequest): Promise<APIHabitsHabitIDPatchResponse>;

	/**
	 * deleteHabitsHabitID makes a DELETE request to https://ctrlhabits.com/api/habits/[habit_id].
	 *
	 * This endpoint deletes a habit by its ID. Only the owner can delete it.
	 */
	deleteHabitsHabitID(r: APIHabitsHabitIDDeleteRequest): Promise<APIHabitsHabitIDDeleteResponse>;

	/**
	 * getEntries makes a GET request to https://ctrlhabits.com/api/entries.
	 *
	 * This endpoint returns a list of entries by habit ID. If the habit is private, only the owner can access it.
	 */
	getEntries(r: APIEntriesGetRequest): Promise<APIEntriesGetResponse>;

	/**
	 * postEntries makes a POST request to https://ctrlhabits.com/api/entries.
	 *
	 * This endpoint creates a new entry for the authenticated user.
	 */
	postEntries(r: APIEntriesPostRequest): Promise<APIEntriesPostResponse>;

	/**
	 * getEntriesEntryID makes a GET request to https://ctrlhabits.com/api/entries/[entry_id].
	 *
	 * This endpoint returns an entry by its ID.
	 */
	getEntriesEntryID(r: APIEntriesEntryIDGetRequest): Promise<APIEntriesEntryIDGetResponse>;

	/**
	 * patchEntriesEntryID makes a PATCH request to https://ctrlhabits.com/api/entries/[entry_id].
	 *
	 * This endpoint updates an entry by its ID. Only the owner can update it.
	 */
	patchEntriesEntryID(r: APIEntriesEntryIDPatchRequest): Promise<APIEntriesEntryIDPatchResponse>;

	/**
	 * getUsersUserID makes a GET request to https://ctrlhabits.com/api/users/[user_id].
	 *
	 * This endpoint returns a user by their ID.
	 */
	getUsersUserID(r: APIUsersUserIDGetRequest): Promise<APIUsersUserIDGetResponse>;

	/**
	 * patchUsersUserID makes a PATCH request to https://ctrlhabits.com/api/users/[user_id].
	 *
	 * This endpoint updates a user by their ID.
	 */
	patchUsersUserID(r: APIUsersUserIDPatchRequest): Promise<APIUsersUserIDPatchResponse>;
}

/**
 * APIHabitsGetRequest is the request type of the GET /api/habits endpoint.
 */
export type APIResponse<T = undefined> = { error: string; data: null } | { error: null; data: T };

/**
 * APIHabitsGetRequest is the request type of the GET /api/habits endpoint.
 */
export type APIHabitsGetRequest = ListHabitsByUserRequest;

/**
 * APIHabitsGetResponse is the response type of the GET /api/habits endpoint.
 */
export type APIHabitsGetResponse = APIResponse<ListHabitsByUserResponse>;

/**
 * APIHabitsPostRequest is the request type of the POST /api/habits endpoint.
 */
export type APIHabitsPostRequest = AddHabitRequest;

/**
 * APIHabitsPostResponse is the response type of the POST /api/habits endpoint.
 */
export type APIHabitsPostResponse = APIResponse<AddHabitResponse>;

/**
 * APIHabitsHabitIDGetRequest is the request type of the GET /api/habits/[habit_id] endpoint.
 */
export type APIHabitsHabitIDGetRequest = GetHabitByIDRequest;

/**
 * APIHabitsHabitIDGetResponse is the response type of the GET /api/habits/[habit_id] endpoint.
 */
export type APIHabitsHabitIDGetResponse = APIResponse<GetHabitByIDResponse>;

/**
 * APIHabitsHabitIDPatchRequest is the request type of the PATCH /api/habits/[habit_id] endpoint.
 */
export type APIHabitsHabitIDPatchRequest = UpdateHabitRequest;

/**
 * APIHabitsHabitIDPatchResponse is the response type of the PATCH /api/habits/[habit_id] endpoint.
 */
export type APIHabitsHabitIDPatchResponse = APIResponse<UpdateHabitResponse>;

/**
 * APIHabitsHabitIDDeleteRequest is the request type of the DELETE /api/habits/[habit_id] endpoint.
 */
export type APIHabitsHabitIDDeleteRequest = RemoveHabitRequest;

/**
 * APIHabitsHabitIDDeleteResponse is the response type of the DELETE /api/habits/[habit_id] endpoint.
 */
export type APIHabitsHabitIDDeleteResponse = APIResponse;

/**
 * APIEntriesGetRequest is the request type of the GET /api/entries endpoint.
 */
export type APIEntriesGetRequest = ListEntriesByHabitRequest;

/**
 * APIEntriesGetResponse is the response type of the GET /api/entries endpoint.
 */
export type APIEntriesGetResponse = APIResponse<ListEntriesByHabitResponse>;

/**
 * APIEntriesPostRequest is the request type of the POST /api/entries endpoint.
 */
export type APIEntriesPostRequest = AddEntryRequest;

/**
 * APIEntriesPostResponse is the response type of the POST /api/entries endpoint.
 */
export type APIEntriesPostResponse = APIResponse<AddEntryResponse>;

/**
 * APIEntriesEntryIDGetRequest is the request type of the GET /api/entries/[entry_id] endpoint.
 */
export type APIEntriesEntryIDGetRequest = GetEntryByIDRequest;

/**
 * APIEntriesEntryIDGetResponse is the response type of the GET /api/entries/[entry_id] endpoint.
 */
export type APIEntriesEntryIDGetResponse = APIResponse<GetEntryByIDResponse>;

/**
 * APIEntriesEntryIDPatchRequest is the request type of the PATCH /api/entries/[entry_id] endpoint.
 */
export type APIEntriesEntryIDPatchRequest = UpdateEntryRequest;

/**
 * APIEntriesEntryIDPatchResponse is the response type of the PATCH /api/entries/[entry_id] endpoint.
 */
export type APIEntriesEntryIDPatchResponse = APIResponse<UpdateEntryResponse>;

/**
 * APIEntriesEntryIDDeleteRequest is the request type of the DELETE /api/entries/[entry_id] endpoint.
 */
export type APIEntriesEntryIDDeleteRequest = RemoveEntryRequest;

/**
 * APIEntriesEntryIDDeleteResponse is the response type of the DELETE /api/entries/[entry_id] endpoint.
 */
export type APIEntriesEntryIDDeleteResponse = APIResponse;

/**
 * APIUsersUserIDGetRequest is the request type of the GET /api/users/[user_id] endpoint.
 */
export type APIUsersUserIDGetRequest = GetUserByIDRequest;

/**
 * APIUsersUserIDGetResponse is the response type of the GET /api/users/[user_id] endpoint.
 */
export type APIUsersUserIDGetResponse = APIResponse<GetUserByIDResponse>;

/**
 * APIUsersUserIDPatchRequest is the request type of the PATCH /api/users/[user_id] endpoint.
 */
export type APIUsersUserIDPatchRequest = UpdateUserRequest;

/**
 * APIUsersUserIDPatchResponse is the response type of the PATCH /api/users/[user_id] endpoint.
 */
export type APIUsersUserIDPatchResponse = APIResponse<UpdateUserResponse>;

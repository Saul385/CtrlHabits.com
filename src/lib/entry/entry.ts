export interface Entry {
	id: string;
	message: string;
	date: string;
	habit_id: string;
	user_id: string;
	created_at: string;
	updated_at: string;
}

export interface AddEntryRequest {
	message: string;
	date: string;
	habit_id: string;
	user_id: string;
}

export type AddEntryResponse = Entry;

export interface GetEntryRequest {
	id: string;
}

export type GetEntryResponse = Entry;

export interface ListEntriesRequest {
	limit: number;
	offset: number;
}

export interface ListEntriesResponse {
	entries: Entry[];
	total: number;
}

export interface ListEntriesByHabitRequest {
	habit_id: string;
}

export interface ListEntriesByHabitResponse {
	entries: Entry[];
}

export interface ListEntriesByUserRequest {
	user_id: string;
	// friends: boolean;
}

export interface ListEntriesByUserResponse {
	entries: Entry[];
}

export interface RemoveEntryRequest {
	id: string;
}

export type RemoveEntryResponse = void;

export interface UpdateEntryRequest {
	id: string;
	message: string;
	date: string;
	habit_id: string;
	user_id: string;
}

export type UpdateEntryResponse = void;

export interface EntryService {
	addEntry: (request: AddEntryRequest) => Promise<AddEntryResponse>;
	getEntry: (request: GetEntryRequest) => Promise<GetEntryResponse>;
	listEntries: (request: ListEntriesRequest) => Promise<ListEntriesResponse>;
	listEntriesByHabit: (request: ListEntriesByHabitRequest) => Promise<ListEntriesByHabitResponse>;
	listEntriesByUser: (request: ListEntriesByUserRequest) => Promise<ListEntriesByUserResponse>;
	removeEntry: (request: RemoveEntryRequest) => Promise<RemoveEntryResponse>;
	updateEntry: (request: UpdateEntryRequest) => Promise<UpdateEntryResponse>;
}

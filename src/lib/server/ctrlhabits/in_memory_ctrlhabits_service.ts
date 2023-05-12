import type { ID } from '$lib/oauth';
import type {
	AddEntryRequest,
	AddEntryResponse,
	AddHabitRequest,
	AddHabitResponse,
	AddUserRequest,
	AddUserResponse,
	CTRLHabitsServiceInterface,
	Entry,
	GetEntryByIDRequest,
	GetEntryByIDResponse,
	GetHabitByIDRequest,
	GetHabitByIDResponse,
	GetUserByGitHubIDRequest,
	GetUserByGitHubIDResponse,
	GetUserByGoogleIDRequest,
	GetUserByGoogleIDResponse,
	GetUserByIDRequest,
	GetUserByIDResponse,
	GetUserByTagRequest,
	GetUserByTagResponse,
	Habit,
	ListEntriesByHabitRequest,
	ListEntriesByHabitResponse,
	ListHabitsByUserRequest,
	ListHabitsByUserResponse,
	ListUsersRequest,
	ListUsersResponse,
	RemoveEntryRequest,
	RemoveHabitRequest,
	RemoveUserRequest,
	UpdateEntryRequest,
	UpdateEntryResponse,
	UpdateHabitRequest,
	UpdateHabitResponse,
	UpdateUserRequest,
	UpdateUserResponse,
	User
} from '$lib/ctrlhabits';
import { getNewEntryOptions, makeNewEntry, makeUpdatedEntry } from './new_entry';
import { getNewHabitOptions, makeNewHabit, makeUpdatedHabit } from './new_habit';
import { ERROR_USER_NOT_FOUND, getNewUserOptions, makeNewUser, makeUpdatedUser } from './new_user';

/**
 * InMemoryCTRLHabitsService is a fake user service that stores users in memory.
 */
export class InMemoryCTRLHabitsService implements CTRLHabitsServiceInterface {
	constructor(public readonly data = DEFAULT_IN_MEMORY_CTRLHABITS_SERVICE_DATA) {}

	public async addUser(r: AddUserRequest): Promise<AddUserResponse> {
		const options = getNewUserOptions();
		const newUser = makeNewUser(r, options);

		// Check if the tag is already taken.
		for (const userID in this.data.users) {
			const user = this.data.users[userID];
			if (user.tag === newUser.tag) {
				return Promise.reject(new Error(`tag ${newUser.tag} is already taken`));
			}
		}

		console.log({ options, newUser, data: this.data.users });
		this.data.users[options.id] = newUser;
		return Promise.resolve(newUser);
	}

	public async updateUser(r: UpdateUserRequest): Promise<UpdateUserResponse> {
		const user = this.data.users[r.id];
		if (!user) {
			return Promise.reject(ERROR_USER_NOT_FOUND);
		}

		// Check if the tag is already taken.
		if (r.tag) {
			for (const userID in this.data.users) {
				const user = this.data.users[userID];
				if (user.tag === r.tag) {
					return Promise.reject(new Error(`tag ${r.tag} is already taken`));
				}
			}
		}

		// Update the user.
		const updatedUser = makeUpdatedUser(user, r, getNewUserOptions());
		this.data.users[r.id] = updatedUser;
		return Promise.resolve(updatedUser);
	}

	public async getUserByID(r: GetUserByIDRequest): Promise<GetUserByIDResponse> {
		const user = this.data.users[r.id];
		if (user) {
			return Promise.resolve(user);
		}

		return Promise.reject(ERROR_USER_NOT_FOUND);
	}

	public async getUserByGitHubID(r: GetUserByGitHubIDRequest): Promise<GetUserByGitHubIDResponse> {
		const user = Object.values(this.data.users).find((u) => u.github_id === r.github_id);
		if (user) {
			return Promise.resolve(user);
		}

		return Promise.reject(ERROR_USER_NOT_FOUND);
	}

	public async getUserByGoogleID(r: GetUserByGoogleIDRequest): Promise<GetUserByGoogleIDResponse> {
		const user = Object.values(this.data.users).find((u) => u.google_id === r.google_id);
		if (user) {
			return Promise.resolve(user);
		}

		return Promise.reject(ERROR_USER_NOT_FOUND);
	}

	public async getUserByTag(r: GetUserByTagRequest): Promise<GetUserByTagResponse> {
		const user = Object.values(this.data.users).find((u) => u.tag === r.tag);
		if (user) {
			return Promise.resolve(user);
		}

		return Promise.reject(ERROR_USER_NOT_FOUND);
	}

	public async listUsers(r: ListUsersRequest): Promise<ListUsersResponse> {
		const allUsers = Object.values(this.data.users);
		const users = allUsers.slice(r.offset, r.offset + r.limit);
		return Promise.resolve({
			users,
			offset: r.offset + users.length,
			has_more: r.offset + users.length < allUsers.length
		});
	}

	public async removeUser(r: RemoveUserRequest): Promise<void> {
		if (this.data.users[r.id]) {
			delete this.data.users[r.id];
			return Promise.resolve();
		}

		return Promise.reject(ERROR_USER_NOT_FOUND);
	}

	public async addHabit(r: AddHabitRequest): Promise<AddHabitResponse> {
		const options = getNewUserOptions();
		const newHabit = makeNewHabit(r, options);
		this.data.habits[options.id] = newHabit;
		return Promise.resolve(newHabit);
	}

	public async updateHabit(r: UpdateHabitRequest): Promise<UpdateHabitResponse> {
		const habit = this.data.habits[r.id];
		if (!habit) {
			return Promise.reject(new Error(`habit ${r.id} not found`));
		}

		// Update the habit.
		const updatedHabit = makeUpdatedHabit(habit, r, getNewHabitOptions());
		this.data.habits[r.id] = updatedHabit;
		return Promise.resolve(updatedHabit);
	}

	public async getHabitByID(r: GetHabitByIDRequest): Promise<GetHabitByIDResponse> {
		const habit = this.data.habits[r.id];
		if (habit) {
			return Promise.resolve(habit);
		}

		return Promise.reject(new Error(`habit ${r.id} not found`));
	}

	public async listHabitsByUser(r: ListHabitsByUserRequest): Promise<ListHabitsByUserResponse> {
		const allHabits = Object.values(this.data.habits);
		const habits = allHabits.slice(r.offset, r.offset + r.limit);
		return Promise.resolve({
			habits,
			offset: r.offset + habits.length,
			has_more: r.offset + habits.length < allHabits.length
		});
	}

	public async removeHabit(r: RemoveHabitRequest): Promise<void> {
		if (this.data.habits[r.id]) {
			delete this.data.habits[r.id];
			return Promise.resolve();
		}

		return Promise.reject(new Error(`habit ${r.id} not found`));
	}

	public async addEntry(r: AddEntryRequest): Promise<AddEntryResponse> {
		const options = getNewUserOptions();
		const newEntry = makeNewEntry(r, options);
		this.data.entries[options.id] = newEntry;
		return Promise.resolve(newEntry);
	}

	public async updateEntry(r: UpdateEntryRequest): Promise<UpdateEntryResponse> {
		const entry = this.data.entries[r.id];
		if (!entry) {
			return Promise.reject(new Error(`entry ${r.id} not found`));
		}

		// Update the entry.
		const updatedEntry = makeUpdatedEntry(entry, r, getNewEntryOptions());
		this.data.entries[r.id] = updatedEntry;
		return Promise.resolve(updatedEntry);
	}

	public async getEntryByID(r: GetEntryByIDRequest): Promise<GetEntryByIDResponse> {
		const entry = this.data.entries[r.id];
		if (entry) {
			return Promise.resolve(entry);
		}

		return Promise.reject(new Error(`entry ${r.id} not found`));
	}

	public async listEntriesByHabit(
		r: ListEntriesByHabitRequest
	): Promise<ListEntriesByHabitResponse> {
		const allEntries = Object.values(this.data.entries);
		const entries = allEntries.slice(r.offset, r.offset + r.limit);
		return Promise.resolve({
			entries,
			offset: r.offset + entries.length,
			has_more: r.offset + entries.length < allEntries.length
		});
	}

	public async removeEntry(r: RemoveEntryRequest): Promise<void> {
		if (this.data.entries[r.id]) {
			delete this.data.entries[r.id];
			return Promise.resolve();
		}

		return Promise.reject(new Error(`entry ${r.id} not found`));
	}
}

/**
 * DEFAULT_IN_MEMORY_CTRLHABITS_SERVICE_DATA is the default data used by InMemoryCTRLHabitsService.
 */
export const DEFAULT_IN_MEMORY_CTRLHABITS_SERVICE_DATA: InMemoryCTRLHabitsServiceData = {
	users: {},
	habits: {},
	entries: {}
};

/**
 * InMemoryCTRLHabitsServiceData is the data used by InMemoryCTRLHabitsService.
 */
export interface InMemoryCTRLHabitsServiceData {
	users: { [user_id: ID]: User };
	habits: { [habit_id: ID]: Habit };
	entries: { [entry_id: ID]: Entry };
}

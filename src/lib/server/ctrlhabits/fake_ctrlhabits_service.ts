import type {
	AddUserRequest,
	AddUserResponse,
	GetUserByGitHubIDRequest,
	GetUserByGitHubIDResponse,
	GetUserByGoogleIDRequest,
	GetUserByGoogleIDResponse,
	GetUserByIDRequest,
	GetUserByIDResponse,
	GetUserByTagRequest,
	GetUserByTagResponse,
	ListUsersRequest,
	ListUsersResponse,
	RemoveUserRequest,
	UpdateUserRequest,
	UpdateUserResponse,
	User,
	CTRLHabitsServiceInterface,
	ID,
	Habit,
	AddHabitRequest,
	AddHabitResponse
} from './ctrlhabits_service_interface';
import { makeNewHabit } from './new_habit';
import { ERROR_USER_NOT_FOUND, getNewUserOptions, makeNewUser } from './new_user';

/**
 * FakeCTRLHabitsServiceData is the data used by FakeUserService.
 */
export interface FakeCTRLHabitsServiceData {
	users: {
		[user_id: ID]: User;
	};
	habits: {
		[habit_id: ID]: Habit;
	};
}

/**
 * FakeCTRLHabitsService is a fake user service that stores users in memory.
 *
 * TODO(EthanThatOneKid): Rename this.
 */
export class FakeCTRLHabitsService implements CTRLHabitsServiceInterface {
	constructor(public readonly data: FakeCTRLHabitsServiceData = { users: {}, habits: {} }) {}

	public async addUser(r: AddUserRequest): Promise<AddUserResponse> {
		const options = getNewUserOptions();
		const newUser = makeNewUser(r, options);
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
			for (const userID in this.data) {
				const user = this.data.users[userID];
				if (user.tag === r.tag) {
					return Promise.reject(new Error(`tag ${r.tag} is already taken`));
				}
			}
		}

		// Update the user.
		const newUser: User = {
			id: user.id,
			tag: r.tag ?? user.tag,
			bio: r.bio ?? user.bio,
			avatar_url: r.avatar_url ?? user.avatar_url,
			github_id: r.github_id ?? user.github_id,
			google_id: r.google_id ?? user.google_id,
			created_at: user.created_at,
			updated_at: new Date().toISOString()
		};
		this.data.users[r.id] = newUser;
		return Promise.resolve(newUser);
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
		const total = allUsers.length;
		const offset = r.offset ?? 0;
		const limit = r.limit ?? allUsers.length;
		const users = allUsers.slice(offset, offset + limit);
		return Promise.resolve({ users, total });
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
}

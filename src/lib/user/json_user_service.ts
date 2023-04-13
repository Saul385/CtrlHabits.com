import type {
	AddUserRequest,
	AddUserResponse,
	GetUserRequest,
	GetUserResponse,
	ListUsersByNamesRequest,
	ListUsersByNamesResponse,
	ListUsersRequest,
	ListUsersResponse,
	LoginRequest,
	LoginResponse,
	LogoutRequest,
	RemoveRequest,
	User,
	UserService
} from './user';

export class JSONUserService implements UserService {
	public data: { [user_id: string]: User } = {};

	public remove(r: RemoveRequest): Promise<void> {
		if (this.data[r.id]) {
			delete this.data[r.id];
			return Promise.resolve();
		}

		return Promise.reject(ERROR_USER_NOT_FOUND);
	}

	public getUser(r: GetUserRequest): Promise<User> {
		const user = this.data[r.id];
		if (user) {
			return Promise.resolve(user);
		}

		return Promise.reject(ERROR_USER_NOT_FOUND);
	}

	public addUser(r: AddUserRequest): Promise<User> {
		const options = getNewUserOptions();
		const newUser = makeNewUser(r, options);
		this.data[options.id] = newUser;
		return Promise.resolve(newUser);
	}

	public listUsers(r: ListUsersRequest): Promise<ListUsersResponse> {
		const users = Object.values(this.data);
		const total = users.length;
		const offset = r.offset;
		const limit = r.limit;
		const usersPage = users.slice(offset, offset + limit);
		return Promise.resolve({ users: usersPage, total });
	}

	public listUsersByNames(r: ListUsersByNamesRequest): Promise<ListUsersByNamesResponse> {
		const users = Object.values(this.data);
		const usersByName = users.filter((user) => r.names.includes(user.name));
		return Promise.resolve({ users: usersByName });
	}
}

export interface NewUserOptions {
	id: string;
	timestamp: string;
}

function makeNewUser(request: AddUserRequest, options: NewUserOptions): User {
	return {
		id: options.id,
		name: request.name,
		avatar: request.avatar,
		email: request.email,
		bio: request.bio,
		created_at: options.timestamp,
		updated_at: options.timestamp
	};
}

function makeUUID(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

function getCurrentTimestamp(date: Date = new Date()): string {
	return date.toISOString();
}

function getNewUserOptions(): NewUserOptions {
	return {
		id: makeUUID(),
		timestamp: getCurrentTimestamp()
	};
}

const ERROR_USER_NOT_FOUND = new Error('User not found');

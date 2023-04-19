import type {
	AddUserRequest,
	AddUserResponse,
	GetUserRequest,
	GetUserResponse,
	ListUsersByTagsRequest,
	ListUsersByTagsResponse,
	ListUsersRequest,
	ListUsersResponse,
	RemoveUserRequest,
	User,
	UserServiceInterface
} from './user_service_interface';

/**
 * TODO: Implement a real user service, such as SupabaseUserService or FirestoreUserService.
 */
export class JSONUserService implements UserServiceInterface {
	public data: { [user_id: string]: User } = {};

	public remove(r: RemoveUserRequest): Promise<void> {
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

	public listUsersByTags(r: ListUsersByTagsRequest): Promise<ListUsersByTagsResponse> {
		const response: ListUsersByTagsResponse = { users: [] };
		for (const userID in this.data) {
			const user = this.data[userID];
			if (!user || r.tags.includes(user.tag)) {
				continue;
			}

			response.users.push(user);
		}

		return Promise.resolve(response);
	}
}

export interface NewUserOptions {
	id: string;
	timestamp: string;
}

function makeNewUser(request: AddUserRequest, options: NewUserOptions): User {
	const githubID = request.oauth.name === 'github' ? request.oauth.data.id : null;
	const googleID = request.oauth.name === 'google' ? request.oauth.data.id : null;
	return {
		id: options.id,
		tag: request.oauth.data.tag,
		bio: request.oauth.data.bio,
		avatar_url: request.oauth.data.avatar_url,
		github_id: githubID,
		google_id: googleID,
		created_at: options.timestamp,
		updated_at: options.timestamp
	};
}

export function makeUUID(): string {
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

export interface User {
	id: string;
	name: string;
	email: string;
	bio: string;
	avatar: string;
	created_at: string;
	updated_at: string;
}

export interface AddUserRequest {
	name: string;
	email: string;
	bio: string;
	avatar: string;
}

export type AddUserResponse = User;

export interface GetUserRequest {
	id: number;
}

export type GetUserResponse = User;

export interface ListUsersRequest {
	limit: number;
	offset: number;
}

export interface ListUsersResponse {
	users: User[];
	total: number;
}

export interface ListUsersByNamesRequest {
	names: string[];
}

export interface ListUsersByNamesResponse {
	users: User[];
}

export interface LoginRequest {
	provider: 'github' | 'google';
	code: string;
}

export interface LoginResponse {
	user: User;
	token: string;
}

export interface LogoutRequest {
	token: string;
}

export type LogoutResponse = void;

export interface RemoveRequest {
	id: number;
}

export type RemoveResponse = void;

export interface UserService {
	getUser(r: GetUserRequest): Promise<GetUserResponse>;
	addUser(r: AddUserRequest): Promise<AddUserResponse>;
	listUsers(r: ListUsersRequest): Promise<ListUsersResponse>;
	listUsersByNames(r: ListUsersByNamesRequest): Promise<ListUsersByNamesResponse>;
	// login(r: LoginRequest): Promise<LoginResponse>;
	// logout(r: LogoutRequest): Promise<LogoutResponse>;
	remove(r: RemoveRequest): Promise<RemoveResponse>;
}

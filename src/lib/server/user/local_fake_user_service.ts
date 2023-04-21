import { writeFileSync, readFileSync } from 'node:fs';

import type {
	AddUserRequest,
	AddUserResponse,
	GetUserByGitHubIDRequest,
	GetUserByGitHubIDResponse,
	GetUserByGoogleIDRequest,
	GetUserByGoogleIDResponse,
	GetUserByIDRequest,
	GetUserByIDResponse,
	ListUsersRequest,
	ListUsersResponse,
	RemoveUserRequest,
	UpdateUserRequest,
	UpdateUserResponse,
	User,
	UserServiceInterface
} from './user_service_interface';
import type { FakeUserServiceData } from './fake_user_service';
import { FakeUserService } from './fake_user_service';

export class LocalFakeUserService implements UserServiceInterface {
	public readonly fakeUserService: FakeUserService;

	constructor(public readonly path: string) {
		const initialData: FakeUserServiceData = JSON.parse(readFileSync(path, 'utf-8'));
		this.fakeUserService = new FakeUserService(initialData);
	}

	public async removeUser(r: RemoveUserRequest): Promise<void> {
		await this.fakeUserService.removeUser(r);
		await this.save();
	}

	public async getUserByID(r: GetUserByIDRequest): Promise<GetUserByIDResponse> {
		return await this.fakeUserService.getUserByID(r);
	}

	public async getUserByGitHubID(r: GetUserByGitHubIDRequest): Promise<GetUserByGitHubIDResponse> {
		throw new Error('Method not implemented.');
	}

	public async getUserByGoogleID(r: GetUserByGoogleIDRequest): Promise<GetUserByGoogleIDResponse> {
		throw new Error('Method not implemented.');
	}

	public async addUser(r: AddUserRequest): Promise<AddUserResponse> {
		const user = await this.fakeUserService.addUser(r);
		await this.save();
		return user;
	}

	public async updateUser(r: UpdateUserRequest): Promise<UpdateUserResponse> {
		const user = await this.fakeUserService.updateUser(r);
		await this.save();
		return user;
	}

	public async listUsers(r: ListUsersRequest): Promise<ListUsersResponse> {
		return await this.fakeUserService.listUsers(r);
	}

	/**
	 * save saves the current state of the user service to disk.
	 */
	private save(): void {
		writeFileSync(this.path, JSON.stringify(this.fakeUserService.data, null, 2));
	}
}

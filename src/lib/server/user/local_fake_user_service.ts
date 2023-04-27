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
	GetUserByTagRequest,
	GetUserByTagResponse,
	ListUsersRequest,
	ListUsersResponse,
	RemoveUserRequest,
	UpdateUserRequest,
	UpdateUserResponse,
	UserServiceInterface
} from './user_service_interface';
import type { FakeUserServiceData } from './fake_user_service';
import { FakeUserService } from './fake_user_service';

export class LocalFakeUserService implements UserServiceInterface {
	public readonly fakeUserService: FakeUserService;

	constructor(public readonly path: string) {
		let initialData: FakeUserServiceData = {};
		try {
			initialData = JSON.parse(readFileSync(path, 'utf-8'));
		} catch (error) {
			console.log('Failed to read initial data from file', error);
		}

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
		return await this.fakeUserService.getUserByGitHubID(r);
	}

	public async getUserByGoogleID(r: GetUserByGoogleIDRequest): Promise<GetUserByGoogleIDResponse> {
		return await this.fakeUserService.getUserByGoogleID(r);
	}

	public async getUserByTag(r: GetUserByTagRequest): Promise<GetUserByTagResponse> {
		return await this.fakeUserService.getUserByTag(r);
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

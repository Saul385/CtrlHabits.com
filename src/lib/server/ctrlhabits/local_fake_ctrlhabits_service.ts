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
	CTRLHabitsServiceInterface
} from './ctrlhabits_service_interface';
import type { FakeCTRLHabitsServiceData } from './fake_ctrlhabits_service';
import { FakeCTRLHabitsService } from './fake_ctrlhabits_service';

export class LocalFakeCTRLHabitsService implements CTRLHabitsServiceInterface {
	public readonly fakeCTRLHabitsService: FakeCTRLHabitsService;

	constructor(public readonly path: string) {
		let initialData: FakeCTRLHabitsServiceData = {};
		try {
			initialData = JSON.parse(readFileSync(path, 'utf-8'));
		} catch (error) {
			console.log('Failed to read initial data from file', error);
		}

		this.fakeCTRLHabitsService = new FakeCTRLHabitsService(initialData);
	}

	public async removeUser(r: RemoveUserRequest): Promise<void> {
		await this.fakeCTRLHabitsService.removeUser(r);
		await this.save();
	}

	public async getUserByID(r: GetUserByIDRequest): Promise<GetUserByIDResponse> {
		return await this.fakeCTRLHabitsService.getUserByID(r);
	}

	public async getUserByGitHubID(r: GetUserByGitHubIDRequest): Promise<GetUserByGitHubIDResponse> {
		return await this.fakeCTRLHabitsService.getUserByGitHubID(r);
	}

	public async getUserByGoogleID(r: GetUserByGoogleIDRequest): Promise<GetUserByGoogleIDResponse> {
		return await this.fakeCTRLHabitsService.getUserByGoogleID(r);
	}

	public async getUserByTag(r: GetUserByTagRequest): Promise<GetUserByTagResponse> {
		return await this.fakeCTRLHabitsService.getUserByTag(r);
	}

	public async addUser(r: AddUserRequest): Promise<AddUserResponse> {
		const user = await this.fakeCTRLHabitsService.addUser(r);
		await this.save();
		return user;
	}

	public async updateUser(r: UpdateUserRequest): Promise<UpdateUserResponse> {
		const user = await this.fakeCTRLHabitsService.updateUser(r);
		await this.save();
		return user;
	}

	public async listUsers(r: ListUsersRequest): Promise<ListUsersResponse> {
		return await this.fakeCTRLHabitsService.listUsers(r);
	}

	/**
	 * save saves the current state of the user service to disk.
	 */
	private save(): void {
		writeFileSync(this.path, JSON.stringify(this.fakeCTRLHabitsService.data, null, 2));
	}
}

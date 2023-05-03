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
	CTRLHabitsServiceInterface,
	AddHabitRequest,
	AddHabitResponse
} from './ctrlhabits_service_interface';
import type { InMemoryCTRLHabitsServiceData } from './in_memory_ctrlhabits_service';
import { DEFAULT_IN_MEMORY_CTRLHABITS_SERVICE_DATA } from './in_memory_ctrlhabits_service';
import { InMemoryCTRLHabitsService } from './in_memory_ctrlhabits_service';

export class FileSystemCTRLHabitsService implements CTRLHabitsServiceInterface {
	public readonly inMemoryCTRLHabitsService: InMemoryCTRLHabitsService;

	constructor(public readonly path: string) {
		let initialData: InMemoryCTRLHabitsServiceData = DEFAULT_IN_MEMORY_CTRLHABITS_SERVICE_DATA;
		try {
			initialData = JSON.parse(readFileSync(path, 'utf-8'));
		} catch (error) {
			console.log('Failed to read initial data from file', error);
		}

		this.inMemoryCTRLHabitsService = new InMemoryCTRLHabitsService(initialData);
	}

	public async removeUser(r: RemoveUserRequest): Promise<void> {
		await this.inMemoryCTRLHabitsService.removeUser(r);
		await this.save();
	}

	public async getUserByID(r: GetUserByIDRequest): Promise<GetUserByIDResponse> {
		return await this.inMemoryCTRLHabitsService.getUserByID(r);
	}

	public async getUserByGitHubID(r: GetUserByGitHubIDRequest): Promise<GetUserByGitHubIDResponse> {
		return await this.inMemoryCTRLHabitsService.getUserByGitHubID(r);
	}

	public async getUserByGoogleID(r: GetUserByGoogleIDRequest): Promise<GetUserByGoogleIDResponse> {
		return await this.inMemoryCTRLHabitsService.getUserByGoogleID(r);
	}

	public async getUserByTag(r: GetUserByTagRequest): Promise<GetUserByTagResponse> {
		return await this.inMemoryCTRLHabitsService.getUserByTag(r);
	}

	public async addUser(r: AddUserRequest): Promise<AddUserResponse> {
		const user = await this.inMemoryCTRLHabitsService.addUser(r);
		await this.save();
		return user;
	}

	public async updateUser(r: UpdateUserRequest): Promise<UpdateUserResponse> {
		const user = await this.inMemoryCTRLHabitsService.updateUser(r);
		await this.save();
		return user;
	}

	public async listUsers(r: ListUsersRequest): Promise<ListUsersResponse> {
		return await this.inMemoryCTRLHabitsService.listUsers(r);
	}

	public async addHabit(r: AddHabitRequest): Promise<AddHabitResponse> {
		const habit = await this.inMemoryCTRLHabitsService.addHabit(r);
		await this.save();
		return habit;
	}

	/**
	 * save saves the current state of the user service to disk.
	 */
	private save(): void {
		writeFileSync(this.path, JSON.stringify(this.inMemoryCTRLHabitsService.data, null, 2));
	}
}

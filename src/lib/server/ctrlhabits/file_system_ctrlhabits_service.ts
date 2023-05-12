import { readFileSync, writeFileSync } from 'node:fs';
import type {
	AddEntryRequest,
	AddEntryResponse,
	AddHabitRequest,
	AddHabitResponse,
	AddUserRequest,
	AddUserResponse,
	CTRLHabitsServiceInterface,
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
	UpdateUserResponse
} from '$lib/ctrlhabits/ctrlhabits_service_interface';
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

	public async updateHabit(r: UpdateHabitRequest): Promise<UpdateHabitResponse> {
		const habit = await this.inMemoryCTRLHabitsService.updateHabit(r);
		await this.save();
		return habit;
	}

	public async getHabitByID(r: GetHabitByIDRequest): Promise<GetHabitByIDResponse> {
		return await this.inMemoryCTRLHabitsService.getHabitByID(r);
	}

	public async listHabitsByUser(r: ListHabitsByUserRequest): Promise<ListHabitsByUserResponse> {
		return await this.inMemoryCTRLHabitsService.listHabitsByUser(r);
	}

	public async removeHabit(r: RemoveHabitRequest): Promise<void> {
		await this.inMemoryCTRLHabitsService.removeHabit(r);
		await this.save();
	}

	public async addEntry(r: AddEntryRequest): Promise<AddEntryResponse> {
		const entry = await this.inMemoryCTRLHabitsService.addEntry(r);
		await this.save();
		return entry;
	}

	public async updateEntry(r: UpdateEntryRequest): Promise<UpdateEntryResponse> {
		const entry = await this.inMemoryCTRLHabitsService.updateEntry(r);
		await this.save();
		return entry;
	}

	public async getEntryByID(r: GetEntryByIDRequest): Promise<GetEntryByIDResponse> {
		return await this.inMemoryCTRLHabitsService.getEntryByID(r);
	}

	public async listEntriesByHabit(
		r: ListEntriesByHabitRequest
	): Promise<ListEntriesByHabitResponse> {
		return await this.inMemoryCTRLHabitsService.listEntriesByHabit(r);
	}

	public async removeEntry(r: RemoveEntryRequest): Promise<void> {
		await this.inMemoryCTRLHabitsService.removeEntry(r);
		await this.save();
	}

	/**
	 * save saves the current state of the user service to disk.
	 */
	private save(): void {
		writeFileSync(this.path, JSON.stringify(this.inMemoryCTRLHabitsService.data, null, 2));
	}
}

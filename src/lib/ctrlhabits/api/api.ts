import type {
	APIEntriesEntryIDGetRequest,
	APIEntriesEntryIDGetResponse,
	APIEntriesEntryIDPatchRequest,
	APIEntriesEntryIDPatchResponse,
	APIEntriesGetRequest,
	APIEntriesGetResponse,
	APIEntriesPostRequest,
	APIEntriesPostResponse,
	APIHabitsPostRequest,
	APIHabitsHabitIDDeleteRequest,
	APIHabitsHabitIDDeleteResponse,
	APIHabitsHabitIDGetRequest,
	APIHabitsHabitIDGetResponse,
	APIHabitsHabitIDPatchRequest,
	APIHabitsHabitIDPatchResponse,
	APIHabitsPostResponse,
	APIUsersUserIDGetRequest,
	APIUsersUserIDGetResponse,
	APIUsersUserIDPatchRequest,
	APIUsersUserIDPatchResponse,
	CTRLHabitsAPIInterface,
	APIHabitsGetRequest,
	APIHabitsGetResponse
} from './ctrlhabits_api_interface';
import { makeEntriesURL, makeHabitsURL, makeUsersURL } from './urls';

/**
 * CTRLHabitsAPI is the default implementation of CTRLHabitsAPIInterface.
 */
export class CTRLHabitsAPI implements CTRLHabitsAPIInterface {
	constructor(private readonly fetcher: typeof fetch, private readonly baseURL: string) {}

	public async getHabits(r: APIHabitsGetRequest): Promise<APIHabitsGetResponse> {
		const url = makeHabitsURL(this.baseURL);
		const response = await this.fetcher(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(r)
		});

		if (!response.ok) {
			return { error: response.statusText, data: null };
		}

		const data = await response.json();
		return { error: null, data };
	}

	public async postHabits(r: APIHabitsPostRequest): Promise<APIHabitsPostResponse> {
		const url = makeHabitsURL(this.baseURL);
		const response = await this.fetcher(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(r)
		});

		if (!response.ok) {
			return { error: response.statusText, data: null };
		}

		const data = await response.json();
		return { error: null, data };
	}

	public async getHabitsHabitID(
		r: APIHabitsHabitIDGetRequest
	): Promise<APIHabitsHabitIDGetResponse> {
		const url = makeHabitsURL(this.baseURL);
		const response = await this.fetcher(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(r)
		});

		if (!response.ok) {
			return { error: response.statusText, data: null };
		}

		const data = await response.json();
		return { error: null, data };
	}

	public async patchHabitsHabitID(
		r: APIHabitsHabitIDPatchRequest
	): Promise<APIHabitsHabitIDPatchResponse> {
		const url = makeHabitsURL(this.baseURL);
		const response = await this.fetcher(url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(r)
		});

		if (!response.ok) {
			return { error: response.statusText, data: null };
		}

		const data = await response.json();
		return { error: null, data };
	}

	public async deleteHabitsHabitID(
		r: APIHabitsHabitIDDeleteRequest
	): Promise<APIHabitsHabitIDDeleteResponse> {
		const url = makeHabitsURL(this.baseURL);
		const response = await this.fetcher(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(r)
		});

		if (!response.ok) {
			return { error: response.statusText, data: null };
		}

		const data = await response.json();
		return { error: null, data };
	}

	public async getEntries(r: APIEntriesGetRequest): Promise<APIEntriesGetResponse> {
		const url = makeEntriesURL(this.baseURL);
		const response = await this.fetcher(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(r)
		});

		if (!response.ok) {
			return { error: response.statusText, data: null };
		}

		const data = await response.json();
		return { error: null, data };
	}

	public async postEntries(r: APIEntriesPostRequest): Promise<APIEntriesPostResponse> {
		const url = makeEntriesURL(this.baseURL);
		const response = await this.fetcher(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(r)
		});

		if (!response.ok) {
			return { error: response.statusText, data: null };
		}

		const data = await response.json();
		return { error: null, data };
	}

	public async getEntriesEntryID(
		r: APIEntriesEntryIDGetRequest
	): Promise<APIEntriesEntryIDGetResponse> {
		const url = makeEntriesURL(this.baseURL);
		const response = await this.fetcher(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(r)
		});

		if (!response.ok) {
			return { error: response.statusText, data: null };
		}

		const data = await response.json();
		return { error: null, data };
	}

	public async patchEntriesEntryID(
		r: APIEntriesEntryIDPatchRequest
	): Promise<APIEntriesEntryIDPatchResponse> {
		const url = makeEntriesURL(this.baseURL);
		const response = await this.fetcher(url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(r)
		});

		if (!response.ok) {
			return { error: response.statusText, data: null };
		}

		const data = await response.json();
		return { error: null, data };
	}

	public async getUsersUserID(r: APIUsersUserIDGetRequest): Promise<APIUsersUserIDGetResponse> {
		const url = makeUsersURL(this.baseURL);
		const response = await this.fetcher(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(r)
		});

		if (!response.ok) {
			return { error: response.statusText, data: null };
		}

		const data = await response.json();
		return { error: null, data };
	}

	public async patchUsersUserID(
		r: APIUsersUserIDPatchRequest
	): Promise<APIUsersUserIDPatchResponse> {
		const url = makeUsersURL(this.baseURL);
		const response = await this.fetcher(url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(r)
		});

		if (!response.ok) {
			return { error: response.statusText, data: null };
		}

		const data = await response.json();
		return { error: null, data };
	}
}

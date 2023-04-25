import type { KVServiceInterface } from '$lib/kv';

/**
 * LocalStorageKVService is a KV service that uses a Storage object as its
 * underlying storage.
 */
export class LocalStorageKVService<T> implements KVServiceInterface<T> {
	constructor(private readonly storage: Storage) {}

	async get(key: string): Promise<T | null> {
		const value = this.storage.getItem(key);
		if (value === null) {
			return null;
		}

		return JSON.parse(value);
	}

	async set(key: string, value: T): Promise<void> {
		this.storage.setItem(key, JSON.stringify(value));
	}
}

// TODO: Please show me a sequence diagram in Mermaid syntax of the following user stories for my social platform. When the user signs in, they are on the `/auth` page where they are allowed to choose between github oauth, fake github oauth, google oauth, or fake google oauth, but all oauth services implement the same oauth service interface. After clicking, they interact with their chosen oauth provider (if applicable) and are eventually redirected to our auth endpoint. If the oauth user id is not associated to any existing users, the user is redirected to `/join` along with their oauth code in the url search params so that the user can claim a new, unique username to associate with their oauth id. Please use your best intuition to fill in any details of the sequence diagram for a full overview of the authentication system.

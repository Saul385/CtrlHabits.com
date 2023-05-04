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

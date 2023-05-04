/**
 * KVServiceInterface is the interface that all KV services must implement.
 *
 * T is the JSON-serializable type of the value.
 */
export interface KVServiceInterface<T> {
	/**
	 * get gets the value associated with the key.
	 */
	get(key: string): Promise<T | null>;

	/**
	 * set sets the value associated with the key.
	 */
	set(key: string, value: T): Promise<void>;
}

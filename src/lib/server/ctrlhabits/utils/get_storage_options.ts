import { randomUUID } from 'node:crypto';

/**
 * makeUUID generates a random UUID.
 */
export function makeUUID(): string {
	return randomUUID();
}

/**
 * getCurrentTimestamp gets the current timestamp in ISO format.
 */
export function getCurrentTimestamp(date: Date = new Date()): string {
	return date.toISOString();
}

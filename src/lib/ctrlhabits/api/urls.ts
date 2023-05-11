/**
 * makeHabitsURL creates a URL for the /api/habits endpoint.
 */
export function makeHabitsURL(baseURL: string): string {
	return `${baseURL}/api/habits`;
}

/**
 * makeEntriesURL creates a URL for the /api/entries endpoint.
 */
export function makeEntriesURL(baseURL: string): string {
	return `${baseURL}/api/entries`;
}

/**
 * makeUsersURL creates a URL for the /api/users endpoint.
 */
export function makeUsersURL(baseURL: string): string {
	return `${baseURL}/api/users`;
}

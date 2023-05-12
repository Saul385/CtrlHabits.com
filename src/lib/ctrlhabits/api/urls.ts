/**
 * makeHabitsURL creates a URL for the /api/habits endpoint.
 */
export function makeHabitsURL(baseURL: string): string {
	if (baseURL.endsWith('/')) {
		return `${baseURL}api/habits`;
	}

	return `${baseURL}/api/habits`;
}

/**
 * makeHabitURL creates a URL for the /api/habits/[habit_id] endpoint.
 */
export function makeHabitURL(baseURL: string, habit_id: string): string {
	if (baseURL.endsWith('/')) {
		return `${baseURL}api/habits/${habit_id}`;
	}

	return `${baseURL}/api/habits/${habit_id}`;
}

/**
 * makeEntriesURL creates a URL for the /api/entries endpoint.
 */
export function makeEntriesURL(baseURL: string): string {
	if (baseURL.endsWith('/')) {
		return `${baseURL}api/entries`;
	}

	return `${baseURL}/api/entries`;
}

/**
 * makeEntryURL creates a URL for the /api/entries/[entry_id] endpoint.
 */
export function makeEntryURL(baseURL: string, entry_id: string): string {
	if (baseURL.endsWith('/')) {
		return `${baseURL}api/entries/${entry_id}`;
	}

	return `${baseURL}/api/entries/${entry_id}`;
}

/**
 * makeUsersURL creates a URL for the /api/users endpoint.
 */
export function makeUsersURL(baseURL: string): string {
	if (baseURL.endsWith('/')) {
		return `${baseURL}api/users`;
	}

	return `${baseURL}/api/users`;
}

/**
 * makeUserURL creates a URL for the /api/users/[user_id] endpoint.
 */
export function makeUserURL(baseURL: string, user_id: string): string {
	if (baseURL.endsWith('/')) {
		return `${baseURL}api/users/${user_id}`;
	}

	return `${baseURL}/api/users/${user_id}`;
}

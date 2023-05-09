import type { ID } from '$lib/server/oauth';

/**
 * FeedData is the data structure for the feed component.
 */
export interface FeedData {
	/**
	 * entries is the list of entries in the feed.
	 */
	entries: FeedEntry[];
}

/**
 * FeedEntry is the data structure for a single entry.
 */
export interface FeedEntry {
	/**
	 * id is the ID of the entry.
	 */
	id: ID;

	/**
	 * html_url is the URL of the entry.
	 */
	html_url: string;

	/**
	 * habit_id is the ID of the habit the entry belongs to.
	 */
	habit_id: ID;

	/**
	 * html_habit_url is the URL of the habit the entry belongs to.
	 */
	html_habit_url: string;

	/**
	 * user_id is the ID of the user the entry belongs to.
	 */
	user_id: ID;

	/**
	 * html_user_url is the URL of the user the entry belongs to.
	 */
	html_user_url: string;

	/**
	 * date is the date of the entry.
	 */
	date: string;

	/**
	 * value is the value of the entry.
	 */
	value: number;

	/**
	 * content is the content of the entry.
	 */
	content: string;

	/**
	 * created_at is the time the entry was created.
	 */
	created_at: string;

	/**
	 * updated_at is the time the entry was last updated.
	 */
	updated_at: string;
}

import type { ID } from '$lib/server/oauth';
import type { AddHabitRequest, Habit, UpdateHabitRequest } from './ctrlhabits_service_interface';
import { getCurrentTimestamp, makeUUID } from './utils/get_storage_options';

/**
 * NewHabitOptions is the data needed to create a new habit in the database that was not provided by the request.
 */
export interface NewHabitOptions {
	id: ID;
	timestamp: string;
}

/**
 * makeNewHabit creates a new habit from the request and options.
 */
export function makeNewHabit(request: AddHabitRequest, options: NewHabitOptions): Habit {
	return {
		created_at: options.timestamp,
		description: request.description,
		end_date: request.end_date,
		frequency: request.frequency,
		id: options.id,
		name: request.name,
		private: request.private,
		start_date: request.start_date,
		updated_at: options.timestamp,
		user_id: request.user_id
	};
}

/**
 * makeUpdatedHabit creates a new habit from the request and options.
 */
export function makeUpdatedHabit(
	habit: Habit,
	request: UpdateHabitRequest,
	{ timestamp }: NewHabitOptions
): Habit {
	return {
		id: habit.id,
		user_id: habit.user_id,
		description: request.description ?? habit.description,
		end_date: request.end_date ?? habit.end_date,
		frequency: request.frequency ?? habit.frequency,
		name: request.name ?? habit.name,
		private: request.private ?? habit.private,
		start_date: request.start_date ?? habit.start_date,
		created_at: habit.created_at,
		updated_at: timestamp
	};
}

/**
 * getNewHabitOptions returns the default options for a new habit.
 */
export function getNewHabitOptions(): NewHabitOptions {
	return {
		id: makeUUID(),
		timestamp: getCurrentTimestamp()
	};
}

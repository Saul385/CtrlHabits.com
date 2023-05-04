import type { AddHabitRequest, Habit, ID } from './ctrlhabits_service_interface';
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
 * getNewHabitOptions returns the default options for a new habit.
 */
export function getNewHabitOptions(): NewHabitOptions {
	return {
		id: makeUUID(),
		timestamp: getCurrentTimestamp()
	};
}

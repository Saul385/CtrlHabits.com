import * as z from 'zod';
import type { AddHabitRequest, User } from '$lib/server/ctrlhabits';

/**
 * CTRLHabitsRequest is a type that represents a request that has been validated.
 */
export type CTRLHabitsRequest<T> =
	| { request: T; error: null }
	| {
			request: null;
			error: z.ZodError<T>['formErrors']['fieldErrors'];
	  };

/**
 * toAddHabitRequest takes a FormData object and returns an AddHabitRequest
 * object if the form data is valid. Otherwise, it returns a list of errors.
 */
export function toAddHabitRequest(
	formData: FormData,
	user: User
): CTRLHabitsRequest<AddHabitRequest> {
	const parsedData = addHabitRequestParser.safeParse({
		name: formData.get('name'),
		description: formData.get('description'),
		frequency: formData.get('frequency'),
		start_date: formData.get('start_date'),
		end_date: formData.get('end_date'),
		private: formData.get('private'),
		user_id: user.id
	});
	if (!parsedData.success) {
		return {
			error: parsedData.error.formErrors.fieldErrors,
			request: null
		};
	}

	return {
		request: parsedData.data,
		error: null
	};
}

/**
 * addHabitRequestParser is a Zod parser for AddHabitRequest.
 */
export const addHabitRequestParser: z.ZodType<AddHabitRequest> = z.object({
	name: z.string(),
	description: z.string(),
	frequency: z.number(),
	start_date: z.string().datetime(),
	end_date: z.string().datetime(),
	private: z.boolean(),
	user_id: z.string()
});

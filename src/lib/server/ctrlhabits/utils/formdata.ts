import * as z from 'zod';
import type {
	AddEntryRequest,
	AddHabitRequest,
	UpdateEntryRequest,
	UpdateHabitRequest,
	UpdateUserRequest
} from '$lib/server/ctrlhabits';
import type { ID } from '$lib/server/oauth';

/**
 * Validated is a type that represents a request that has been validated.
 */
export type Validated<T> =
	| { request: T; error: null }
	| {
			request: null;
			error: z.ZodError<T>['formErrors']['fieldErrors'];
	  };

/**
 * toValidatedRequest takes a Zod schema and data and returns a Validated object.
 */
export function toValidatedRequest<T>(schema: z.ZodType<T>, data: unknown): Validated<T> {
	const parsedData = schema.safeParse(data);
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
 * makeRequestValidator takes a Zod schema and returns a function that takes
 * data and returns a Validated object.
 *
 * A transaction must be made to validate that the user is able to make the
 * request by checking the user's id against the user_id in the request.
 */
export function makeRequestValidator<T>(schema: z.ZodType<T>) {
	return (data: { [k in keyof T]: unknown }): Validated<T> => toValidatedRequest(schema, data);
}

/**
 * toUpdateUserRequest takes a FormData object and returns an UpdateUserRequest
 * object if the form data is valid. Otherwise, it returns a list of errors.
 */
export function toUpdateUserRequest(formData: FormData, userID: ID): Validated<UpdateUserRequest> {
	const data = Object.fromEntries(formData.entries());
	return validateUpdateUserRequest({
		id: userID,
		tag: data.tag,
		bio: data.bio,
		avatar_url: data.avatar_url,
		github_id: data.github_id,
		google_id: data.google_id
	});
}

/**
 * updateUserRequestSchema is a Zod schema for UpdateUserRequest.
 */
const updateUserRequestSchema: z.ZodType<UpdateUserRequest> = z.object({
	id: z.string(),
	tag: z.string().optional(),
	bio: z.string().optional(),
	avatar_url: z.string().url().optional(),
	github_id: z.string().nullable().optional(),
	google_id: z.string().nullable().optional()
});

/**
 * validateUpdateUserRequest is a function that takes a FormData object and returns a
 * validated UpdateUserRequest object.
 */
export const validateUpdateUserRequest =
	makeRequestValidator<UpdateUserRequest>(updateUserRequestSchema);

/**
 * toAddHabitRequest takes a FormData object and returns an AddHabitRequest
 * object if the form data is valid. Otherwise, it returns a list of errors.
 */
export function toAddHabitRequest(formData: FormData, userID: ID): Validated<AddHabitRequest> {
	const data = Object.fromEntries(formData.entries());
	return validateAddHabitRequest({
		user_id: userID,
		name: data.name,
		description: data.description,
		frequency: data.frequency,
		start_date: data.start_date,
		end_date: data.end_date,
		private: data.private
	});
}

/**
 * addHabitRequestSchema is a Zod schema for AddHabitRequest.
 */
const addHabitRequestSchema: z.ZodType<AddHabitRequest> = z.object({
	name: z.string().min(1).max(255),
	description: z.string().max(255),
	frequency: z.number(),
	start_date: z.string().datetime(),
	end_date: z.string().datetime(),
	private: z.boolean(),
	user_id: z.string()
});

/**
 * validateAddHabitRequest is a function that takes a FormData object and returns a
 * validated AddHabitRequest object.
 */
export const validateAddHabitRequest = makeRequestValidator<AddHabitRequest>(addHabitRequestSchema);

/**
 * toUpdateHabitRequest takes a FormData object and returns an UpdateHabitRequest
 */
export function toUpdateHabitRequest(
	formData: FormData,
	habitID: ID
): Validated<UpdateHabitRequest> {
	const data = Object.fromEntries(formData.entries());
	return validateUpdateHabitRequest({
		id: habitID,
		name: data.name,
		description: data.description,
		frequency: data.frequency,
		start_date: data.start_date,
		end_date: data.end_date,
		private: data.private
	});
}

/**
 * updateHabitRequestSchema is a Zod parser for UpdateHabitRequest.
 */
export const updateHabitRequestSchema: z.ZodType<UpdateHabitRequest> = z.object({
	id: z.string(),
	name: z.string().optional(),
	description: z.string().optional(),
	frequency: z.number().optional(),
	start_date: z.string().datetime().optional(),
	end_date: z.string().datetime().optional(),
	private: z.boolean().optional()
});

/**
 * validateUpdateHabitRequest is a Zod schema for UpdateHabitRequest.
 */
export const validateUpdateHabitRequest =
	makeRequestValidator<UpdateHabitRequest>(updateHabitRequestSchema);

/**
 * toAddEntryRequest takes a FormData object and returns an AddEntryRequest
 * object if the form data is valid. Otherwise, it returns a list of errors.
 */
export function toAddEntryRequest(formData: FormData, userID: ID): Validated<AddEntryRequest> {
	const data = Object.fromEntries(formData.entries());
	return validateAddEntryRequest({
		habit_id: data.habit_id,
		user_id: userID,
		date: data.date,
		value: data.value,
		content: data.content
	});
}

/**
 * addEntryRequestSchema is a Zod schema for AddEntryRequest.
 */
export const addEntryRequestSchema: z.ZodType<AddEntryRequest> = z.object({
	habit_id: z.string(),
	user_id: z.string(),
	date: z.string().datetime(),
	value: z.number(),
	content: z.string().max(255)
});

/**
 * validateAddEntryRequest is a function that takes a FormData object and returns a
 * validated AddEntryRequest object.
 */
export const validateAddEntryRequest = makeRequestValidator(addEntryRequestSchema);

/**
 * toUpdateEntryRequest takes a FormData object and returns an UpdateEntryRequest
 * object if the form data is valid. Otherwise, it returns a list of errors.
 */
export function toUpdateEntryRequest(
	formData: FormData,
	entryID: ID
): Validated<UpdateEntryRequest> {
	const data = Object.fromEntries(formData.entries());
	return validateUpdateEntryRequest({
		id: entryID,
		date: data.date,
		value: data.value
	});
}

/**
 * updateEntryRequestSchema is a Zod schema for UpdateEntryRequest.
 */
export const updateEntryRequestSchema: z.ZodType<UpdateEntryRequest> = z.object({
	id: z.string(),
	date: z.string().datetime().optional(),
	content: z.string().optional(),
	value: z.number().optional()
});

/**
 * validateUpdateEntryRequest is a function that takes a FormData object and returns a
 * validated UpdateEntryRequest object.
 */
export const validateUpdateEntryRequest = makeRequestValidator(updateEntryRequestSchema);

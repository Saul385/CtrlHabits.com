/**
 * UpdateHabitFormData is the data that populates the UpdateHabitForm
 */
export interface UpdateHabitFormData{
    id: string;
	name?: string;
	description?: string;
	frequency?: number;
	start_date?: string;
	end_date?: string;
	private?: boolean;
}


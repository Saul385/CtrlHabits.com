export interface Habit {
	id: number;
	name: string;
	private: boolean;
	description: string;
	frequency: number;
	start_date: string;
	end_date: string;
	user_id: number;
	created_at: string;
	updated_at: string;
}

export interface AddHabitRequest {
	name: string;
	description: string;
	frequency: number;
	start_date: string;
	end_date: string;
	user_id: number;
}

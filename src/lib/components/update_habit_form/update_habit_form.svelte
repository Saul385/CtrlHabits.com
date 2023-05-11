<script lang="ts">
	import type { UpdateHabitFormData } from './update_habit_form';

	export let data: UpdateHabitFormData;
</script>

<form method="PATCH" action="/api/habits/{data.id}">
	<label for="name">ID</label>
	<input type="text" id="id" name="id" value={data.id} readonly />

	<label for="name">Name</label>
	<input type="text" id="name" name="name" value={data.name} />

	<label for="description">Description</label>
	<input type="text" id="description" name="description" value={data.description} />

	<label for="frequency">Frequency</label>
	<input type="number" id="frequency" name="frequency" value={data.frequency} />

	<label for="start_date">Start Date</label>
	<input type="date" id="start_date" name="start_date" value={data.start_date} />

	<label for="end_date">End Date</label>
	<input type="date" id="end_date" name="end_date" value={data.end_date} />

	<label for="private">Private</label>
	<input type="checkbox" id="private" name="private" value={data.private} />

	<button type="submit">Submit</button>
</form>

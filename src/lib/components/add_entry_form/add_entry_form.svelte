<form method="POST" action="/api/entries">
	<label for="name">Name</label>
	<input type="text" id="name" name="name" />

	<label for="description">Description</label>
	<input type="text" id="description" name="description" />

	<label for="frequency">Frequency</label>
	<input type="number" id="frequency" name="frequency" />

	<label for="start_date">Start Date</label>
	<input type="date" id="start_date" name="start_date" />

	<label for="end_date">End Date</label>
	<input type="date" id="end_date" name="end_date" />

	<label for="private">Private</label>
	<input type="checkbox" id="private" name="private" />

	<button type="submit">Submit</button>
</form>

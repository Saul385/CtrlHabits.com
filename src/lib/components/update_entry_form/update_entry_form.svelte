<script lang="ts">
	import type { UpdateEntryFormData } from './update_entry_form';

	export let data: UpdateEntryFormData;
</script>

<form method="PATCH" action="/api/habits/{data.id}">
	<label for="name">ID</label>
	<input type="text" id="id" name="id" value={data.id} readonly />

	<label for="date">Date</label>
	<input type="text" id="date" name="date" value={data.date} />

	<label for="content">Content</label>
	<input type="text" id="content" name="content" value={data.content} />

	<label for="value">Value</label>
	<input type="text" id="value" name="value" value={data.value} />

	<button type="submit">Submit</button>
</form>

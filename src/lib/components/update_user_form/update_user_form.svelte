<script lang="ts">
	import type { UpdateUserFormData } from './update_user_form';

	export let data: UpdateUserFormData;
</script>

<form method="PATCH" action="/api/habits/{data.id}">
	<label for="name">ID</label>
	<input type="text" id="id" name="id" value={data.id} readonly />

	<label for="tag">Tag</label>
	<input type="text" id="tag" name="tag" value={data.tag} />

	<label for="bio">Bio</label>
	<input type="text" id="bio" name="bio" value={data.bio} />

	<label for="avatar_url">Avatar URL</label>
	<input type="text" id="avatar_url" name="avatar_url" value={data.avatar_url} />
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
	}

	form label {
		margin-top: 1rem;
	}

	form input {
		margin-top: 0.5rem;
	}
</style>

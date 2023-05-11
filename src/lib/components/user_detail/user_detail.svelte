<script lang="ts">
	import type { User } from '$lib/ctrlhabits';

	export let data: User;
</script>

<div class="user">
	<h2>
		<a href="/users/{data.id}">
			{data.tag}
		</a>
	</h2>
	<p>{data.bio}</p>
	<p>{data.avatar_url}</p>
	<p>{data.github_id}</p>
	<p>{data.google_id}</p>
	<p>{data.created_at}</p>
	<p>{data.updated_at}</p>
</div>

<style>
	.user {
		border: 1px solid black;
		padding: 1rem;
		margin: 1rem;
	}

	.user h2 {
		margin: 0;
	}

	.user p {
		margin: 0;
	}
</style>

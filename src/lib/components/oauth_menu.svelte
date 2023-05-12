<script lang="ts">
	export let dev = false;
</script>

<p>Log in to continue</p>

<ul>
	<li>
		<a href="/api/auth/github">GitHub</a>
	</li>
	<li>
		<a href="/api/auth/google">Google</a>
	</li>

	{#if dev}
		<li>
			<a href="/api/auth/local_github">Fake GitHub</a>
		</li>
		<li>
			<a href="/api/auth/local_google">Fake Google</a>
		</li>
	{/if}
</ul>

<script lang="ts">
	import type { PageData } from './$types';
	import Navbar from '$lib/components/navbar.svelte';
	import Footer from '$lib/components/footer.svelte';

	export let data: PageData;
</script>

<Navbar user={data.user} />

<main>
	<slot />
</main>

<Footer />

<style>
</style>

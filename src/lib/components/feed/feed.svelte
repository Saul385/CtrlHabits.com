<script lang="ts">
	import type { FeedData } from './feed';

	export let data: FeedData;
</script>

<pre>{JSON.stringify(data, null, 2)}</pre>

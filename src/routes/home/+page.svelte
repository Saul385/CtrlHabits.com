<script>
	import Header from '../../components/Header.svelte';
	import Heatmap from '../../components/Heatmap.svelte';
	import WeeklyHeatmap from '../../components/WeeklyHeatmap.svelte';
</script>

<body class="page">
	<Header />
	<Heatmap />
	<WeeklyHeatmap />
</body>

<style>
	.page {
		width: 100%;
		height: 100%;
		background-color: #00bbf0;
	}
	.heatmap {
		margin-top: 100px;
	}
</style>

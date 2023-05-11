<script>
	import Heatmap from './heatmap/heatmap.svelte';
</script>

<section class="landingBody">
	<div class="heatmapContainer">
		<Heatmap />
	</div>

	<button class="callToAction">Start Here</button>

	<div class="bodyContainer">
		<!--Body 1-->
		<div class="body 1">
			<p>
				Create and track your goals using a Heatmap to highlight progress throughout the calendar
				year
			</p>
			<div class="example" />
		</div>
		<!--Body 2-->
		<div class="body 2">
			<div class="example" />
			<p>Communicate and connect through goals defined by each other....</p>
		</div>
	</div>
</section>

<style>
	.bodyContainer {
		font-family: Open Sans, sans-serif;
		margin-top: 30%;
	}
	.body {
		display: flex;
		margin: auto;
		color: white;
		font-size: 30px;
		text-align: center;
		margin-bottom: 10%;
	}
	.example {
		background-color: white;
		width: 800px;
		height: 200px;
		margin: 20px;
		border-radius: 20px;
	}
	section {
		height: 100%;
		width: 100%;
		background-color: #00bbf0;
	}
	.heatmapContainer {
		height: fit;
	}
	.callToAction {
		display: flex;
		margin: auto;
		margin-top: 60px;
		height: 50px;
		width: 200px;
		border-radius: 15px;
		font-family: Open Sans, sans-serif;
		font-size: 25px;
		color: white;
		background-color: #00bbf0;
		justify-content: center;
		align-items: center;
		border-style: none;
		box-shadow: inset 0px 0px 20px white;
		transition: 0.5s;
	}
	.callToAction:hover {
		background-color: #00bbf0;
		color: white;
		border-style: none;
		box-shadow: 0px 0px 20px white;
	}
</style>

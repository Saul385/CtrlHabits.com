<script>
	import Heatmap from '../lib/components/Heatmap.svelte';
	import LandingBody from '../lib/components/LandingBody.svelte';
	import Footer from '../lib/components/Footer.svelte';
</script>

<body class="landingBody">
	<div class="logo">
		<a href="/"><img class="logo" src="/images/logo.png" alt="CtrlHabits.com logo" /> </a>
	</div>
	<div class="heatmapContainer">
		<Heatmap />
	</div>
	
	<button class="callToAction">Start Here</button>
	<LandingBody />
	<Footer />
</body>

<style>
	body {
		height: 100%;
		width: 100%;
		background-color: #00bbf0;
	}
	.heatmapContainer{
		height: fit
	}
	.logo {
		width: min(30vw, 150px);
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

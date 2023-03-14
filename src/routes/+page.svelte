<script>
	import Navbar from '../components/navbarLanding.svelte';
</script>

<body class = 'landingBody'>
	<Navbar />
	<div class="heatmap">
		<h1>Temporary Heatmap</h1>
		<img src="https://cdn.ourcodeworld.com/public-media/gallery/gallery-59aa72259592f.png" alt="" />
	</div>
</body>

<style>
	body{
		background-color: black;
		margin: auto;
	}
	.landingBody {
		background-image: url(../lib/images/landingBackground.jpg);
		background-repeat: no-repeat;
		background-size: cover;
		width: 100vw;
		height: 100vh;
	}
	.heatmap {
		margin-top: 10%;
	}
	.heatmap h1 {
		text-align: center;
		margin: auto;
		color: white;
		text-decoration: none;
		text-shadow: 1px 1px 1px black;
		font-family: arial;
		font-size: 1.7vw;
		font-weight: normal;
	}
	.heatmap img {
		display: flex;
		margin: auto;
	}
</style>

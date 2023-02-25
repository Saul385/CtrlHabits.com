<!--ToDo
    Background
        Fix bottom space for large screens
        Give credit to background and logo
-->
<script>
	import Navbar from './navbarLanding.svelte';
</script>

<body>
	<Navbar />
	<div class="heatmap">
		<h1>Temporary Heatmap</h1>
		<img src="https://cdn.ourcodeworld.com/public-media/gallery/gallery-59aa72259592f.png" alt="" />
	</div>
</body>

<style>
	body {
		background-image: url(https://img.freepik.com/free-vector/green-tones-gradient-background_23-2148360454.jpg?w=2000&t=st=1677278586~exp=1677279186~hmac=6ee8990a65935cf560cbc5d808e165ce2e538a3d0ff52a5b4b7e17ef3c8bd56d);
		background-repeat: no-repeat;
		background-size: cover;
		background-color: black;
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

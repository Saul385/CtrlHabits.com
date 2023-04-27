<!--ToDo
    Background
		background doubling
-->
<script>
	import Navbar from './navbarLanding.svelte';
	import OAuthMenu from '$lib/components/oauth_menu.svelte';
</script>

<body>
	<Navbar />

	<OAuthMenu dev={true} />

	<div class="heatmap">
		<h1>Temporary Heatmap</h1>
		<img src="https://cdn.ourcodeworld.com/public-media/gallery/gallery-59aa72259592f.png" alt="" />
	</div>
</body>

<style>
	body {
		background-image: url(https://img.freepik.com/free-vector/gradient-liquid-abstract-background_23-2148914626.jpg?w=996&t=st=1677614748~exp=1677615348~hmac=b85e5627e48713d263e834ab6c2b27ae7342d04d0c5a5d2ab5c4ff0e5b6ef2b7);
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

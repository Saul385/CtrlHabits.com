<script>
	import Navbar from '../../components/navbarLanding.svelte';
</script>

<body class="landingBody">
	<Navbar />
	<div class="blobContainer">
		<div class="blob">
			<p>
				<!-- TODO(#8): Finalize text. -->
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, possimus. Commodi magnam quo,
				molestiae ratione debitis quia, optio, explicabo ducimus sint illo eaque aperiam cum? Repellendus
				culpa cum atque alias.
			</p>
			<div class="diagram" />
		</div>
		<div class="blob">
			<div class="diagram" />
			<p>
				<!-- TODO(#8): Finalize text. -->
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem veniam at quibusdam mollitia sapiente
				non, minus modi quod exercitationem blanditiis, possimus aut, quidem excepturi? Aut veniam nostrum
				fugit! Excepturi, alias?
			</p>
		</div>
	</div>
</body>

<style>
	.blob {
		display: flex;
		margin: auto;
		margin-top: 10vh;
		color: white;
		font-size: 25px;
	}
	.diagram {
		display: inline-block;
		border-radius: 10px;
		background-color: white;
		width: 100%;
		max-width: 600px;
		height: 25vh;
	}
	.landingBody {
		background-image: url(/images/landingBackground.jpg);
		background-repeat: no-repeat;
		background-size: cover;
		width: 100vw;
		height: 100vh;
	}
</style>

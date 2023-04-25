<script>
	import Header from '../../components/Header.svelte';
</script>


<Header />
<body class="homeBody">
	<div class="habits">
		<h3 class="title">Habits</h3>
		<ul>
			<li></li>
		</ul>
	</div>
</body>

<style>
	.homeBody {
		background-image: none;
		background-color: #00bbf0;
		font-family: Open Sans, sans-serif;
	}
	.habits{
		margin:auto;
		background-color: white;
		height: 300px;
		width: 600px;
		border-radius: 15px;
	}
	.title{
		color: #00bbf0;
		text-align: center;
	}
</style>

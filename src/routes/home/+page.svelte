<script>
	import Header from '../../components/Header.svelte';
</script>


<Header />
<body class="homeBody">
	<div class="habitsContainer">
		<h3 class="title">Habits</h3>
		<ul class = "habits">
			<li></li>
		</ul>
		<form class = 'editHabits'>
			<input type="text" class="habitEntry" placeholder="Enter habit here! ">
			<br>
			<button class = 'addHabit'>ADD</button>
			<button class= 'removeHabit'>REMOVE</button>
		</form>
	</div>
</body>

<style>
	.homeBody {
		background-image: none;
		background-color: #00bbf0;
		font-family: Open Sans, sans-serif;
	}
	.habitsContainer{
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
	.editHabits{
		display:flex;
		margin:auto;
	}
	.habitEntry{
		background-color: #00bbf0;
		border-radius: 15px;
		color:white;
		height: 35px;
		width: 250px;
		border-width: 0;
		text-align: center;
		margin-bottom: 10px;
	}
	.addHabit{
		background-color: #008000;
		border-radius: 15px;
		width: 125px;
		height: 40px;
		margin-right: 10px;

	}
	.removeHabit{
		background-color: #FF0000;
		border-radius: 15px;
		width: 125px;
		height: 40px;

	}
	::placeholder{
		color:white;
	}
</style>

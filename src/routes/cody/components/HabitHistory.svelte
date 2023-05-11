<script>
	//Habit Storage
	let habits = ['Habit 1', 'Habit 2', 'Habit 3', 'Habit 4', 'Habit 5', 'Habit 6'];
</script>

<div class="container">
	<!--Title-->
	<h3 class="title">HABITS COMPLETED</h3>

	<!--Habits Container-->
	<div class="habitsContainer">
		{#each habits as habit}
			<div class="habit">
				<h4 class="habitTitle">
					{habit}
				</h4>
				<div class="habitInfos">
					<!--Start Date-->
					<span class="habitInfo">Start Date: 04/30/2023</span>
					<!--End Date-->
					<span class="habitInfo">End Date: 06/30/2023</span>
					<!--Days of Progress-->
					<span class="habitInfo">Progress Days: 28</span>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		background-color: white;
		border-radius: 15px;
		width: 99%;
		margin: auto;
		text-align: center;
		padding: 5px;
		margin-bottom: 100px;
	}
	.title {
		color: #00bbf0;
	}
	.habitsContainer {
		display: flex;
		flex-wrap: wrap;
	}
	.habit {
		height: 200px;
		width: 250px;
		background-color: #00bbf0;
		color: white;
		border-radius: 15px;
		margin: auto;
		margin-bottom: 30px;
		margin-left: 20px;
		margin-right: 20px;
		transition: 0.5s;
		border-style: solid;
		border-color: grey;
		border-radius: 5px;
		padding: 10px 10px 10px 10px;
		box-shadow: 0px 0px 10px grey;
	}
	.habit:hover {
		padding: 15px 15px 15px 15px;
		box-shadow: 0px 0px 20px grey;
	}
	.habitInfo {
		display: block;
		text-align: left;
		margin-bottom: 20px;
	}
</style>

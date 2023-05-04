<script>
	//Habit storage
	let habits = ['Habit 1', 'Habit 2', 'Habit 3'];

	//Remove habit
	function removeButton() {}
</script>

<body class="homeBody">
	<div class="habitsContainer">
		<!--Title-->
		<h3 class="title">HABITS</h3>

		<!--Container to store habit list and editing-->
		<div class="habContainer">
			<!--Habit List-->
			<ul class="habits">
				{#each habits as habit}
					{#if habit == habits[0]}
						<div class="habitContainer">
							<li style="background-color: #F1B963;">{habit}</li>
							<button class="removeHabit">X</button>
						</div>
					{:else if habit == habits[1]}
						<div class="habitContainer">
							<li style="background-color: #bbea58;">{habit}</li>
							<button class="removeHabit">X</button>
						</div>
					{:else if habit == habits[2]}
						<div class="habitContainer">
							<li style="background-color: #E46161;">{habit}</li>
							<button on:click={removeButton} class="removeHabit">X</button>
						</div>
					{/if}
				{/each}
			</ul>

			<!--Habit Editing-->
			<form class="editHabits" action = "/api/habits"> 
				<!--Inputs are equ to JSON properties -->
				<input type="text" class="habitEntry" placeholder="Enter habit here! " />
				<input type="date" >
				<select name="habit_id" id="habit_id">
					<option value="000">habit 1 </option>
					<option value="001">habit 2 </option>
					<option value="002">habit 3 </option>

				</select>
				<button class="addHabit">Add</button>
			</form>
		</div>
	</div>
</body>

<style>
	.homeBody {
		background-image: none;
		background-color: #00bbf0;
		font-family: Open Sans, sans-serif;
		margin-bottom: 100px;
	}
	.habitsContainer {
		margin: auto;
		background-color: white;
		height: 250px;
		width: 600px;
		border-radius: 15px;
		padding: 5px;
	}
	.habitContainer {
		display: inline-flex;
	}
	.habContainer {
		display: flex;
	}
	.title {
		color: #00bbf0;
		text-align: center;
	}
	.habits {
		margin: auto;
		margin-left: 0;
		width: 200px;
	}
	.habits li {
		margin-bottom: 15px;
		margin-left: 0;
		width: 150px;
		color: white;
		list-style: none;
		border-radius: 10px;
		font-size: 15px;
		font-weight: bold;
		padding: 10px;
		transition: 0.5s;
		box-shadow: 0px 0px 10px black;
	}

	.habits li:hover {
		padding: 15px;
	}
	.editHabits {
		margin: auto;
		width: 300px;
		text-align: center;
	}
	.habitEntry {
		background-color: #00bbf0;
		border-radius: 15px;
		color: white;
		height: 35px;
		width: 250px;
		border-width: 0;
		text-align: center;
		margin-bottom: 10px;
	}
	.addHabit {
		background-color: #008000;
		border-radius: 15px;
		border-style: none;
		color:white;
		width: 125px;
		height: 40px;
		box-shadow: 0px 0px 10px #008000;
		transition: 0.5s;
	}
	.addHabit:hover {
		cursor: pointer;
		box-shadow: 0px 0px 15px #008000;
		width: 130px;
		height: 50px;
	}
	.removeHabit {
		background-color: #ff0000;
		color: white;
		margin-left: 10px;
		border-style: none;
		border-radius: 25px;
		width: 30px;
		height: 30px;
		box-shadow: 0px 0px 10px red;
		transition: 0.5s;
	}
	.removeHabit:hover {
		height: 35px;
		width: 35px;
		cursor: pointer;
		box-shadow: 0px 0px 15px red;
	}
	::placeholder {
		color: white;
	}
</style>

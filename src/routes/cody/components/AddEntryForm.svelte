<script>
	let habits = ['Habit 1', 'Habit 2', 'Habit 3'];
</script>

<form class="entryForm" action="">
	<!--Date selection-->
	<h3 class="description">Select Day</h3>
	<div class="calendarContainer">
		<input class="calendar" type="date" />
		<select class="habitSelector" name="" id="">
			{#each habits as habit, i}
				<option value={i}>{habit} </option>
			{/each}
		</select>
	</div>

	<!--Progress Description-->
	<h3 class="description">Describe Habit Progress</h3>
	<textarea class="entryDescription" placeholder="Played 6 games of chess" />
	<br />
	<!--Submit Buttons-->
	<button class="submitProgress">Submit Progress</button>
	<br />
	<button class="submitHabit">Complete Habit</button>
</form>

<style>
	.entryForm {
		font-family: Open Sans, sans-serif;
		text-align: center;
		display: block;
	}
	.calendarContainer {
		border-style: solid;
		border-color: #00bbf0;
		border-radius: 15px;
		box-shadow: 0 0 10px #00bbf0;
		width: fit-content;
		margin: auto;
		padding: 10px;
		transition: 0.5s;
	}
	.calendarContainer:hover {
		padding: 15px;
	}
	.calendar {
		border-style: solid;
		border-width: 1px;
		border-color: #00bbf0;
	}
	.calendar:hover {
		cursor: pointer;
	}
	.habitSelector {
		border-style: solid;
		border-color: #00bbf0;
	}
	.description {
		width: fit-content;
		color: #00bbf0;
		border-radius: 15px;
		margin: auto;
		margin-bottom: 5px;
		margin-top: 25px;
		padding: 8px;
	}
	.entryDescription {
		height: 100px;
		width: 350px;
		max-width: 400px;
		max-height: 100px;
		border-radius: 15px;
		border-style: solid;
		border-color: #00bbf0;
		box-shadow: 0 0 10px #00bbf0;
		padding: 5px;
		margin-bottom: 10px;
		color: grey;
		transition: 0.5s;
	}
	.entryDescription:hover {
		box-shadow: 0 0 20px #00bbf0;
		padding: 10px;
	}
	button {
		border-radius: 15px;
		border-style: none;
		transition: 0.5s;
		padding: 15px;
		color: white;
		font-size: 15px;
		font-weight: bold;
		margin-bottom: 10px;
	}
	button:hover {
		cursor: pointer;
		padding: 20px;
	}
	.submitProgress {
		background-color: #f1b963;
	}
	.submitHabit {
		background-color: #00bbf0;
	}
	.habitSelector:hover {
		cursor: pointer;
	}
</style>

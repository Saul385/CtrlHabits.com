<script>
	/**
	 * @type {any[]}
	 */
	let habits = [];
	let colors = ['#F1B963', '#bbea58', '#E46161'];

	for (let i = 0; i < 3; i++) {
		let Habit = {
			habitName: 'Habit'.concat(' ' + (i + 1).toString()),
			entries: [
				['04/20/1996', 'Today I did blank'],
				['04/20/1996', 'Today I did blank'],
				['04/20/1996', 'Today I did blank'],
				['04/20/1996', 'Today I did blank'],
				['04/20/1996', 'Today I did blank'],
				['04/20/1996', 'Today I did blank']
			]
		};
		habits[i] = Habit;
	}
</script>

<div class="container">
	{#each habits as habit, i}
		<h3 class="habit" style="--background-color: {colors[i]}">{habit.habitName}</h3>
		<div class="entriesContainer">
			{#each habit.entries as entry}
				<div class="entry" style="--background-color: {colors[i]}">
					<h3 class="date">{entry[0]}</h3>
					<p>{entry[1]}</p>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.container {
		text-align: center;
		margin: auto;
		margin-top: 100px;
		font-family: Open Sans, sans-serif;
	}
	.habit {
		border-radius: 10px;
		color: white;
		padding: 10px;
		width: 100px;
		font-weight: bold;
		transition: 0.5s;
		background-color: var(--background-color);
		box-shadow: 0px 0px 10px var(--background-color);
		margin: auto;
		margin-bottom: 20px;
	}
	.entriesContainer {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 75px;
	}
	.entry {
		background-color: var(--background-color);
		box-shadow: 0px 0px 10px white;
		border-radius: 15px;
		margin: auto;
		margin-bottom: 15px;
		padding: 10px;
		transition: 0.5s;
	}
	.entry:hover {
		padding: 15px;
		box-shadow: 0px 0px 15px white;
	}
	.date {
		color: white;
	}

	p {
		color: black;
	}
</style>

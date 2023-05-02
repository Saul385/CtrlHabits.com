<script>
	//Fill in logs at random
	let days = [];
	let startDate = new Date('January 1 2023');

	for (let i = 0; i < 365; i++) {
		let logDate = new Date(startDate).setDate(i + 1);
		let date = new Date(logDate);
		let logDateString = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(date);
		let Day = {
			goal1: '',
			goal2: '',
			goal3: '',
			dateString: logDateString
		};
		if (i % 2 == 0 && i % 3 == 0) {
			Day.goal1 = '"Lost 1/2 a pound"';
		}
		if (i % 3 == 0) {
			Day.goal2 = '"Read 10 pages"';
		}
		if (i % 7 == 0) {
			Day.goal3 = '"Completed 1 leetcode problem"';
		}

		days[i] = Day;
	}
</script>

<div class="logo">
	<a href="/"><img class="logo" src="/images/logo.png" alt="CtrlHabits.com logo" /> </a>
</div>
<div class="heatmapContainer">
	<!--List of Goals-->
	<ul class="goals">
		<li id="Goal1" class="goal1">Lose 15 pounds</li>
		<li class="goal2">Read 100 books</li>
		<li class="goal3">Prepare for technical interview</li>
	</ul>
	<!--Y axis -->
	<ul class="y-axis">
		<li>Mon</li>
		<li>Wed</li>
		<li>Fri</li>
	</ul>
	<div class="heatmap">
		<!--X axis -->
		<ul class="x-axis">
			<li>Jan</li>
			<li>Feb</li>
			<li>Mar</li>
			<li>Apr</li>
			<li>May</li>
			<li>Jun</li>
			<li>Jul</li>
			<li>Aug</li>
			<li>Sep</li>
			<li>Oct</li>
			<li>Nov</li>
			<li>Dec</li>
		</ul>
		<div class="grid">
			{#each days as day}
				{#if day.goal1.length > 0}
					<div class="day log1" style="background-color: #F1B963; box-shadow: 0px 0px 2px #E46161;">
						<span class="tooltiptext">{day.dateString} <br /> {day.goal1}</span>
					</div>
				{:else if day.goal2.length > 0}
					<div class="day log2" style="background-color: #bbea58; box-shadow: 0px 0px 2px #8594e4;">
						<span class="tooltiptext">{day.dateString} <br /> {day.goal2}</span>
					</div>
				{:else if day.goal3.length > 0}
					<div class="day log3" style="background-color: #E46161; box-shadow: 0px 0px 2px #79c2d0;">
						<span class="tooltiptext">{day.dateString} <br /> {day.goal3}</span>
					</div>
				{:else}
					<div class="day">
						<span class="tooltiptext">{day.dateString} <br /></span>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>

<button class="callToAction">Start Here</button>

<style>
	.logo {
		width: min(30vw, 150px);
	}
	.heatmapContainer {
		height: 400px;
		width: 1000px;
		background-color: white;
		border-radius: 15px;
		display: flex;
		margin: auto;
		border-style: solid;
		border-color: grey;
		font-family: Open Sans, sans-serif;
	}
	.goals {
		margin: auto;
		margin-left: 0;
	}
	.goals li {
		margin-bottom: 15px;
		margin-left: 0;
		display: flex;
		list-style: none;
		border-radius: 10px;
		color: white;
		font-size: 15px;
		font-weight: bold;
		padding: 10px;
		transition: 0.5s;
	}

	.goals li:hover {
		padding: 15px;
	}

	.grid {
		height: 200px;
		width: 600px;
		border-style: solid;
		border-color: grey;
		border-radius: 15px;
		border-width: 3px;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		overflow: auto;
	}

	.heatmap {
		margin: auto;
		margin-left: 0;
		min-width: 500px;
	}

	.day {
		height: 15px;
		width: 15px;
		border-radius: 5px;
		background-color: grey;
		margin: 5px;
		transition: 0.5s;
		position: relative;
		display: inline-block;
	}

	.day:hover {
		height: 17px;
		width: 17px;
	}
	.y-axis {
		list-style: none;
		font-size: 20px;
		margin: auto;
		margin-right: 2px;
		font-size: 18px;
	}
	.x-axis {
		list-style: none;
		display: inline-flex;
		margin-bottom: 0;
		margin-right: 0;
		width: 90%;
	}
	.x-axis li {
		margin: auto;
		font-size: 18px;
	}
	.y-axis li {
		margin-top: 55px;
		margin-bottom: 30px;
	}
	.goal1 {
		background-color: #f1b963;
		box-shadow: 0px 0px 10px #f1b963;
	}
	.goal2 {
		background-color: #bbea58;
		box-shadow: 0px 0px 10px #cbf078;
	}
	.goal3 {
		background-color: #e46161;
		box-shadow: 0px 0px 10px #e46161;
	}
	.callToAction {
		display: flex;
		margin: auto;
		margin-top: 60px;
		height: 50px;
		width: 200px;
		border-radius: 15px;
		font-family: Open Sans, sans-serif;
		font-size: 25px;
		color: white;
		background-color: #00bbf0;
		justify-content: center;
		align-items: center;
		border-style: none;
		box-shadow: inset 0px 0px 20px white;
		transition: 0.5s;
	}
	.callToAction:hover {
		background-color: #00bbf0;
		color: white;
		border-style: none;
		box-shadow: 0px 0px 20px white;
	}
	.day .tooltiptext {
		visibility: hidden;
		width: 300px;
		background-color: white;
		color: #00bbf0;
		border-style: solid;
		box-shadow: 0px 0px 20px #00bbf0;
		text-align: center;
		border-radius: 6px;
		padding: 5px 0;

		/* Position the tooltip */
		position: absolute;
		z-index: 3;
	}

	.day:hover .tooltiptext {
		visibility: visible;
		top: -10px;
		left: 110%;
	}
</style>

<script>
	import { blank_object } from 'svelte/internal';

	export let habits = [1, 2, 3];
	let startDate = new Date('January 1 2023');
	let color = 'grey';

	let week = [[1, 2, 3], [1, 3], [2, 3], [3], [1], [2], [3]];
</script>

{#each habits as habit}
	<!--Change color depending on habit-->
	<div style="visibility: hidden;">
		{#if habit == 1}
			{(color = '#F1B963')}
		{:else if habit == 2}
			{(color = '#bbea58')}
		{:else}
			{(color = '#E46161')}
		{/if}
	</div>

	<div class="container">
		<!--Profile Section-->
		<div class="profile">
			<h3>Cody Cole</h3>
			<a href="/"
				><img
					class="profileImage"
					src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
					alt="Profile image"
				/>
			</a>
		</div>

		<!--Habit-->
		<h3 style="--background-color: {color}" class="habit">Habit {habit}</h3>

		<!--Heatmap-->
		<div class="heatmapContainer">
			<div class="weekdays">
				<h4>Mon</h4>
				<h4>Wed</h4>
				<h4>Fri</h4>
			</div>

			<div class="heatmap">
				{#each week as day}
					{#if day.includes(habit)}
						{#if habit == 1}
							<div
								class="weekday"
								style="--background-color: {color}; box-shadow: 0px 0px 10px #f1b963;"
							/>
						{:else if habit == 2}
							<div
								class="weekday"
								style="background-color: {color}; box-shadow: 0px 0px 10px #bbea58;"
							/>
						{:else if habit == 3}
							<div
								class="weekday"
								style="background-color: {color}; box-shadow: 0px 0px 10px #E46161;"
							/>
						{/if}
					{:else}
						<div class="weekday" style="background-color: grey;" />
					{/if}
				{/each}
			</div>
		</div>
	</div>
{/each}

<style>
	.container {
		background-color: white;
		width: 500px;
		text-align: center;
		margin: auto;
		margin-top: 100px;
		padding: 5px;
		border-radius: 25px;
		border-style: solid;
		border-color: grey;
		border-width: 3px;
	}
	.profile {
		color: #00bbf0;
		display: flex;
		justify-content: space-between;
	}
	.profileImage {
		height: 60px;
		width: 60px;
		border-radius: 40px;
	}
	.habit {
		background-color: var(--background-color);
		margin: auto;
		width: 100px;
		height: 35px;
		border-radius: 25px;
		color: white;
		box-shadow: 0px 0px 10px var(--background-color);
		transition: 0.5s;
	}
	.habit:hover {
		box-shadow: 0px 0px 20px #f1b963;
		padding: 5px;
	}
	.weekdays {
		display: flex;
		justify-content: space-between;
		width: 300px;
		margin: auto;
	}
	.weekdays h4 {
		margin-bottom: 0px;
	}

	.heatmap {
		display: flex;
		justify-content: space-between;
		width: 300px;
		margin: auto;
		margin-top: 0;
		border-style: solid;
		border-color: grey;
		border-width: 3px;
		border-radius: 10px;
		padding: 5px;
	}
	.weekday {
		height: 25px;
		width: 25px;
		border-radius: 5px;
		background-color: var(--background-color);
		transition: 0.5s;
	}
	.weekday:hover {
		height: 29px;
		width: 29px;
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

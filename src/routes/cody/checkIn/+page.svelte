<script>
	import Header from '../components/Header.svelte';
	let habits = ['Habit 1', 'Habit 2', 'Habit 3'];
	let colors = ['#F1B963', '#bbea58', '#E46161'];
</script>

<Header />
<div class="container">
	<!--Habit Container-->
	<div class="habits">
		{#each habits as habit, i}
			<h3 style:--background-color={colors[i]} class="habit">{habit}</h3>
		{/each}
	</div>
</div>

<style>
	.container {
		height: 100%;
		width: 100%;
		background-color: #00bbf0;
	}
	.habits {
		text-align: center;
		width: 80%;
		display: flex;
		justify-content: space-between;
		margin: auto;
	}
	.habit {
		height: 100px;
		padding: 10px;
		border-radius: 15px;
		color: white;
		background-color: var(--background-color);
	}
</style>

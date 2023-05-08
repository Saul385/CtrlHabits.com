<script>
	import Header from '../../lib/components/Header.svelte';
	import Heatmap from '../../lib/components/Heatmap.svelte';
	import AddEntryForm from '../../lib/components/AddEntryForm.svelte';
	import EntryList from '../../lib/components/EntryList.svelte';
	let habits = ['Habit 1', 'Habit 2', 'Habit 3'];
	let colors = ['#F1B963', '#bbea58', '#E46161'];
</script>

<body class="page">
	<Header />
	<div class="container">
		<Heatmap />
		<div class="habits">
			{#each habits as habit, i}
				<span class="habit" style="--background-color: {colors[i]};">{habit}</span>
			{/each}
		</div>
		<AddEntryForm />
	</div>
	<EntryList />
</body>

<style>
	.page {
		font-family: Open Sans, sans-serif;
		width: 100%;
		height: 100%;
		background-color: #00bbf0;
	}
	.container {
		background-color: white;
		height: fit-content;
		width: fit-content;
		padding: 100px;
		border-radius: 15px;
		margin: auto;
		margin-top: 100px;
		border-style: solid;
		border-color: grey;
	}
	.habits {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: auto;
		margin-top: 25px;
		width: 70%;
		padding: 5px;
		text-align: center;
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
	}
	.habit:hover {
		cursor: pointer;
		padding: 15px;
	}
</style>

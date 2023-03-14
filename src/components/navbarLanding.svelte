<script>
	import { openModal } from 'svelte-modals';
	import Modal from '../components/Modal.svelte';

	function handleClick() {
		openModal(Modal, {});
	}
</script>

<div class="headerContainer">
	<div class="header">
		<a href="/"><img class="logo" src="/images/logo.png" alt="CtrlHabits.com logo" /> </a>

		<nav class="headerLinks">
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="/login"> Login | Sign Up</a>
			<a href="/about">About</a>
		</nav>
	</div>
</div>

<style>
	.headerContainer {
		width: 100%;
	}
	.header {
		display: flex;
	}
	.headerLinks {
		width: 100%;
		display: flex;
		margin: auto;
	}
	.headerLinks a {
		color: #fefcf2;
		text-decoration: none;
		text-shadow: 1px 1px 1px black;
		font-family: arial;
		font-size: 1.7vw;
		font-weight: normal;
		display: flex;
		margin: auto;
	}

	.headerLinks a:hover {
		transition: 0.5s;
		color: #32de84;
	}
	.logo {
		width: min(50vw, 250px);
	}
</style>

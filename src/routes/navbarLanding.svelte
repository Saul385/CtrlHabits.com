<!--ToDo
    Header
        Thicker logo?
		Login/Sign up Modal 
        

-->
<script>
	import { openModal } from 'svelte-modals';
	import Modal from '../components/Modal.svelte';

	function handleClick() {
		openModal(Modal, {});
	}
</script>

<div class="headerContainer">
	<div class="header">
		<a href="/"
			><img
				class="logo"
				src="https://media.discordapp.net/attachments/1067970159987404822/1078421689928519803/logodark_grey_with_white.png"
				alt=""
			/>
		</a>

		<nav class="headerLinks">
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="" on:click={handleClick}>Login | Sign Up</a>
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

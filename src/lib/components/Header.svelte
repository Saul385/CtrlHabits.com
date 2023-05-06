<script>
</script>

<div class="headerContainer">
	<div class="header">
		<!--Logo-->
		<a href="/home">
			<img class="logo" src="/images/logo.png" alt="CtrlHabits.com logo" />
		</a>

		<!--Header Links-->
		<nav class="headerLinks">
			<a href="/home">HOME</a>
		</nav>

		<!--Profile Image-->
		<a href="/profile"
			><img
				class="profileImage"
				src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
				alt="Profile image"
			/>
		</a>
	</div>
</div>

<style>
	.headerContainer {
		width: 100%;
		border-bottom: 2px solid;
		border-color: white;
	}
	.header {
		display: flex;
	}
	.headerLinks {
		width: 100%;
		display: flex;
		margin: auto;
		margin-bottom: 10px;
	}
	.headerLinks a {
		color: white;
		text-decoration: none;
		font-family: arial;
		font-size: 1.4vw;
		font-weight: normal;
		display: flex;
		margin: auto;
	}

	.headerLinks a:hover {
		transition: 1s;
		text-decoration: underline;
	}
	.logo {
		width: min(30vw, 150px);
	}
	.profileImage {
		width: min(25vw, 100px);
		border-radius: 30px;
		margin-top: 30px;

	}
</style>

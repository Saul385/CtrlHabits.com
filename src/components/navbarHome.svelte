<script>
	import logo from '$lib/images/logo.png';
</script>

<div class = headerContainer>
    <div class="header">
		<!--Logo-->
        <a href="/"
			><img
				class="logo"
				src="{logo}"
				alt=""
			/>
		</a>

		<!--Header Links-->
		<nav class="headerLinks">
			<a href="">Home</a>
			<a href="">Goals</a>
			<a href="">Friends</a>
		</nav>

		<!--Profile Image-->
        <a href="/"
			><img
				class="profileImage"
				src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
				alt=""
			/>
		</a>
    </div>
</div>

<style>
	.headerContainer {
		width: 100%;
		
	}
	.header {
		display: flex;
		border-bottom: 2px solid;
	}
	.headerLinks {
		width: 100%;
		display: flex;
		margin: auto;
	}
	.headerLinks a {
		color: #05386B;
		text-decoration: none;
		font-family: arial;
		font-size: 1.7vw;
		font-weight: normal;
		display: flex;
		margin: auto;
	}

	.headerLinks a:hover {
		transition: 1s;
		text-decoration: underline;
	}
	.logo {
		width: min(50vw, 250px);
	}
	.profileImage{
		width: min(25vw, 100px);
		border-radius: 30px;
		margin-top: 60px;
		margin-right: 20px;
	}
</style>
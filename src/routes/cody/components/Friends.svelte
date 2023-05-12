<script>
	let profiles = ['Cody Cole', 'Bob Hope', 'Gum Bump', 'Alex Colder'];
</script>

<div class="container">
	<!--Title-->
	<h3 class="title">FRIENDS</h3>

	<div class="requestContainer">
		<!--Title-->
		<h4 class="title" style="text-align: left;">PENDING REQUEST</h4>

		<!--Friend Requests-->
		<div class="requests">
			{#each profiles as profile}
				<div class="request">
					<div class="profile">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<a href="/"
							><img
								class="profileImage"
								src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
								alt="Profile image"
							/>
						</a>
						<br />
						<span>{profile}</span>
					</div>
					<div class="options">
						<button class="button" style="background-color: green;">Accept</button>
						<button class="button" style="background-color: red;">Deny</button>
					</div>
				</div>
			{/each}
		</div>

		<!--Add friend form-->
		<form class="friendForm" action="">
			<input class="friendInput" placeholder="Enter Friend Name Here!" type="text" name="" id="" />
			<button class="addFriend">Add</button>
		</form>

		<!--Friends-->
		<div class="requests">
			{#each profiles as profile}
				<div class="request">
					<div class="profile">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<a href="/"
							><img
								class="profileImage"
								src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
								alt="Profile image"
							/>
						</a>
						<br />
						<span>{profile}</span>
					</div>
					<div class="options">
						<button class="button" style="background-color: red; margin-top: 50px;">Remove</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.container {
	}
	.requestContainer {
	}
	.title {
		text-align: center;
		color: white;
	}
	.requests {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 200px;
	}
	.request {
		padding: 30px;
		background-color: white;
		color: #00bbf0;
		border-radius: 15px;
		margin: auto;
		margin-bottom: 20px;
		margin-left: 10px;
		display: flex;
		transition: 0.5s;
		border-style: solid;
		border-color: grey;
		border-radius: 15px;
		padding: 15px;
		box-shadow: 0px 0px 10px grey;
	}
	.profile {
	}
	.profileImage {
		height: 100px;
		width: 100px;
		border-radius: 25px;
	}
	.button {
		height: 40px;
		width: 100px;
		border-radius: 15px;
		border-style: none;
		box-shadow: 0px 0px 10px grey;
		color: white;
		display: block;
		margin-bottom: 20px;
		margin-left: 40px;
		transition: 0.5s;
	}
	.button:hover {
		cursor: pointer;
		box-shadow: 0px 0px 15px grey;
	}
	.options {
	}

	.friendForm {
		margin: auto;
		margin-bottom: 50px;
		width: 300px;
		text-align: center;
	}
	.friendInput {
		background-color: #ffffff;
		opacity: 70%;
		border-radius: 15px;
		color: #00bbf0;
		height: 35px;
		width: 250px;
		border-width: 0;
		text-align: center;
		margin-bottom: 10px;
	}
	.addFriend {
		background-color: #008000;
		color: white;
		border-radius: 15px;
		border-style: none;
		width: 125px;
		height: 40px;
		box-shadow: 0px 0px 10px #008000;
		transition: 0.5s;
	}
	.addFriend:hover {
		height: 50px;
		cursor: pointer;
	}
</style>

<script>
	let profiles = ['Cody Cole', 'Bob Hope', 'Gum Bump'];
</script>

<div class="container">
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
                        <br>
						<span>{profile}</span>
					</div>

					<button class="accept" />
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
	}
	.request {
		height: 150px;
		width: 300px;
		background-color: white;
        
		border-radius: 15px;
		margin: auto;
		margin-bottom: 20px;
		margin-left: 10px;
		transition: 0.5s;
		border-style: solid;
		border-color: grey;
		border-radius: 5px;
		padding: 10px 10px 10px 10px;
		box-shadow: 0px 0px 10px grey;
	}
	.profile {
	}
	.profileImage {
		height: 100px;
		width: 100px;
		border-radius: 25px;
	}
</style>

<script>
	import Navbar from '../navbarLanding.svelte';
</script>

<body>
	<Navbar />
    <div class="blobContainer">
        <div class="blob">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, possimus. Commodi magnam quo, molestiae ratione debitis quia, optio, explicabo ducimus sint illo eaque aperiam cum? Repellendus culpa cum atque alias.</p>
            <div class="diagram"></div>
        </div>
        <div class="blob">
            <div class="diagram"></div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem veniam at quibusdam mollitia sapiente non, minus modi quod exercitationem blanditiis, possimus aut, quidem excepturi? Aut veniam nostrum fugit! Excepturi, alias?</p>
    </div>

    </div>
</body>

<style>
    .blob{
        display:flex;
        margin: auto;
        margin-top: 10vh;
        color: black;
        font-size: 25px;
    }
    .diagram{
        display:inline-block;
        border-radius: 10px;
        background-color: white;
        width: 100%;
        max-width: 600px;
        height: 25vh;
  
    }
    body {
		background-image: url(https://img.freepik.com/free-vector/green-tones-gradient-background_23-2148360454.jpg?w=2000&t=st=1677278586~exp=1677279186~hmac=6ee8990a65935cf560cbc5d808e165ce2e538a3d0ff52a5b4b7e17ef3c8bd56d);
		background-repeat: no-repeat;
		background-size: cover;
		background-color: black;
	}

</style>

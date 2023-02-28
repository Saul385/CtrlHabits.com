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
		background-image: url(https://img.freepik.com/free-vector/gradient-liquid-abstract-background_23-2148914626.jpg?w=996&t=st=1677614748~exp=1677615348~hmac=b85e5627e48713d263e834ab6c2b27ae7342d04d0c5a5d2ab5c4ff0e5b6ef2b7);
		background-repeat: no-repeat;
		background-size: cover;
		background-color: black;
	}

</style>

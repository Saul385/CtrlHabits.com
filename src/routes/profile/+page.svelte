<script>
	import Header from '../../components/Header.svelte';
	import { app } from '../../firebase.js';
	import { collection, addDoc } from 'firebase/firestore';
	import { initializeApp } from 'firebase/app';

	// try {
	// const docRef = await addDoc(collection(db, "users"), {
	//     first: "Ada",
	//     last: "Lovelace",
	//     born: 1815
	// });
	// console.log("Document written with ID: ", docRef.id);
	// } catch (e) {
	// console.error("Error adding document: ", e);
	// }
</script>

<body class="homeBody" />

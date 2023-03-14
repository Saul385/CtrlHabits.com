<script>
	import {app} from '../../firebase';
	import { getFirestore } from 'firebase/firestore';
	import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
	import { goto } from '$app/navigation';



	//Initialize auth
	const auth = getAuth();
	const provider = new GoogleAuthProvider();

	//Initialize database
	const database = getFirestore(app);

	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			if (credential) {
				const token = credential.accessToken;
			}
			// The signed-in user info.
			const user = result.user;

			// IdP data available using getAdditionalUserInfo(result)
			if (user) {
				goto('/home');
			}
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;

			// The email of the user's account used.
			const email = error.customData.email;

			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
		});
</script>

<style>
</style>

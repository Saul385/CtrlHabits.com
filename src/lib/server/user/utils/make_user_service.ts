import { Firestore } from '@google-cloud/firestore';
import type { UserServiceInterface } from '$lib/server/user';
import { UserServiceType } from '$lib/user';
import { FirestoreUserService } from '$lib/server/user/firestore_user_service';
import { LocalFakeUserService } from '$lib/server/user/local_fake_user_service';
import {
	LOCAL_USER_SERVICE_PATH,
	FIRESTORE_CLIENT_EMAIL,
	FIRESTORE_PRIVATE_KEY,
	FIRESTORE_PROJECT_ID
} from '$lib/server/env';

/**
 * makeUserService returns the relevant user service.
 */
export function makeUserService(userServiceType: UserServiceType): UserServiceInterface {
	switch (userServiceType) {
		// Note: The following switch statement cases change according to enum UserServiceType.
		case UserServiceType.LOCAL: {
			return new LocalFakeUserService(LOCAL_USER_SERVICE_PATH);
		}

		case UserServiceType.FIRESTORE: {
			const firestoreClient = new Firestore({
				projectId: FIRESTORE_PROJECT_ID,
				credentials: {
					client_email: FIRESTORE_CLIENT_EMAIL,
					private_key: FIRESTORE_PRIVATE_KEY
				}
			});
			return new FirestoreUserService(firestoreClient, 'users');
		}

		default: {
			throw new Error(`Unknown user service: ${userServiceType}`);
		}
	}
}

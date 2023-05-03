import { Firestore } from '@google-cloud/firestore';
import type { CTRLHabitsServiceInterface } from '$lib/server/ctrlhabits';
import { CTRLHabitsServiceType } from '$lib/ctrlhabits';
import { FirestoreCTRLHabitsService } from '$lib/server/ctrlhabits/firestore_ctrlhabits_service';
import { LocalFakeCTRLHabitsService } from '$lib/server/ctrlhabits/local_fake_ctrlhabits_service';
import {
	LOCAL_CTRLHABITS_SERVICE_PATH,
	FIRESTORE_CLIENT_EMAIL,
	FIRESTORE_PRIVATE_KEY,
	FIRESTORE_PROJECT_ID
} from '$lib/server/env';

/**
 * makeUserService returns the relevant user service.
 */
export function makeCTRLHabitsService(
	ctrlhabitsServiceType: CTRLHabitsServiceType
): CTRLHabitsServiceInterface {
	switch (ctrlhabitsServiceType) {
		// Note: The following switch statement cases change according to enum UserServiceType.
		case CTRLHabitsServiceType.LOCAL: {
			return new LocalFakeCTRLHabitsService(LOCAL_CTRLHABITS_SERVICE_PATH);
		}

		case CTRLHabitsServiceType.FIRESTORE: {
			const firestoreClient = new Firestore({
				projectId: FIRESTORE_PROJECT_ID,
				credentials: {
					client_email: FIRESTORE_CLIENT_EMAIL,
					private_key: FIRESTORE_PRIVATE_KEY
				}
			});
			return new FirestoreCTRLHabitsService(firestoreClient, 'users', 'habits');
		}

		default: {
			throw new Error(`Unknown user service: ${ctrlhabitsServiceType}`);
		}
	}
}

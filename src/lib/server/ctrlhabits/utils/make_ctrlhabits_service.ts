import type { CTRLHabitsServiceInterface } from '$lib/server/ctrlhabits';
import { CTRLHabitsServiceType } from '$lib/ctrlhabits';
import { FileSystemCTRLHabitsService } from '$lib/server/ctrlhabits/file_system_ctrlhabits_service';
import { CTRLHABITS_SERVICE_DATA_PATH } from '$lib/server/env';

/**
 * makeCTRLHabitsService returns the relevant user service.
 */
export function makeCTRLHabitsService(
	ctrlhabitsServiceType: CTRLHabitsServiceType
): CTRLHabitsServiceInterface {
	switch (ctrlhabitsServiceType) {
		case CTRLHabitsServiceType.LOCAL: {
			return new FileSystemCTRLHabitsService(CTRLHABITS_SERVICE_DATA_PATH);
		}

		case CTRLHabitsServiceType.FIRESTORE: {
			throw new Error('Unimplemented');
		}

		case CTRLHabitsServiceType.POCKETBASE: {
			throw new Error('Unimplemented');
		}

		default: {
			throw new Error(`Unknown user service: ${ctrlhabitsServiceType}`);
		}
	}
}

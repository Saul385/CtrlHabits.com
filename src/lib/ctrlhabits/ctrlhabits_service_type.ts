/**
 * CTRLHabitsServiceType is the type of user service.
 */
export enum CTRLHabitsServiceType {
	LOCAL = 'local',
	FIRESTORE = 'firestore',
	POCKETBASE = 'pocketbase'
}

/**
 * parseCTRLHabitsServiceType parses a string into a UserServiceType.
 */
export function parseCTRLHabitsServiceType(
	ctrlhabitsServiceType: string | null
): CTRLHabitsServiceType | null {
	switch (ctrlhabitsServiceType) {
		case CTRLHabitsServiceType.LOCAL: {
			return CTRLHabitsServiceType.LOCAL;
		}

		case CTRLHabitsServiceType.FIRESTORE: {
			return CTRLHabitsServiceType.FIRESTORE;
		}

		case CTRLHabitsServiceType.POCKETBASE: {
			return CTRLHabitsServiceType.POCKETBASE;
		}

		default: {
			return null;
		}
	}
}

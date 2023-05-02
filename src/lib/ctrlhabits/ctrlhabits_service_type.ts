/**
 * CTRLHabitsServiceType is the type of user service.
 */
export enum CTRLHabitsServiceType {
	LOCAL = 'local',
	FIRESTORE = 'firestore'
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

		default: {
			return null;
		}
	}
}

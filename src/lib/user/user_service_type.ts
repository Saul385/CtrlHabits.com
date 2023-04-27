/**
 * UserServiceType is the type of user service.
 */
export enum UserServiceType {
	LOCAL = 'local',
	FIRESTORE = 'firestore'
}

/**
 * parseUserServiceType parses a string into a UserServiceType.
 */
export function parseUserServiceType(userServiceType: string | null): UserServiceType | null {
	switch (userServiceType) {
		case UserServiceType.LOCAL: {
			return UserServiceType.LOCAL;
		}

		case UserServiceType.FIRESTORE: {
			return UserServiceType.FIRESTORE;
		}

		default: {
			return null;
		}
	}
}

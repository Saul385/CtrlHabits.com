import { DEV_FLAG_ENABLED } from '$lib/env';

/**
 * In SvelteKit, environment variables are imported from a special $env module.
 *
 * See:
 * https://kit.svelte.dev/docs/modules#$env-static-public
 */
import {
	GITHUB_PROD_SECRET as STRING_GITHUB_PROD_SECRET,
	GITHUB_DEV_SECRET as STRING_GITHUB_DEV_SECRET,
	FIRESTORE_PROD_PROJECT_ID as STRING_FIRESTORE_PROD_PROJECT_ID,
	FIRESTORE_DEV_PROJECT_ID as STRING_FIRESTORE_DEV_PROJECT_ID,
	FIRESTORE_PROD_CLIENT_EMAIL as STRING_FIRESTORE_PROD_CLIENT_EMAIL,
	FIRESTORE_DEV_CLIENT_EMAIL as STRING_FIRESTORE_DEV_CLIENT_EMAIL,
	FIRESTORE_PROD_PRIVATE_KEY as STRING_FIRESTORE_PROD_PRIVATE_KEY,
	FIRESTORE_DEV_PRIVATE_KEY as STRING_FIRESTORE_DEV_PRIVATE_KEY
} from '$env/static/public';

export const GITHUB_PROD_SECRET = STRING_GITHUB_PROD_SECRET;
export const GITHUB_DEV_SECRET = STRING_GITHUB_DEV_SECRET;
export const GITHUB_SECRET = DEV_FLAG_ENABLED ? GITHUB_DEV_SECRET : GITHUB_PROD_SECRET;

export const FIRESTORE_PROD_PROJECT_ID = STRING_FIRESTORE_PROD_PROJECT_ID;
export const FIRESTORE_DEV_PROJECT_ID = STRING_FIRESTORE_DEV_PROJECT_ID;
export const FIRESTORE_PROJECT_ID = DEV_FLAG_ENABLED
	? FIRESTORE_DEV_PROJECT_ID
	: FIRESTORE_PROD_PROJECT_ID;

export const FIRESTORE_PROD_CLIENT_EMAIL = STRING_FIRESTORE_PROD_CLIENT_EMAIL;
export const FIRESTORE_DEV_CLIENT_EMAIL = STRING_FIRESTORE_DEV_CLIENT_EMAIL;
export const FIRESTORE_CLIENT_EMAIL = DEV_FLAG_ENABLED
	? FIRESTORE_DEV_CLIENT_EMAIL
	: FIRESTORE_PROD_CLIENT_EMAIL;

export const FIRESTORE_PROD_PRIVATE_KEY = STRING_FIRESTORE_PROD_PRIVATE_KEY;
export const FIRESTORE_DEV_PRIVATE_KEY = STRING_FIRESTORE_DEV_PRIVATE_KEY;
export const FIRESTORE_PRIVATE_KEY = DEV_FLAG_ENABLED
	? FIRESTORE_DEV_PRIVATE_KEY
	: FIRESTORE_PROD_PRIVATE_KEY;

// TODO: Assign './dev/github_oauth.json' and './dev/users.json' to env variables.
export const LOCAL_GITHUB_OAUTH_PATH = './dev/github_oauth.json';
export const LOCAL_USERS_PATH = './dev/users.json';
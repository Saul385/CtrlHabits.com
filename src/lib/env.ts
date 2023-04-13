import { parseBoolean } from '$lib/parse_boolean';
import {
	DEV_FLAG_ENABLED as STRING_DEV_FLAG_ENABLED,
	GITHUB_PROD_CLIENT as STRING_GITHUB_PROD_CLIENT,
	GITHUB_DEV_CLIENT as STRING_GITHUB_DEV_CLIENT
} from '$env/static/public';

export const DEV_FLAG_ENABLED = parseBoolean(STRING_DEV_FLAG_ENABLED);
export const GITHUB_PROD_CLIENT = STRING_GITHUB_PROD_CLIENT;
export const GITHUB_DEV_CLIENT = STRING_GITHUB_DEV_CLIENT;
export const GITHUB_CLIENT = DEV_FLAG_ENABLED ? GITHUB_DEV_CLIENT : GITHUB_PROD_CLIENT;

const GITHUB_OAUTH_URL = new URL('https://github.com/login/oauth/authorize');
GITHUB_OAUTH_URL.searchParams.set('client_id', GITHUB_CLIENT);

export { GITHUB_OAUTH_URL };

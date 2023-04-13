import { DEV_FLAG_ENABLED } from '$lib/env';
import {
	GITHUB_PROD_SECRET as STRING_GITHUB_PROD_SECRET,
	GITHUB_DEV_SECRET as STRING_GITHUB_DEV_SECRET
} from '$env/static/public';

export const GITHUB_PROD_SECRET = STRING_GITHUB_PROD_SECRET;
export const GITHUB_DEV_SECRET = STRING_GITHUB_DEV_SECRET;
export const GITHUB_SECRET = DEV_FLAG_ENABLED ? GITHUB_DEV_SECRET : GITHUB_PROD_SECRET;

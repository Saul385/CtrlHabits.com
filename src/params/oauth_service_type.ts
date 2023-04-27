import { parseOAuthServiceType } from '$lib/oauth';

/**
 * match matches the given param to an OAuthServiceType.
 *
 * See:
 * https://kit.svelte.dev/docs/advanced-routing#matching
 */
export function match(param: string): boolean {
	return parseOAuthServiceType(param) !== undefined;
}

import { OAuthProvider } from '$lib/server/oauth';

/**
 * match is a function that returns true if the `oauth` param matches a valid OAuth provider.
 *
 * See:
 * https://kit.svelte.dev/docs/advanced-routing#matching
 */
export function match(param: string): boolean {
	switch (param) {
		case (OAuthProvider.GITHUB, OAuthProvider.GOOGLE): {
			return true;
		}

		default: {
			return false;
		}
	}
}

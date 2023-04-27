/**
 * parseAuthSearchParams parses the auth params from a URL.
 */
export function parseAuthSearchParams(url: URL): AuthSearchParams {
	return {
		code: url.searchParams.get(SEARCH_PARAM_CODE) ?? undefined
	};
}

/**
 * AuthSearchParams are the auth search params.
 */
export interface AuthSearchParams {
	/**
	 * code is the code returned from the OAuth provider.
	 */
	code?: string;
}

/**
 * SEARCH_PARAM_CODE is the search param for the code.
 */
export const SEARCH_PARAM_CODE = 'code';

// TODO: Move these to a more appropriate location.
import { UserServiceType, parseUserServiceType } from '$lib/server/user';
import { OAuthServiceType, parseOAuthServiceType } from '$lib/server/oauth';

/**
 * parseExperimentSearchParams parses the experiment params from a URL.
 */
export function parseExperimentSearchParams(url: URL): ExperimentSearchParams {
	return {
		userServiceType: parseUserServiceType(url.searchParams.get(SEARCH_PARAM_USER_SERVICE_TYPE))
	};
}

/**
 * ExperimentSearchParams are the experiment params.
 */
export interface ExperimentSearchParams {
	userServiceType?: UserServiceType;
}

/**
 * parseAuthSearchParams parses the auth params from a URL.
 */
export function parseAuthSearchParams(url: URL): AuthSearchParams {
	return {
		code: url.searchParams.get(SEARCH_PARAM_CODE) ?? undefined,
		oauthServiceType: parseOAuthServiceType(url.searchParams.get(SEARCH_PARAM_OAUTH_SERVICE_TYPE))
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

	/**
	 * oauthServiceType is the type of OAuth service.
	 */
	oauthServiceType?: OAuthServiceType;
}

/**
 * SEARCH_PARAM_USER_SERVICE_TYPE is the search param for the user service type.
 */
export const SEARCH_PARAM_USER_SERVICE_TYPE = 'user_service_type';

/**
 * SEARCH_PARAM_OAUTH_SERVICE_TYPE is the search param for the OAuth service type.
 */
export const SEARCH_PARAM_OAUTH_SERVICE_TYPE = 'oauth_service_type';

/**
 * SEARCH_PARAM_CODE is the search param for the code.
 */
export const SEARCH_PARAM_CODE = 'code';

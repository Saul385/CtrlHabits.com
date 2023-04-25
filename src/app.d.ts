import type { User } from '$lib/server/user';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: User | null;
		}

		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};

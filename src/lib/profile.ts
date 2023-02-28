import { writable } from 'svelte/store';

export interface ProfileState {
	data: {
		name: string;
	};
	loggedIn: boolean;
}

export const profile = writable<ProfileState>(makeDefaultProfileState());

function makeDefaultProfileState(): ProfileState {
	return {
		data: {
			name: ''
		},
		loggedIn: true
	};
}

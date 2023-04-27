import type { Actions } from './$types';

export const actions: Actions = {
	async default(event) {
		if (event.locals.user === null) {
			return new Response('Unauthorized', { status: 401 });
		}

		if (event.locals.user.tag !== null) {
			return new Response('Forbidden', { status: 403 });
		}

		console.log('/api/claim: ', { event }); // TODO: Fix this!

		// TODO: Visit http://localhost:5173/api/auth/local_github?code=fake_code_001.
		// Check if the chosen tag is available. If so, return an error.
		// const userService = makeUserService(USER_SERVICE_TYPE);
		// const existingUser = await userService.getUserByTag({
		// 	tag:
		// });

		// Otherwise, associate the tag with the user.
		// const newUser = await userService.updateUser({
		// 	id: event.locals.user.id,
		// 	tag:
		// });
	}
};

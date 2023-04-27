import type { Actions } from './$types';

export const actions: Actions = {
	async default(event) {
		// Redirect home if the user has satisfied either of these conditions:
		// 1. They are not logged in.
		// 2. They have already claimed a tag.
		if (event.locals.user === null || event.locals.user.tag !== null) {
			return Response.redirect('/');
		}

		console.log('/api/join: ', { event }); // TODO: Fix this!

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

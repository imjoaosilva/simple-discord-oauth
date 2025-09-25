import { Elysia } from 'elysia';
import { auth } from '@/lib/auth';

export const AuthService = new Elysia({
	name: 'AuthService',
})
	.mount(auth.handler)
	.macro({
		auth: {
			async resolve({ status, request }) {
				const session =
					await auth.api.getSession(request);

				if (!session) {
					return status(401, {
						message: 'Unauthorized',
					});
				}

				return {
					user: session.user,
					session: session.session,
				};
			},
		},
	});

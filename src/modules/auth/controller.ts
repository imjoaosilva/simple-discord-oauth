import { Elysia } from 'elysia';
import { auth } from '@/lib/auth';

export const authController = new Elysia({
	prefix: '/auth',
}).get(
	'/discord',
	async ({ redirect, status }) => {
		const result = await auth.api.signInSocial({
			body: { provider: 'discord' },
		});

		if (!result.url) {
			return status(500, {
				message: 'Failed to sign in with Discord',
			});
		}

		return redirect(result.url);
	},
);

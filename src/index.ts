import { Elysia } from 'elysia';
import { auth } from './lib/auth';
import { AuthService } from './services/auth';

const app = new Elysia()
	.use(AuthService)
	.get(
		'/auth/discord',
		async ({ redirect, status }) => {
			const discord = await auth.api.signInSocial(
				{
					body: {
						provider: 'discord',
					},
				},
			);

			if (!discord.url)
				return status(500, {
					message:
						'Failed to sign in with Discord',
				});

			return redirect(discord.url);
		},
	)
	.get('/', ({ user }) => user, {
		auth: true,
	})
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

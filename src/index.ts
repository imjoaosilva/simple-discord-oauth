import { Elysia } from 'elysia';
import { authController } from '@/auth/controller';
import { AuthService } from '@/auth/service';

const app = new Elysia()
	.use(AuthService)
	.use(authController)
	.get('/', ({ user }) => user, {
		auth: true,
	})
	.listen(process.env.PORT || 3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

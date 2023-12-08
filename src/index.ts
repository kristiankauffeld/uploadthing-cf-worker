import { Env, Handler } from './types';
import { Method, Router } from 'tiny-request-router';
import { uploadRouter } from './uploadthing';
import { createServerHandler } from 'uploadthing/server';

const router = new Router<Handler>();

router.post('/api/uploadthing', async (req, env) => {
	const { POST } = createServerHandler({
		router: uploadRouter,
		config: {
			uploadthingId: env.UPLOADTHING_APP_ID,
			uploadthingSecret: env.UPLOADTHING_SECRET,
			callbackUrl: 'http://localhost:8787/api/uploadthing',
		},
	});

	return POST(req);
});

router.get('/api/uploadthing', async (req, env) => {
	const { GET } = createServerHandler({
		router: uploadRouter,
		config: {
			uploadthingId: env.UPLOADTHING_APP_ID,
			uploadthingSecret: env.UPLOADTHING_SECRET,
		},
	});
	return GET(req);
});

const worker: ExportedHandler<Env> = {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		const match = router.match(request.method as Method, url.pathname);

		if (!match) return new Response('Not found', { status: 404 });

		return match.handler(request, env);
	},
};

export default worker;

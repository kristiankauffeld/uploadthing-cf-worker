import { Env, Handler } from './types';
import { Method, Router } from 'tiny-request-router';
import { uploadRouter } from './uploadthing';
import { createServerHandler } from 'uploadthing/server';
import * as process from 'node:process';

const router = new Router<Handler>();

const { GET, POST } = createServerHandler({
	router: uploadRouter,
});

router.post('/api/uploadthing', async (req) => POST(req));
router.get('/api/uploadthing', async (req) => GET(req));

const worker: ExportedHandler<Env> = {
	async fetch(request, env, ctx) {
		process.env.UPLOADTHING_SECRET ??= env.UPLOADTHING_SECRET;
		process.env.UPLOADTHING_APP_ID ??= env.UPLOADTHING_APP_ID;

		const url = new URL(request.url);
		const match = router.match(request.method as Method, url.pathname);

		if (!match) return new Response('Not found', { status: 404 });

		return match.handler(request, env);
	},
};

export default worker;

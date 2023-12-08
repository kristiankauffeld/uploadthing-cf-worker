export interface Env {
	UPLOADTHING_SECRET: string;
	UPLOADTHING_APP_ID: string;
}

export type Handler = (request: Request, env: Env) => Response | Promise<Response>;

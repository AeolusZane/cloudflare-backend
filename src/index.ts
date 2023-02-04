/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const data = {
			hello: 'cloudflare!',
			data:"页面数据缓存3分钟",
			time: new Date().toLocaleTimeString()
		};

		const json = JSON.stringify(data, null, 2);

		return new Response(json, {
			headers: {
				'content-type': 'application/json;charset=UTF-8',
				'Cache-Control': 'max-age=180',
				"Access-Control-Allow-Origin": "https://cloudflare-adb.pages.dev http://localhost:3000"
			},
		});
	},
};

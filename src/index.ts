import 'dotenv/config';
import Fastify, { FastifyRequest } from 'fastify';
import fastifyCors from '@fastify/cors';
import playwright from 'playwright';
import { ENDPOINTS } from './routes';

const config = {
  host: process.env.HOST || '0.0.0.0',
  port: Number(process.env.PORT) || 8000,
};

// Initialize a single browser instance.
// This browser instance will be shared across requests to avoid the overhead of launching a new browser each time.
export let browser: playwright.Browser;
(async () => {
  browser = await playwright.webkit.launch({ headless: true });
})();

const fastify = Fastify({ logger: true });
fastify.register(fastifyCors);

fastify.get('/', async (request, reply) => {
  return { message: 'API is running!' };
});

// Dynamically create routes.
for (const endpoint in ENDPOINTS) {
  fastify.get(
    `/api/${endpoint}`,
    async (request: FastifyRequest<{ Querystring: Record<string, string | number> }>, reply) => {
      const handlerModule = ENDPOINTS[endpoint as keyof typeof ENDPOINTS];
      const handler = handlerModule.default;
      const data = await handler(request.query);

      return reply.send(data);
    },
  );
}

// Start the server.
const start = async () => {
  try {
    await fastify.listen(config);
    console.info(`Server listening on ${config.host}:${config.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

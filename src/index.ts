import 'dotenv/config';
import Fastify, { FastifyRequest } from 'fastify';
import fastifyCors from '@fastify/cors';
import { ENDPOINTS } from './routes.js';
import { initBrowser } from './utils.js';

const config = {
  host: process.env.HOST || '0.0.0.0',
  port: Number(process.env.PORT) || 8000,
};

const fastify = Fastify({ logger: true });
fastify.register(fastifyCors);

fastify.get('/', async (request, reply) => {
  return {
    message: 'API is running!',
    method: request.method,
    ip: request.ip,
  };
});

// Dynamically create routes.
for (const endpoint in ENDPOINTS) {
  const endpointPath = `/api/${endpoint}`;

  console.info('[+]', endpointPath);
  fastify.get(
    endpointPath,
    async (request: FastifyRequest<{ Querystring: Record<string, string | number> }>, reply) => {
      const handlerModule = await ENDPOINTS[endpoint as keyof typeof ENDPOINTS];
      const handler = handlerModule.default;
      const data = await handler(request.query);

      return reply.send(data);
    },
  );
}

// Initialize a single browser instance.
// This browser instance will be shared across requests to avoid the overhead of launching a new browser each time.
initBrowser();

// Start the server.
fastify.listen(config);

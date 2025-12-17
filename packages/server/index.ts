import 'dotenv/config';
import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import pkg from './package.json' with { type: 'json' };
import { Endpoint, ENDPOINTS } from './endpoints.js';

// Initialize Fastify server with plugins.
const fastify = Fastify({ logger: true });
fastify.register(fastifyCors);

// Root endpoint providing basic API information.
fastify.get('/', async (request, reply) => {
  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    repository: pkg.repository,
    user_agent: request.headers['user-agent'],
    user_ip: request.headers['x-forwarded-for'] || request.ip,
    uptime: +process.uptime().toFixed(0),
  };
});

// Dynamic endpoint to handle various trending data requests.
fastify.get('/api/:platform/:type', async (request, reply) => {
  const { platform, type } = request.params as { platform: string; type: string };
  const params = request.query as Record<string, string | number>;

  const endpointKey = `${platform}/${type}` as Endpoint;
  const fetchFunction = ENDPOINTS[endpointKey];

  if (!fetchFunction) {
    reply.status(404).send({ error: 'Endpoint not found.' });
    return;
  }

  try {
    const data = await fetchFunction(params);
    reply.send({ data });
  } catch (error: any) {
    reply.status(500).send({ error: error.message || 'An error occurred while fetching data.' });
  }
});

// Start the server.
fastify.listen({
  host: process.env.HOST || '0.0.0.0',
  port: +(process.env.PORT || 3000),
});

import Fastify from 'fastify';
import type { FastifyServerOptions } from 'fastify';
import { healthRoutes } from './routes/health.js';
import { roomRoutes } from './routes/rooms.js';

export function buildApp(options: FastifyServerOptions = {}) {
  const app = Fastify(options);
  app.register(healthRoutes);
  app.register(roomRoutes);
  return app;
}

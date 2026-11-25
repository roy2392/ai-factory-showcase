import type { FastifyInstance } from 'fastify';
import { findRoom, listRooms } from '../domain/rooms.js';

export async function roomRoutes(app: FastifyInstance) {
  app.get('/rooms', async () => listRooms());

  app.get<{ Params: { id: string } }>('/rooms/:id', async (request, reply) => {
    const room = findRoom(request.params.id);
    if (!room) {
      return reply.code(404).send({ error: 'Room not found' });
    }
    return room;
  });
}

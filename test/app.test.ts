import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { buildApp } from '../src/app.js';

describe('bookings API', () => {
  let app: ReturnType<typeof buildApp>;

  beforeEach(() => {
    app = buildApp();
  });

  afterEach(async () => {
    await app.close();
  });

  it('reports a healthy service', async () => {
    const response = await app.inject({ method: 'GET', url: '/health' });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok' });
    expect(response.headers['content-type']).toContain('application/json');
  });

  it('lists the three seeded rooms', async () => {
    const response = await app.inject({ method: 'GET', url: '/rooms' });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual([
      { id: 'atlas', name: 'Atlas', capacity: 4 },
      { id: 'cedar', name: 'Cedar', capacity: 8 },
      { id: 'summit', name: 'Summit', capacity: 12 },
    ]);
  });

  it.each([
    { id: 'atlas', name: 'Atlas', capacity: 4 },
    { id: 'cedar', name: 'Cedar', capacity: 8 },
    { id: 'summit', name: 'Summit', capacity: 12 },
  ])('returns room $id', async (room) => {
    const response = await app.inject({ method: 'GET', url: `/rooms/${room.id}` });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(room);
  });

  it.each(['missing', 'ATLAS', 'toString'])(
    'returns a JSON 404 for unknown room %s',
    async (id) => {
      const response = await app.inject({ method: 'GET', url: `/rooms/${id}` });
      expect(response.statusCode).toBe(404);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.json()).toEqual({ error: 'Room not found' });
    },
  );
});

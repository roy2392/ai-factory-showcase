export interface Room {
  readonly id: string;
  readonly name: string;
  readonly capacity: number;
}

const rooms: readonly Room[] = [
  { id: 'atlas', name: 'Atlas', capacity: 4 },
  { id: 'cedar', name: 'Cedar', capacity: 8 },
  { id: 'summit', name: 'Summit', capacity: 12 },
];

export function listRooms(): Room[] {
  return rooms.map((room) => ({ ...room }));
}

export function findRoom(id: string): Room | undefined {
  const room = rooms.find((candidate) => candidate.id === id);
  return room ? { ...room } : undefined;
}

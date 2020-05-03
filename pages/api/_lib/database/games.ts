import { v4 as uuidv4 } from 'uuid';

import { getCollection } from './utils';

const createGame = async (): Promise<TGame> => {
  const gamesCollection = await getCollection('games');
  const response = await gamesCollection.insertOne({ id: uuidv4() });
  return response.ops[0];
};

const getGame = async (id: string): Promise<TGame> => {
  const gamesCollection = await getCollection('games');
  return gamesCollection.findOne({ id });
};

const setPlayerNameInGame = async (
  sessionId: string,
  name: string,
  gameId: string
): Promise<void> => {
  const gamesCollection = await getCollection('games');
  await gamesCollection.updateOne(
    { id: gameId },
    { $set: { [`players.${sessionId}.name`]: name } }
  );
};

export { createGame, setPlayerNameInGame, getGame };
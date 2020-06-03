import { TGameForPlayer, GamePhase } from '../../../types';
import { GET_GAME_DETAILS_ERROR_MESSAGE } from '../../pages/api/games';
import { getGame as getGameFromDatabase } from '../database/games';
import { isPlayerRegistered, getGameForPlayer } from '../../helpers/games';

const getGame = async (gameId, sessionId): Promise<TGameForPlayer> => {
  const game = await getGameFromDatabase(gameId);
  if (!isPlayerRegistered(game, sessionId)) {
    if (game.phase === GamePhase.WAITING_FOR_PLAYERS) {
      throw Error(GET_GAME_DETAILS_ERROR_MESSAGE.YOU_MUST_FIRST_SET_YOUR_NAME);
    }
    throw Error(GET_GAME_DETAILS_ERROR_MESSAGE.YOU_HAVE_MISSED_GAME_START);
  }
  return getGameForPlayer(game, sessionId);
};

export { getGame };

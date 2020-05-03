import { NowRequest, NowResponse } from '@now/node';

import { getGame } from '../_lib/database/games';
import { getPlayerNameInGame } from '../../_lib/helpers/games';
import { GET_GAME_DETAILS_ERROR_MESSAGE } from '../../_lib/api/games';

export default async (
  req: NowRequest,
  res: NowResponse
): Promise<NowResponse> => {
  if (req.method === 'GET') {
    const {
      query: { id },
    } = req;
    const game = await getGame(id as string);
    if (!getPlayerNameInGame(game, req.cookies.sessionId)) {
      return res.status(403).json({
        message: GET_GAME_DETAILS_ERROR_MESSAGE.YOU_MUST_FIRST_SET_YOUR_NAME,
      });
    }
    return res.status(200).json(game);
  }
  return res.status(405);
};
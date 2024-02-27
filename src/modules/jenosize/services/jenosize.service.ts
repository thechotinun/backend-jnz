import { Injectable } from '@nestjs/common';
import { ExternalApi } from '@utils/external-api/external-api.service';
import { ConfigService } from '@nestjs/config';
import { JenosizeException } from '@exceptions/app/jenosize.exception';

const COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const player = {
  man: 'X',
  computer: 'O',
};

@Injectable()
export class JenosizeService {
  constructor(
    private readonly externalApi: ExternalApi,
    private readonly configService: ConfigService,
  ) {}

  async placeSearch(query: { pagetoken: string }) {
    try {
      const reponses = await this.externalApi.getPlaceSearch(
        this.configService.get<string>('ENDPOINT_API'),
        {
          params: {
            type: this.configService.get<string>('TYPE_PLACE_SEARCH'),
            key: this.configService.get<string>('GOOGLE_API_KEY'),
            ...query,
          },
        },
      );

      return reponses;
    } catch (error) {
      return error;
    }
  }

  async gamexo(query: { nums: number }) {
    try {
      const { nums } = query;

      return nums;
    } catch (error) {
      return JenosizeException.WorngNumber();
    }
  }

  async isWinner(gameData: string[], player: string) {
    for (let i = 0; i < COMBOS.length; i++) {
      let won = true;

      for (let j = 0; j < COMBOS[i].length; j++) {
        const id = COMBOS[i][j];
        won = gameData[id] == player && won;
      }

      if (won) {
        return true;
      }
    }
    return false;
  }

  async isDraw(gameData: string[]) {
    let isBoardFill = true;
    for (let i = 0; i < gameData.length; i++) {
      isBoardFill = gameData[i] && isBoardFill;
    }
    if (isBoardFill) {
      return true;
    }
    return false;
  }

  async getEmptySpaces(gameData: string[]) {
    const EMPTY = [];

    for (let id = 0; id < gameData.length; id++) {
      if (!gameData[id]) EMPTY.push(id);
    }

    return EMPTY;
  }

  async minimaxCal(gameData: string[], PLAYER: string) {
    if (await this.isWinner(gameData, player.computer))
      return { evaluation: +10 };
    if (await this.isWinner(gameData, player.man)) return { evaluation: -10 };
    if (await this.isDraw(gameData)) return { evaluation: 0 };

    const EMPTY_SPACES = await this.getEmptySpaces(gameData);

    const moves = [];

    for (let i = 0; i < EMPTY_SPACES.length; i++) {
      const id = EMPTY_SPACES[i];

      const backup = gameData[id];

      gameData[id] = PLAYER;

      const move: { id?: number; evaluation?: any } = {};
      move.id = id;
      if (PLAYER == player.computer) {
        const evaluation = await this.minimaxCal(gameData, player.man);
        move.evaluation = evaluation.evaluation;
      } else {
        const evaluation = await this.minimaxCal(gameData, player.computer);
        move.evaluation = evaluation.evaluation;
      }

      gameData[id] = backup;

      moves.push(move);
    }

    let bestMove;

    if (PLAYER == player.computer) {
      let bestEvaluation = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].evaluation > bestEvaluation) {
          bestEvaluation = moves[i].evaluation;
          bestMove = moves[i];
        }
      }
    } else {
      let bestEvaluation = +Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].evaluation < bestEvaluation) {
          bestEvaluation = moves[i].evaluation;
          bestMove = moves[i];
        }
      }
    }
    return bestMove;
  }

  async minimax(payload: { gameData: string[]; PLAYER: string }) {
    try {
      const { gameData, PLAYER } = payload;
      return await this.minimaxCal(gameData, PLAYER);
    } catch (error) {
      return JenosizeException.WorngNumber();
    }
  }
}

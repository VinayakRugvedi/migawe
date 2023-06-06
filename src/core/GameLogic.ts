import { RONIN_GAMBIT } from 'utils/constants'
import type { IGameLogic, GameState, PvtState } from './types'

export default class GameLogic implements IGameLogic<GameState> {
  getInitialState(): GameState {
    const state: GameState = {
      step: 0,
      Health: [RONIN_GAMBIT.START_HEALTH, RONIN_GAMBIT.START_HEALTH],
      B_move: 3,
      pvtStateHash: [0, 0],
    }
    return state
  }

  isFinalState(gameState: GameState): boolean {
    return gameState.Health[0] === 0 || gameState.Health[1] === 0
  }
}

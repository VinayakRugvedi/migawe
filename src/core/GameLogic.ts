import { START_HEALTH } from "../constants";
import type { IGameLogic, GameState, PvtState } from "./types";

export default class GameLogic implements IGameLogic<GameState> {
  private playerPvtState: PvtState;

  getInitialState(): GameState {
    const state: GameState = {
      step: 0,
      Health: [START_HEALTH, START_HEALTH],
      B_move: 3,
      pvtStateHash: [0, 0],
    };
    return state;
  }

  isFinalState(gameState: GameState): boolean {
    return gameState.Health[0] === 0 || gameState.Health[1] === 0;
  }
}

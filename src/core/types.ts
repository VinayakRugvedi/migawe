interface IAgent<GameState> {
  // returns the new states after the move
  getNextState(
    gameState: GameState,
    prevProof?: any,
    prevpublicSignals?: any,
  ): Promise<{
    newPubState: PubState
    newPvtStateHash: PvtStateHash
    proof: any // TODO: define this type
    publicSignals: any // TODO: redundant, as can be extracted from PubState or vice versa
  }>
}

interface IGameLogic<GameState> {
  getInitialState: () => GameState
  isFinalState: (gameState: GameState) => boolean
}

enum GameEngineStatus {
  WaitingForResponse,
  WaitingForProofVerification,
  NotRunning,
  Running,
  Completed,
}

/////////// User defined stuff ///////////
/**  Define GameState & Move  **/
type PvtStateHash = number
type PubState = {
  step: number
  Health: {
    0: number
    1: number
  }
  // 0:rock, 1:paper, 2:scissors 3:unfedined
  B_move: 0 | 1 | 2 | 3
}
type PvtState = {
  move: 0 | 1 | 2 | 3
}
type GameState = PubState & {
  pvtStateHash?: {
    0: PvtStateHash
    1: PvtStateHash
  }
}

export { GameEngineStatus }
export type { IAgent, GameState, IGameLogic, PubState, PvtStateHash, PvtState }

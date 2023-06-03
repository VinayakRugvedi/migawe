import type { IAgent, GameState, PubState, PvtStateHash } from '../types'
import type { DataConnection } from 'peerjs'

export default class NetworkedAgent implements IAgent<GameState> {
  private onMsgReceive: ((msg: any) => void) | undefined
  conn: DataConnection

  constructor(conn: DataConnection) {
    this.conn = conn

    conn.on('data', (msg) => {
      // console.log("NetworkedAgent: data received: " + msg);
      if (this.onMsgReceive) {
        this.onMsgReceive(JSON.parse(msg.toString()))
      } else {
        console.warn('NetworkedAgent: was not expecting a move:', msg)
      }
    })
  }

  public async getNextState(
    gameState: GameState,
    prevProof,
    prevPublicSignals,
  ): Promise<{
    newPubState: PubState
    newPvtStateHash: PvtStateHash
    proof: any
    publicSignals
  }> {
    // extract PubState from gameState
    const agentId = gameState.step % 2
    const pubState = { ...gameState }
    delete pubState.pvtStateHash
    // send the game state to the other player
    this.conn.send(
      JSON.stringify({
        pubState: pubState,
        pvtStateHash: gameState.pvtStateHash[(agentId + 1) % 2],
        proof: prevProof,
        publicSignals: prevPublicSignals,
      }),
    )

    return new Promise((resolve) => {
      this.onMsgReceive = (msg) => {
        this.onMsgReceive = undefined
        resolve({
          newPubState: msg.pubState,
          newPvtStateHash: msg.pvtStateHash,
          proof: msg.proof,
          publicSignals: msg.publicSignals,
        })
      }
    })
  }
}

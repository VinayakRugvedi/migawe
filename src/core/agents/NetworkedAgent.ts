import type { IAgent, GameState, PubState, PvtStateHash } from '../types'
import type { DataConnection } from 'peerjs'

export default class NetworkedAgent implements IAgent<GameState> {
  private onMsgReceive: ((msg: any) => void) | undefined
  conn: DataConnection

  constructor(conn: DataConnection) {
    this.conn = conn

    conn.on('data', (msg: any) => {
      console.log('%c NetworkAgent: msg ' + msg, 'color: gray; font-size: 15px;')
      if (this.onMsgReceive) {
        this.onMsgReceive(JSON.parse(msg.toString()))
      } else {
        console.warn('NetworkedAgent: was not expecting a move:', msg)
      }
    })
  }

  public async getNextState(
    gameState: GameState,
    prevProof: any,
    prevPublicSignals: any,
    prevStateSign: string,
  ): Promise<{
    newPubState: PubState
    newPvtStateHash: PvtStateHash
    proof: any
    publicSignals: any
    stateSign: string
  }> {
    // extract PubState from gameState
    const agentId = gameState.step % 2
    const pubState = { ...gameState }
    delete pubState.pvtStateHash
    // send the game state to the other player
    this.conn.send(
      JSON.stringify({
        pubState: pubState,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        pvtStateHash: gameState?.pvtStateHash[(agentId + 1) % 2],
        proof: prevProof,
        publicSignals: prevPublicSignals,
        stateSign: prevStateSign,
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
          stateSign: msg.stateSign,
        })
      }
    })
  }
}

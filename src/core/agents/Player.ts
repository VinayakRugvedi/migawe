import type { IAgent, GameState, PvtStateHash, PubState, PvtState } from '../types'
import { snarkjs } from '../snark'

export default class Player implements IAgent<GameState> {
  private onMoveSelected: ((move: 0 | 1 | 2) => void) | undefined
  private privateState: PvtState = { move: 3 }
  private pvtStateHash: PvtStateHash = 0

  public async getNextState(gameState: GameState): Promise<{
    newPubState: PubState
    newPvtStateHash: PvtStateHash
    proof: any
    publicSignals: any
  }> {
    return new Promise((resolve) => {
      this.onMoveSelected = async (move: 0 | 1 | 2) => {
        this.onMoveSelected = undefined

        // extract PubState from gameState & deep copy
        let pubState = { ...gameState } as any
        delete pubState.pvtStateHash
        pubState = JSON.parse(JSON.stringify(pubState))

        const agentId = gameState.step % 2
        // save a deep copy of the previous private state
        // needed for proof generation
        const prevPvtState =
          this.privateState.move !== 3 ? JSON.parse(JSON.stringify(this.privateState)) : undefined

        //////////////////////////////////////////
        // GAME LOGIC
        if (agentId === 0) {
          // 0's turn
          if (gameState.step > 0) {
            // update healths
            const diff = (3 + this.privateState.move - gameState.B_move) % 3
            if (diff === 1) {
              // 0 wins
              pubState.Health[1] -= 1
            } else if (diff === 2) {
              // 1 wins
              pubState.Health[0] -= 1
            }
          }
          this.privateState = { move: move }
        } else {
          // 1's turn
          pubState.B_move = move
        }

        //////////////////////////////////////////
        // construct proof of correct transition
        let zkCircuitName, inputs
        const pvtState = {} as any
        let key: keyof PvtState
        for (key in this.privateState) {
          pvtState['P' + agentId + '_' + key] = this.privateState[key]
        }
        if (gameState.step === 0) {
          zkCircuitName = 'init'
          inputs = { ...pubState, ...pvtState }
        } else {
          zkCircuitName = agentId === 0 ? 'moveA' : 'moveB'
          // construct prevStates
          const prevStates = {}
          for (const key in pubState) {
            prevStates[key + '_prev'] = gameState[key]
          }
          for (const key in prevPvtState) {
            prevStates['P' + agentId + '_' + key + '_prev'] = prevPvtState[key]
          }
          // @ts-ignore
          prevStates.step_prev = gameState.step - 1 // Super hacky, as gameEngine is updating the 'step'

          inputs = {
            ...prevStates,
            ...pubState,
            ...pvtState,
            hash_prev: this.pvtStateHash,
          }
        }
        try {
          console.log(`generating proof for ${zkCircuitName}`, { inputs })
          let time = performance.now()
          const { proof, publicSignals } = await snarkjs.groth16.fullProve(
            inputs,
            zkCircuitName + '.wasm',
            zkCircuitName + '.zkey',
          )
          this.pvtStateHash = publicSignals[0] // as circuit has only one output
          time = performance.now() - time
          console.log(
            `%c proofGeneration took ${(time / 1000).toFixed(5)} sec`,
            'color: blue; font-size: 15px;',
          )
          // console.log(
          //   `%c generated proof:`,
          //   "color: aqua; font-size: 15px;",
          //   { proof },
          //   { publicSignals }
          // );

          resolve({
            newPubState: pubState,
            newPvtStateHash: agentId === 0 ? this.pvtStateHash : 0,
            proof: proof,
            publicSignals: publicSignals,
          })
        } catch (error) {
          console.warn('%cproof generation failed!!!', 'color: red; font-size: 20px;', error)
        }
      }
    })
  }

  public selectMove(move: 0 | 1 | 2): void {
    if (this.onMoveSelected) {
      this.onMoveSelected(move)
    } else {
      console.error("onMoveSelected is undefined !! not agent's turn")
    }
  }
}

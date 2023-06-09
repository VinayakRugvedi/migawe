import type { IAgent, GameState, PvtStateHash, PubState, PvtState } from '../types'
import { snarkjs } from '../snark'
import { ethers } from 'ethers'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { CONTRACTS } from 'utils/constants'

enum PlayerMove {
  Attack = 0,
  Defend = 1,
  Break = 2,
}

export default class Player implements IAgent<GameState> {
  private onMoveSelected: ((move: PlayerMove) => void) | undefined
  private privateState: PvtState | undefined = undefined
  private pvtStateHash: PvtStateHash = 0
  private proxyWallet: ethers.Wallet
  private sdk: ThirdwebSDK | undefined
  public onPlayersMove: (() => void) | undefined
  public onResquestedForFinalizeGame: (() => void) | undefined

  constructor(proxyWallet: ethers.Wallet, sdk: ThirdwebSDK | undefined = undefined) {
    console.log('Player constructor');
    this.proxyWallet = proxyWallet
    this.sdk = sdk
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
    return new Promise((resolve) => {
      this.onMoveSelected = async (move: PlayerMove) => {
        this.onMoveSelected = undefined

        // extract PubState from gameState & deep copy
        let pubState = { ...gameState } as any
        delete pubState.pvtStateHash
        pubState = JSON.parse(JSON.stringify(pubState))

        const agentId = gameState.step % 2
        // save a deep copy of the previous private state
        // needed for proof generation
        const prevPvtState = this.privateState
          ? JSON.parse(JSON.stringify(this.privateState))
          : undefined

        //////////////////////////////////////////
        // GAME LOGIC
        if (agentId === 0) {
          // 0's turn
          if (gameState.step > 0 && this.privateState) {
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
        if (this.privateState) {
          let key: keyof PvtState
          for (key in this.privateState) {
            pvtState['P' + agentId + '_' + key] = this.privateState[key]
          }
        }
        if (gameState.step === 0) {
          zkCircuitName = 'init'
          inputs = { ...pubState, ...pvtState }
        } else {
          zkCircuitName = agentId === 0 ? 'moveA' : 'moveB'
          // construct prevStates
          const prevStates: any = {}
          for (const key in pubState) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            prevStates[key + '_prev'] = gameState[key]
          }
          for (const key in prevPvtState) {
            prevStates['P' + agentId + '_' + key + '_prev'] = prevPvtState[key]
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
          console.log(
            `%c generated proof:`,
            'color: aqua; font-size: 15px;',
            { proof },
            { publicSignals },
          )

          resolve({
            newPubState: pubState,
            newPvtStateHash: agentId === 0 ? this.pvtStateHash : 0,
            proof: proof,
            publicSignals: publicSignals,
            stateSign: await this.proxyWallet.signMessage(
              ethers.utils.arrayify(
                ethers.utils.solidityKeccak256(
                  ['uint256', 'uint256', 'uint256', 'uint256'],
                  [
                    publicSignals.at(-4).toString(),
                    publicSignals.at(-3).toString(),
                    publicSignals.at(-2).toString(),
                    publicSignals.at(-1).toString(),
                  ],
                ),
              ),
            ),
          })
          // if Player has won call finaliseGame On-chain
          if (pubState.Health[(agentId + 1) % 2] === 0 && this.sdk !== undefined) {
            try {
              console.log(
                '%c Player: finalizing game',
                'color: white; font-size: 15px; background-color: red;',
              )
              const rpsGameContract = await this.sdk.getContract(
                CONTRACTS.rpsGameAddress,
                CONTRACTS.rpsGameABI,
              )
              const { a, b, c } = extractFromProof(proof)
              if (this.onResquestedForFinalizeGame) {
                this.onResquestedForFinalizeGame()
              }
              await rpsGameContract.call('finalizeGame', [
                prevStateSign,
                a,
                b,
                c,
                publicSignals.map((x: { toString: () => any }) => x.toString()),
              ])
            } catch (error) {
              console.warn('%c finalizing game failed!!!', 'color: red; font-size: 20px;', error)
            }
          }
        } catch (error) {
          console.warn('%cproof generation failed!!!', 'color: red; font-size: 20px;', error)
        }
      }
      if (this.onPlayersMove) this.onPlayersMove()
    })
  }

  public selectMove(move: PlayerMove): void {
    console.log('%c Player: moveSelected ' + move, 'color: red; font-size: 15px;')
    if (this.onMoveSelected) {
      this.onMoveSelected(move)
    } else {
      console.error("onMoveSelected is undefined !! not agent's turn")
    }
  }

  public isPlayersTurn(): boolean {
    return this.onMoveSelected ? true : false
  }

  public getPrivateState(): PvtState {
    return this.privateState ? this.privateState : { move: 3 }
  }
}

const extractFromProof = (proof: any) => {
  return {
    a: [proof.pi_a[0], proof.pi_a[1]],
    b: [
      [proof.pi_b[0][1], proof.pi_b[0][0]],
      [proof.pi_b[1][1], proof.pi_b[1][0]],
    ],
    c: [proof.pi_c[0], proof.pi_c[1]],
  }
}

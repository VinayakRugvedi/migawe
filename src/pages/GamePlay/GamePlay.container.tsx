import GameEngine from 'core/GameEngine'
import GameLogic from 'core/GameLogic'
import Player from 'core/agents/Player'
import type { IAgent, GameState } from 'core/types'
import GamePlay, { Scene } from './GamePlay'
import { OpponentInfo } from 'pages/RoninsGambit/RoninsGambit.container'
import RandomAI from 'core/agents/RandomAI'
import NetworkedAgent from 'core/agents/NetworkedAgent'
import { DataConnection } from 'peerjs'
import GamePlayUI from './GameplayUI'
import { useSDK } from '@thirdweb-dev/react'
import { ethers } from 'ethers'

interface PropTypes {
  opponentInfo: OpponentInfo
  setOpponentInfo: (opponentInfo: OpponentInfo) => void
}
export type GameData = {
  finalizeMsg: JSX.Element;
  playerHealth: number
  opponentHealth: number
}
export type Outcome = 'win' | 'loose' | 'tie'

const gameEngine = new GameEngine(new GameLogic())

const GamePlayContainer = ({ opponentInfo, setOpponentInfo }: PropTypes) => {
  const sdk = useSDK()
  // console.log('%c GamePlayContainer', 'background: #222; color: #bada55');
  const { type, connection, playerId } = opponentInfo
  // const player = new Player(opponentInfo.proxyWallet, sdk)
  let player: Player
  let opponent: IAgent<GameState>
  switch (type) {
    case 'network':
      opponent = new NetworkedAgent(connection as DataConnection)
      player = new Player(opponentInfo.proxyWallet, sdk)
      if (!sdk) {
        console.error('sdk is undefined')
      }
      break
    default:
      opponent = new RandomAI()
      player = new Player(opponentInfo.proxyWallet)
  }
  switch (playerId) {
    case 0:
      gameEngine.startGame([player, opponent])
      break
    case 1:
      gameEngine.startGame([opponent, player])
      break
    default:
      console.error('invalid player id')
  }
  const gameData = {
    finalizeMsg: type=='network'?<div className='text-5xl text-red-600'>Sign on chain to claim your prize!</div>:<></>,
    playerHealth: 5,
    opponentHealth: 5,
  }
  const outcomes: Outcome[] = []
  gameEngine.onStateChange = (newGameState: GameState) => {
    console.log('NEW STATE', { newGameState })
    if (newGameState.step % 2 == playerId) {
      if (playerId == 0 && newGameState.step > 1) {
        const diff = (3 + player.getPrivateState().move - newGameState.B_move) % 3
        if (diff == 1) {
          outcomes.push('win')
          gameData.playerHealth = newGameState.Health[0]
          gameData.opponentHealth = newGameState.Health[1] - 1
        } else if (diff == 2) {
          outcomes.push('loose')
          gameData.playerHealth = newGameState.Health[0] - 1
          gameData.opponentHealth = newGameState.Health[1]
        } else {
          outcomes.push('tie')
        }
      } else if (playerId == 1 && newGameState.step > 2) {
        if (newGameState.Health[1] < gameData.playerHealth) {
          //player lost health
          outcomes.push('loose')
        } else if (newGameState.Health[0] < gameData.opponentHealth) {
          outcomes.push('win')
        } else {
          outcomes.push('tie')
        }
        gameData.playerHealth = newGameState.Health[1]
        gameData.opponentHealth = newGameState.Health[0]
      }
      console.log(outcomes.join(','), gameData)
    }
  }
  const handlePlayerMove = (move: 0 | 1 | 2) => {
    if (player.isPlayersTurn()) {
      player.selectMove(move)
      player.onPlayersMove = undefined
    } else {
      player.onPlayersMove = () => {
        player.selectMove(move)
      }
    }
  }
  const handleOnEnd = () => {
      handlePlayerMove(0)
      setOpponentInfo({
        isReady: false,
        type: 'network',
        connection: undefined,
        playerId: 0,
        proxyWallet: ethers.Wallet.createRandom(),
      })
  }
  return (
    <div className='absolute inset-0 overflow-hidden'>
      <GamePlay outcomes={outcomes} />
      <GamePlayUI
        gameData={gameData}
        handlePlayerMove={handlePlayerMove}
        handleOnEnd={handleOnEnd}
      />
    </div>
  )
}

export default GamePlayContainer

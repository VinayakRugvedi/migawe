import { useEffect, useState } from 'react'

import GameEngine from 'core/GameEngine'
import GameLogic from 'core/GameLogic'
import Player from 'core/agents/Player'
import type { IAgent, GameState } from 'core/types'
import RandomAI from 'core/agents/RandomAI'

import { RONIN_GAMBIT } from 'utils/types'
import GamePlay from './GamePlay'

const PLAYER = new Player()
const AI = new RandomAI()

const { VIDEO_TYPES, ACTION_TYPES, PLAYER_MOVE_TYPES, PLAYER_ROUND_OUTCOME_TYPES } = RONIN_GAMBIT

export interface InternalGameState {
  step: number
  playerHealth: number
  enemyHealth: number
  outcomes: string[]
  hasGameEnded: boolean
  winningPlayerId: string
}

const GamePlayContainer = () => {
  const [matchedEnemy, setMatchedEnemy] = useState<IAgent<GameState>>()
  const [hasGameStarted, setHasGameStarted] = useState(false)
  const [videoType, setVideoType] = useState(VIDEO_TYPES.Idle)
  const [canShowTimer, setCanShowTimer] = useState(false)
  const [action, setAction] = useState({
    type: '',
    isLocked: false,
  })
  // TODO: Fix type
  const [gameState, setGameState] = useState<InternalGameState>({
    step: 0,
    playerHealth: 5,
    enemyHealth: 5,
    outcomes: [],
    hasGameEnded: false,
    winningPlayerId: '',
  })
  const [playerId, setPlayerId] = useState(0)

  useEffect(() => {
    setMatchedEnemy(AI)
    // setCanShowTimer(true)
  }, [])

  useEffect(() => {
    if (matchedEnemy) {
      const gameEngine = new GameEngine(new GameLogic(), handleNewGameState)
      // The value of playerId determines the order in which the agents(players) are passed to the gameEngine.startGame
      playerId === 0
        ? gameEngine.startGame([PLAYER, matchedEnemy])
        : gameEngine.startGame([matchedEnemy, PLAYER])
      setHasGameStarted(true)
      setCanShowTimer(true)
    }
  }, [matchedEnemy])

  useEffect(() => {
    const outcomesLength = gameState.outcomes.length
    if (outcomesLength > 0) {
      setCanShowTimer(false)
      setVideoType(gameState.outcomes[outcomesLength - 1])
    }
  }, [gameState.outcomes])

  const handleNewGameState = (newGameState: GameState) => {
    // TODO: Handle health updates and ending game state
    // Return back if the opponent hasn't made any move yet
    if (newGameState && newGameState.B_move && newGameState.B_move === 3) return
    if (newGameState && newGameState.step === gameState.step) return

    const gameStateCopy = { ...gameState }
    gameStateCopy.step = newGameState.step
    // Check why everytime gameState.outcomes is being an empty array
    const outcomesCopy = [...gameState.outcomes]
    if (playerId == 0 && newGameState.step > 0) {
      const diff = (3 + PLAYER.getPrivateState().move - newGameState.B_move) % 3
      if (diff == 1) {
        outcomesCopy.push(PLAYER_ROUND_OUTCOME_TYPES.Win)
      } else if (diff == 2) {
        outcomesCopy.push(PLAYER_ROUND_OUTCOME_TYPES.Lose)
      } else {
        outcomesCopy.push(PLAYER_ROUND_OUTCOME_TYPES.Tie)
      }
      // console.log(outcomesCopy, 'OUTCOMES COPY LAST')
      gameStateCopy.outcomes = [...outcomesCopy]

      setGameState(gameStateCopy)

      // Health is not actually being updated
      // gameStateCopy.playerHealth = newGameState.Health[0]
      // gameStateCopy.enemyHealth = newGameState.Health[1]
    } else if (playerId == 1 && newGameState.step > 1) {
      // if (newGameState.Health[1] < playerHealth) {
      //   //player lost health
      //   outcomes.push('lose')
      // } else if (newGameState.Health[0] < opponentHealth) {
      //   outcomes.push('win')
      // }
      // playerHealth = newGameState.Health[1]
      // opponentHealth = newGameState.Health[0]
    }
    // console.log('outcomes', outcomes)
  }

  useEffect(() => {
    if (action.isLocked) {
      // send the state to the peer
      const playerMoveValue = PLAYER_MOVE_TYPES[action.type]
      PLAYER.selectMove(playerMoveValue)
    }
  }, [action.isLocked])

  const handleTimerEnd = () => {
    if (!canShowTimer) return

    // choosing a random action
    const actions = [ACTION_TYPES.Attack, ACTION_TYPES.Defend, ACTION_TYPES.Break]
    const actionCopy = {
      type: actions[Math.floor(Math.random() * 3)],
      isLocked: true,
    }
    setCanShowTimer(false)
    setAction(actionCopy)
  }

  const handleVideoEnd = () => {
    setVideoType('idle')
    const actionCopy = {
      type: '',
      isLocked: false,
    }
    setAction(actionCopy)
    setCanShowTimer(true)
  }

  const handleActionSelect = (actionType: string) => {
    if (action.isLocked) return

    const actionCopy = {
      type: actionType,
      isLocked: false,
    }
    setAction(actionCopy)
  }

  const handleActionLock = () => {
    const actionCopy = { ...action }
    actionCopy.isLocked = true
    setCanShowTimer(false)
    setAction(actionCopy)
  }

  return (
    <GamePlay
      setMatchedEnemy={setMatchedEnemy}
      hasGameStarted={hasGameStarted}
      videoType={videoType}
      handleVideoEnd={handleVideoEnd}
      canShowTimer={canShowTimer}
      handleTimerEnd={handleTimerEnd}
      action={action}
      handleActionSelect={handleActionSelect}
      handleActionLock={handleActionLock}
      gameState={gameState}
    />
  )
}

export default GamePlayContainer

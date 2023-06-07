import { useEffect, useState } from 'react'

import GameEngine from 'core/GameEngine'
import GameLogic from 'core/GameLogic'
import Player from 'core/agents/Player'
import type { IAgent, GameState } from 'core/types'

import { RONIN_GAMBIT } from 'utils/types'
import GamePlay from './GamePlay'

const PLAYER = new Player()

const { VIDEO_TYPES, ACTION_TYPES, PLAYER_MOVE_TYPES, PLAYER_ROUND_OUTCOME_TYPES } = RONIN_GAMBIT

export interface InternalGameState {
  step: number
  playerHealth: number
  enemyHealth: number
  outcomes: string[]
  hasGameEnded: boolean
  winningPlayerId: number | null
}

interface PropTypes {
  canPlayWithAi: boolean
  setShowGamePlay: (arg0: boolean) => void
}

const GamePlayContainer = ({ setShowGamePlay, canPlayWithAi }: PropTypes) => {
  const [matchedEnemy, setMatchedEnemy] = useState<IAgent<GameState>>()
  const [hasGameStarted, setHasGameStarted] = useState(false)
  const [canHandleGameEnd, setCanHandleGameEnd] = useState(false)
  const [videoType, setVideoType] = useState(VIDEO_TYPES.Idle)
  const [canShowTimer, setCanShowTimer] = useState(false)
  const [action, setAction] = useState({
    type: '',
    isLocked: false,
  })
  const [gameState, setGameState] = useState<InternalGameState>({
    step: 0,
    playerHealth: 5,
    enemyHealth: 5,
    outcomes: [],
    hasGameEnded: false,
    winningPlayerId: null,
  })
  const [playerId, setPlayerId] = useState(0)

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

  useEffect(() => {
    if (action.isLocked) {
      // send the state to the peer
      const playerMoveValue = PLAYER_MOVE_TYPES[action.type]
      PLAYER.selectMove(playerMoveValue)
    }
  }, [action.isLocked])

  const handleNewGameState = (newGameState: GameState) => {
    // Return back if the opponent hasn't made any move yet
    if (newGameState && newGameState.B_move && newGameState.B_move === 3) return
    if (newGameState && newGameState.step === gameState.step) return

    const gameStateCopy = { ...gameState }
    gameStateCopy.step = newGameState.step
    let playerHealth = newGameState.Health[0]
    let enemyHealth = newGameState.Health[1]
    const outcomesCopy = [...gameStateCopy.outcomes]
    if (playerId == 0 && newGameState.step > 0) {
      const diff = (3 + PLAYER.getPrivateState().move - newGameState.B_move) % 3
      if (diff == 1) {
        outcomesCopy.push(PLAYER_ROUND_OUTCOME_TYPES.Win)
        enemyHealth -= 1
      } else if (diff == 2) {
        outcomesCopy.push(PLAYER_ROUND_OUTCOME_TYPES.Lose)
        playerHealth -= 1
      } else {
        outcomesCopy.push(PLAYER_ROUND_OUTCOME_TYPES.Tie)
      }
      gameStateCopy.playerHealth = playerHealth
      gameStateCopy.enemyHealth = enemyHealth
      gameStateCopy.outcomes = [...outcomesCopy]

      if (gameStateCopy.playerHealth === 0) {
        gameStateCopy.hasGameEnded = true
        gameStateCopy.winningPlayerId = 1
      } else if (gameStateCopy.enemyHealth === 0) {
        gameStateCopy.hasGameEnded = true
        gameStateCopy.winningPlayerId = 0
      }

      setGameState({ ...gameStateCopy })
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
  }

  const handleMatch = (enemy: IAgent<GameState>, id: number) => {
    setPlayerId(id)
    setMatchedEnemy(enemy)
  }

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

  const handleGameEnd = () => {
    if (gameState.hasGameEnded) {
      setCanShowTimer(false)
      setCanHandleGameEnd(true)
    } else {
      setCanShowTimer(true)
    }
  }

  const handleVideoEnd = () => {
    setVideoType('idle')
    const actionCopy = {
      type: '',
      isLocked: false,
    }
    setAction(actionCopy)
    handleGameEnd()
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

  const handleBackToGamePage = () => {
    setShowGamePlay(false)
  }

  return (
    <GamePlay
      handleMatch={handleMatch}
      canPlayWithAi={canPlayWithAi}
      hasGameStarted={hasGameStarted}
      videoType={videoType}
      handleVideoEnd={handleVideoEnd}
      canShowTimer={canShowTimer}
      handleTimerEnd={handleTimerEnd}
      action={action}
      handleActionSelect={handleActionSelect}
      handleActionLock={handleActionLock}
      gameState={gameState}
      canHandleGameEnd={canHandleGameEnd}
      handleBackToGamePage={handleBackToGamePage}
    />
  )
}

export default GamePlayContainer

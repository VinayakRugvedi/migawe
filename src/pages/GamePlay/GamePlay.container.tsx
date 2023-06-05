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

const { VIDEO_TYPES, ACTION_TYPES, PLAYER_MOVE_TYPES } = RONIN_GAMBIT

const GamePlayContainer = () => {
  const [matchedEnemy, setMatchedEnemy] = useState<IAgent<GameState>>()
  const [hasGameStarted, setHasGameStarted] = useState(false)
  const [videoType, setVideoType] = useState(VIDEO_TYPES.Idle)
  const [canShowTimer, setCanShowTimer] = useState(false)
  const [action, setAction] = useState({
    type: '',
    isLocked: false,
  })

  const playerId: 0 | 1 = 0
  let playerHealth = 5
  let opponentHealth = 5
  const outcomes: string[] = []

  useEffect(() => {
    setMatchedEnemy(AI)
    // setCanShowTimer(true)
  }, [])

  useEffect(() => {
    console.log(matchedEnemy, 'MATCHAED ENE<EYY', playerId)
    if (matchedEnemy) {
      const gameEngine = new GameEngine(new GameLogic(), handleNewGameState)
      if (playerId === 0) {
        console.log('starting game, player first')
        gameEngine.startGame([PLAYER, matchedEnemy])
      } else {
        console.log('starting game, enemy first')
        gameEngine.startGame([matchedEnemy, PLAYER])
      }
      setHasGameStarted(true)
      setCanShowTimer(true)
    }
  }, [matchedEnemy])

  function handleNewGameState(newGameState: GameState) {
    console.log('NEW STATE', { newGameState })
    if (playerId == 0 && newGameState.step > 0) {
      const diff = (3 + PLAYER.getPrivateState().move - newGameState.B_move) % 3
      if (diff == 1) {
        outcomes.push('win')
      } else if (diff == 2) {
        outcomes.push('lose')
      }
      playerHealth = newGameState.Health[0]
      opponentHealth = newGameState.Health[1]
    } else if (playerId == 1 && newGameState.step > 1) {
      if (newGameState.Health[1] < playerHealth) {
        //player lost health
        outcomes.push('lose')
      } else if (newGameState.Health[0] < opponentHealth) {
        outcomes.push('win')
      }
      playerHealth = newGameState.Health[1]
      opponentHealth = newGameState.Health[0]
    }
    console.log('outcomes', outcomes)
  }

  useEffect(() => {
    if (action.isLocked) {
      console.log(action, 'ACTION')
      // send the state to the peer
      const playerMoveValue = PLAYER_MOVE_TYPES[action.type]
      console.log('%c player move: ' + playerMoveValue, 'color: blue; font-size: 15px')
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
    />
  )
}

export default GamePlayContainer

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

  useEffect(() => {
    setMatchedEnemy(AI)
    // setCanShowTimer(true)
  }, [])

  useEffect(() => {
    console.log(matchedEnemy, 'MATCHAED ENE<EYY')
    if (matchedEnemy) {
      const gameEngine = new GameEngine(new GameLogic(), handleNewGameState)
      gameEngine.startGame([PLAYER, matchedEnemy])
      setHasGameStarted(true)
      setCanShowTimer(true)
    }
  }, [matchedEnemy])

  function handleNewGameState(newGameState: GameState) {
    console.log(newGameState, 'NEW STATETETTE')
  }

  useEffect(() => {
    if (action.isLocked) {
      console.log(action, 'ACTION')
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
    />
  )
}

export default GamePlayContainer

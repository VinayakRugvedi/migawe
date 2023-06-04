import { useState, useEffect, useRef } from 'react'

import { idleVideo, winVideo, loseVideo, tieVideo } from 'game-play-assets'

import { GiStripedSword, GiVibratingShield, GiSwordBreak } from 'react-icons/gi'

import { Timer } from 'components/base'
import { IntroScreen } from './components'

const VIDEO_TYPES = {
  Idle: 'idle',
  Win: 'win',
  Lose: 'lose',
  Tie: 'tie',
}

const ACTION_TYPES = {
  Attack: 'attack',
  Defend: 'defend',
  Break: 'break',
}

const GamePlay = () => {
  const [videoType, setVideoType] = useState(VIDEO_TYPES.Idle)
  const [hasGameStarted, setHasGameStarted] = useState(false)
  const [canShowTimer, setCanShowTimer] = useState(false)
  const [action, setAction] = useState({
    type: '',
    isLocked: false,
  })
  // let playerHasMadeAMove = false

  const idleVideoRef = useRef<HTMLVideoElement>(null)
  const winVideoRef = useRef<HTMLVideoElement>(null)
  const loseVideoRef = useRef<HTMLVideoElement>(null)
  const tieVideoRef = useRef<HTMLVideoElement>(null)

  // const handlePlayerMove = (move: 0 | 1 | 2) => {
  //   playerHasMadeAMove = true
  //   finalizeMove(move)
  // }
  // const handleVideoEnd = () => {
  // if (playerHasMadeAMove && outcomes.length > lastLength) {
  //   setVideoType(outcomes[0])
  //   playerHasMadeAMove = false
  // } else {
  //   setVideoType('idle')
  // }
  // }

  useEffect(() => {
    setCanShowTimer(true)
  }, [])

  useEffect(() => {
    if (videoType === VIDEO_TYPES.Win) {
      if (winVideoRef && winVideoRef.current) {
        winVideoRef.current.play()
      }
    } else if (videoType === VIDEO_TYPES.Lose) {
      if (loseVideoRef && loseVideoRef.current) {
        loseVideoRef.current.play()
      }
    } else if (videoType === VIDEO_TYPES.Tie) {
      if (tieVideoRef && tieVideoRef.current) {
        tieVideoRef.current.play()
      }
    }
  }, [videoType])

  useEffect(() => {
    if (action.isLocked) {
      // send the state to the peer
      console.log(action, 'ACTION')
    }
  }, [action.isLocked])

  const handleGameStart = () => {
    setHasGameStarted(true)
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

  const videoWidth = window.screen.width
  const videoHeight = window.screen.height
  const isActionChosen = action.type.length > 0 ? true : false
  const isActionLocked = action.isLocked
  const isWaitingForEnemyMove = false

  console.log(isActionLocked, 'ACTIOn LOCKED?', action)

  return (
    <div
      className='w-screen h-screen fixed top-0 left-0 right-0 z-30 bg-black flex flex-col items-center justify-start'
      id='game-play'
    >
      {!hasGameStarted ? <IntroScreen handleGameStart={handleGameStart} /> : null}

      <video
        autoPlay
        ref={idleVideoRef}
        muted
        loop
        width={videoWidth}
        height={videoHeight}
        className={`${videoType !== 'idle' ? 'z-0' : 'z-10'} absolute`}
      >
        <source src={idleVideo} type='video/mp4'></source>
      </video>

      <video
        ref={winVideoRef}
        width={videoWidth}
        height={videoHeight}
        className={`${videoType !== 'win' ? 'z-0' : 'z-10'} absolute`}
        onEnded={handleVideoEnd}
      >
        <source src={winVideo} type='video/mp4'></source>
      </video>

      <video
        ref={loseVideoRef}
        width={videoWidth}
        height={videoHeight}
        className={`${videoType !== 'lose' ? 'z-0' : 'z-10'} absolute`}
        onEnded={handleVideoEnd}
      >
        <source src={loseVideo} type='video/mp4'></source>
      </video>

      <video
        ref={tieVideoRef}
        width={videoWidth}
        height={videoHeight}
        className={`${videoType !== 'tie' ? 'z-0' : 'z-10'} absolute`}
        onEnded={handleVideoEnd}
      >
        <source src={tieVideo} type='video/mp4'></source>
      </video>

      {/* Show Enemy Health */}
      {hasGameStarted ? (
        <div className='absolute z-[30] top-0 font-game py-4 px-8 bg-black/30 text-white font-medium'>
          <div className='my-4 flex items-start justify-between'>
            <h4 className='mr-8'>Ememy&apos;s Health :</h4>
            <div className='flex flex-col items-end'>
              <div className='flex'>
                <div className='bg-white border border-white w-[25px] h-[30px] mr-1'></div>
                <div className='bg-white border border-white w-[25px] h-[30px] mr-1'></div>
                <div className='bg-white border border-white w-[25px] h-[30px] mr-1'></div>
                <div className='bg-white border border-white w-[25px] h-[30px] mr-1'></div>
                <div className='bg-white border border-white w-[25px] h-[30px] mr-1'></div>
              </div>
              <span className='text-sm mt-1'>5 out of 5</span>
            </div>
          </div>
        </div>
      ) : null}

      {/* TODO: Better semantic tags */}
      {hasGameStarted ? (
        <div className='absolute z-[30] bottom-0 font-game py-4 px-8 bg-black/30 text-white font-medium'>
          {isWaitingForEnemyMove ? (
            <div className='flex flex-col items-center justify-center mb-8'>
              <p className='text-xs'>...Waiting for your enemy Samurai...</p>
            </div>
          ) : null}

          {/* Display timer until player locks an action */}
          {canShowTimer ? (
            <div>
              <div className='mb-2'>
                Lock your next move in&nbsp;
                <Timer durationInSeconds={20} handleTimerEnd={handleTimerEnd} />
                &nbsp;seconds
              </div>
              <div
                className={`${isActionChosen && !isActionLocked ? '' : 'invisible'} text-center`}
              >
                <button
                  className='p-4 bg-white text-black uppercase hover:text-primary-focus'
                  onClick={handleActionLock}
                >
                  Lock {action.type}
                </button>
              </div>
            </div>
          ) : null}

          <h4 className='mb-4 text-center'>
            {isActionChosen && isActionLocked ? (
              <>
                You have chosen to{' '}
                <span className='uppercase text-primary-focus bg-white p-1'>{action.type}</span>
              </>
            ) : null}
          </h4>

          <div className='mb-8 flex items-start justify-between'>
            <h4>Health :</h4>
            <div className='flex flex-col items-end'>
              <div className='flex'>
                <div className='bg-white border border-white w-[25px] h-[30px] mr-1'></div>
                <div className='bg-white border border-white w-[25px] h-[30px] mr-1'></div>
                <div className='bg-white border border-white w-[25px] h-[30px] mr-1'></div>
                <div className='bg-white border border-white w-[25px] h-[30px] mr-1'></div>
                <div className='bg-white border border-white w-[25px] h-[30px] mr-1'></div>
              </div>
              <span className='text-sm mt-1'>5 out of 5</span>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div
              className={`w-32 h-32 flex flex-col items-center justify-center border-2 rounded-full mr-12 ${
                action.type === ACTION_TYPES.Attack
                  ? 'bg-white text-black'
                  : isActionLocked
                  ? ''
                  : 'hover:text-primary-focus hover:border-primary-focus hover:cursor-pointer'
              }`}
              role='button'
              onClick={() => handleActionSelect(ACTION_TYPES.Attack)}
              // onClick={() => handlePlayerMove(0)}
            >
              <div className='p-2 text-4xl'>
                <GiStripedSword />
              </div>
              <p className='font-bold'>ATTACK</p>
            </div>

            <div
              className={`w-32 h-32 flex flex-col items-center justify-center border-2 rounded-full mr-12 ${
                action.type === ACTION_TYPES.Defend
                  ? 'bg-white text-black'
                  : isActionLocked
                  ? ''
                  : 'hover:text-primary-focus hover:border-primary-focus hover:cursor-pointer'
              }`}
              onClick={() => handleActionSelect(ACTION_TYPES.Defend)}
            >
              <div className='p-2 text-4xl'>
                <GiVibratingShield />
              </div>
              <p className='font-bold'>DEFEND</p>
            </div>

            <div
              className={`w-32 h-32 flex flex-col items-center justify-center border-2 rounded-full ${
                action.type === ACTION_TYPES.Break
                  ? 'bg-white text-black'
                  : isActionLocked
                  ? ''
                  : 'hover:text-primary-focus hover:border-primary-focus hover:cursor-pointer'
              }`}
              onClick={() => handleActionSelect(ACTION_TYPES.Break)}
            >
              <div className='p-2 text-4xl'>
                <GiSwordBreak />
              </div>
              <p className='font-bold'>BREAK</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default GamePlay

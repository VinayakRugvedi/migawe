import { useState, useEffect, useRef } from 'react'

import { idleVideo, winVideo, loseVideo, tieVideo } from 'game-play-assets'

import { GiStripedSword, GiVibratingShield, GiSwordBreak } from 'react-icons/gi'

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
  const [actionType, setActionType] = useState('')

  const idleVideoRef = useRef<HTMLVideoElement>(null)
  const winVideoRef = useRef<HTMLVideoElement>(null)
  const loseVideoRef = useRef<HTMLVideoElement>(null)
  const tieVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoType === 'win') {
      if (winVideoRef && winVideoRef.current) {
        winVideoRef.current.play()
      }
    } else if (videoType === 'lose') {
      if (loseVideoRef && loseVideoRef.current) {
        loseVideoRef.current.play()
      }
    } else if (videoType === 'tie') {
      if (tieVideoRef && tieVideoRef.current) {
        tieVideoRef.current.play()
      }
    }
  }, [videoType])

  const handleGameStart = () => {
    setHasGameStarted(true)
  }

  const handleActionSelect = (actionType: string) => {
    setActionType(actionType)
  }

  const handleVideoEnd = () => {
    setVideoType('idle')
    setActionType('')
  }

  const videoWidth = window.screen.width
  const videoHeight = window.screen.height
  const isActionChosen = actionType.length > 0 ? true : false
  const isWaitingForEnemyMove = false

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

      {/* TODO: Better semantic tags */}
      {hasGameStarted ? (
        <div className='absolute z-[30] bottom-0 font-game py-4 px-8 bg-black/30 text-white font-medium'>
          {isWaitingForEnemyMove ? (
            <div className='flex flex-col items-center justify-center mb-8'>
              <progress className='progress w-56 text-black bg-white after:bg-black'></progress>
              <p className='text-xs'>Waiting for your enemy samurai</p>
            </div>
          ) : null}

          <h4 className='mb-4 text-center'>
            {isActionChosen ? (
              <>
                You have chosen to{' '}
                <span className='uppercase text-primary-focus bg-white p-1'>{actionType}</span>
              </>
            ) : (
              'Choose your next move'
            )}
          </h4>
          <div className='mb-8 flex items-start justify-between'>
            <h4>Health Indicator :</h4>
            <div className='flex flex-col items-end'>
              <div className='flex'>
                <div className='bg-black border border-white w-[25px] h-[30px] mr-1'></div>
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
                actionType === ACTION_TYPES.Attack
                  ? 'bg-white text-black'
                  : 'hover:text-primary-focus hover:border-primary-focus hover:cursor-pointer'
              }`}
              role='button'
              onClick={() => handleActionSelect(ACTION_TYPES.Attack)}
            >
              <div className='p-2 text-4xl'>
                <GiStripedSword />
              </div>
              <p className='font-bold'>ATTACK</p>
            </div>

            <div
              className={`w-32 h-32 flex flex-col items-center justify-center border-2 rounded-full mr-12 ${
                actionType === ACTION_TYPES.Defend
                  ? 'bg-white text-black'
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
                actionType === ACTION_TYPES.Break
                  ? 'bg-white text-black'
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

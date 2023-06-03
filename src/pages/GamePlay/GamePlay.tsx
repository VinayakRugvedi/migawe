import { useState, useEffect, useRef } from 'react'

import { idleVideo, winVideo, loseVideo, tieVideo } from 'game-play-assets'

import { GiStripedSword, GiVibratingShield, GiSwordBreak } from 'react-icons/gi'

import { IntroScreen } from './components'

interface GamePlayProps {
  playerHealth: number
  opponentHealth: number
  outcome: 'win' | 'lose' | 'tie'
  finalizeMove: (move: 0 | 1 | 2) => void
}

const GamePlay = ({ playerHealth, opponentHealth, outcome, finalizeMove }: GamePlayProps) => {
  let playerHasMadeAMove = false
  const [videoType, setVideoType] = useState('idle')
  const [hasGameStarted, setHasGameStarted] = useState(false)

  const idleVideoRef = useRef<HTMLVideoElement>(null)
  const winVideoRef = useRef<HTMLVideoElement>(null)
  const loseVideoRef = useRef<HTMLVideoElement>(null)
  const tieVideoRef = useRef<HTMLVideoElement>(null)

  const videoWidth = window.screen.width
  const videoHeight = window.screen.height

  const handlePlayerMove = (move: 0 | 1 | 2) => {
    playerHasMadeAMove = true
    finalizeMove(move)
  }
  const handleVideoEnd = () => {
    if (playerHasMadeAMove) {
      setVideoType(outcome)
      playerHasMadeAMove = false
    } else {
      setVideoType('idle')
    }
  }

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
          <h4 className='mb-4 text-center'>Choose your next move.</h4>
          <div className='mb-8 text-center'>Health Indicator</div>
          <div className='flex items-center justify-between'>
            <div
              className='w-32 h-32 flex flex-col items-center justify-center border-2 rounded-full mr-12 hover:text-primary-focus hover:border-primary-focus hover:cursor-pointer'
              role='button'
              onClick={() => handlePlayerMove(0)}
            >
              <div className='p-2 text-4xl'>
                <GiStripedSword />
              </div>
              <p className='font-bold'>ATTACK</p>
            </div>

            <div
              className='w-32 h-32 flex flex-col items-center justify-center border-2 rounded-full mr-12 hover:text-primary-focus hover:border-primary-focus hover:cursor-pointer bg-white text-black'
              role='button'
              onClick={() => handlePlayerMove(1)}
            >
              <div className='p-2 text-4xl'>
                <GiVibratingShield />
              </div>
              <p className='font-bold'>DEFEND</p>
            </div>

            <div
              className='w-32 h-32 flex flex-col items-center justify-center border-2 rounded-full hover:text-primary-focus hover:border-primary-focus hover:cursor-pointer'
              role='button'
              onClick={() => handlePlayerMove(2)}
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

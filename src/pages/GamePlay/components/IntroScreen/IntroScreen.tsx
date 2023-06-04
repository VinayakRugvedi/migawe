import { introSequenceImage } from 'game-play-assets'

import { Timer } from 'components/base'
import styles from './IntroScreen.module.css'

interface PropTypes {
  isMatchMaking: boolean
  handleTimerEnd: () => void
  canRetry: boolean
  handleRetry: () => void
}

const IntroScreen = ({ isMatchMaking, handleTimerEnd, canRetry, handleRetry }: PropTypes) => {
  return (
    <div className='absolute w-screen h-screen top-0 left-0 z-30 font-game  bg-black flex flex-col items-center'>
      <h3 className='text-6xl mt-16 text-white text-center'>The Ronins Gambit</h3>

      <img
        src={introSequenceImage}
        alt='Intro Sequence Image'
        className={`${styles.introSequenceImage} relative bottom-24`}
      />

      <div className='absolute bottom-[8%] p-4'>
        {isMatchMaking ? (
          <div className='text-white'>
            Trying to find a Samurai in{' '}
            {<Timer durationInSeconds={10} handleTimerEnd={handleTimerEnd} />} seconds.
          </div>
        ) : (
          <div>
            {canRetry ? (
              <div className='flex flex-col items-center'>
                <p className='text-white mb-4'>Oops, could not find a Samurai.</p>
                <button
                  className={`p-4 bg-white text-black ${styles.button} uppercase hover:text-primary-focus justify-center`}
                  onClick={handleRetry}
                >
                  Retry
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

export default IntroScreen

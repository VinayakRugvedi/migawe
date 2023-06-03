import { introSequenceImage } from 'game-play-assets'

import styles from './IntroScreen.module.css'

interface PropTypes {
  handleGameStart: () => void
}

const IntroScreen = ({ handleGameStart }: PropTypes) => {
  return (
    <div className='absolute w-screen h-screen top-0 left-0 z-30 bg-black flex flex-col items-center'>
      <h3 className='text-6xl font-game mt-16 text-white text-center'>The Ronins Gambit</h3>

      <img
        src={introSequenceImage}
        alt='Intro Sequence Image'
        className={`${styles.introSequenceImage} relative bottom-24`}
      />

      <button
        className={`uppercase font-2xl font-game absolute bottom-[10%] p-4 bg-white text-black ${styles.startGameButton} hover:text-primary-focus`}
        onClick={handleGameStart}
      >
        Start Game
      </button>
    </div>
  )
}

export default IntroScreen

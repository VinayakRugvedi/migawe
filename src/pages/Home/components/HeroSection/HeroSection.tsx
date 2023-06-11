import { Link } from 'react-router-dom'

import { heroSectionPrimaryIllustartion, heroSectionSecondaryIllustartion } from 'assets'
import styles from './HeroSection.module.css'

const HeroSection = () => {
  return (
    <section className='pt-[95px] md:pt-[120px] w-screen min-h-screen relative px-8'>
      <div className='mx-auto max-w-screen-2xl'>
        <h3 className='text-5xl md:text-9xl font-bold text-center'>The Ronin&apos;s Gambit</h3>
        <p className='font-bold text-center'>
          Presenting <span className='italic'>MIGAWE&apos;s</span> First Game
        </p>
        <h4 className='text-xl md:text-4xl font-medium mt-8 md:mt-16 max-w-2xl'>
          Play this simple, elegant and rewarding combat game inspired by the classic rock paper
          scissors.
        </h4>

        <div className='mt-8 flex flex-col items-center md:items-start'>
          <div className='grid grid-cols-1 md:grid-cols-2 auto-rows-auto mb-8 gap-8'>
            <div className='card w-full md:w-96 bg-base-100 shadow-xl bg-primary/20'>
              <div className='card-body'>
                <h2 className='card-title'>Setup Reward and Win</h2>
                <p>
                  For every game, setup the value of the reward pool which will be shared by the
                  players. Winner takes all minus 20%.
                </p>
                <Link className='btn btn-sm mt-2 btn-primary' to='ronins-gambit'>
                  Take me to the game
                </Link>
              </div>
            </div>

            <div className='card w-full md:w-96 bg-base-100 shadow-xl bg-neutral/20'>
              <div className='card-body'>
                <div className='flex justify-between items-center flex-wrap'>
                  <h2 className='card-title'>Branded Game</h2>
                  <div className='badge'>coming soon</div>
                </div>
                <p>
                  Play the game in the branded environment and earn rewards/digital-assets like NFTs
                  from the brands which can be redeemed later.
                </p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 auto-rows-auto gap-8'>
            <div className='card w-full md:w-96 bg-base-100 shadow-xl bg-neutral/20'>
              <div className='card-body'>
                <div className='flex justify-between items-center flex-wrap'>
                  <h2 className='card-title'>Plug and Play</h2>
                  <div className='badge'>coming soon</div>
                </div>
                <p>
                  Are you a dApp looking to improve engagement? Simple plug and play this game into
                  your dapp just like any other component and easily configure the flow and reward
                  system.
                </p>
              </div>
            </div>

            <div className='card w-full md:w-96 bg-base-100 shadow-xl bg-neutral/20'>
              <div className='card-body'>
                <div className='flex justify-between items-center flex-wrap'>
                  <h2 className='card-title'>Migawe&apos;s Ecosystem</h2>
                  <div className='badge'>coming soon</div>
                </div>
                <p>
                  No matter if you are a brand or a gaming studio, you can easily leverage
                  Migawe&apos;s infratructure and system models to publish your game and let others
                  consume it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        src={heroSectionPrimaryIllustartion}
        className={`${styles['slide-in-from-bottom-right']} absolute top-0 right-0 mix-blend-soft-light 2xl:mix-blend-color-burn `}
      />

      <img
        src={heroSectionSecondaryIllustartion}
        className={`${styles['slide-in-from-top-left']} absolute left-40 top-20 mix-blend-overlay hidden 2xl:block`}
      />
    </section>
  )
}

export default HeroSection

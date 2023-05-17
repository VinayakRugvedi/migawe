import { heroSectionPrimaryIllustartion, heroSectionSecondaryIllustartion } from 'assets'
import styles from './HeroSection.module.css'

const HeroSection = () => {
  return (
    <section className='pt-[115px] w-screen h-screen relative'>
      <div className='mx-auto max-w-screen-2xl'>
        <h3 className='text-9xl font-bold text-center'>The Ronin&apos;s Gambit</h3>
        <p className='font-bold text-center'>
          Presenting <span className='italic'>MIGAWE&apos;s</span> First Game
        </p>
        <h4 className='text-4xl font-medium mt-16 max-w-2xl'>
          Play this simple, elegant and rewarding combat game inspired by the classic rock paper
          scissors.
        </h4>

        <div className='mt-8 flex flex-col items-start'>
          <div className='grid grid-cols-2 auto-rows-auto mb-8'>
            <div className='card w-96 bg-base-100 shadow-xl bg-primary/20 mr-8'>
              <div className='card-body'>
                <h2 className='card-title'>Setup Reward and Win</h2>
                <p>
                  For every game, setup the value of the reward pool which will be shared by the
                  players. Winner takes all minus 20%.
                </p>
              </div>
            </div>

            <div className='card w-96 bg-base-100 shadow-xl bg-primary/20'>
              <div className='card-body'>
                <h2 className='card-title'>Branded Game</h2>
                <p>
                  Play the game in the branded environment and earn rewards/digital-assets like NFTs
                  from the brands which can be redeemed later.
                </p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 auto-rows-auto'>
            <div className='card w-96 bg-base-100 shadow-xl bg-neutral/20 mr-8'>
              <div className='card-body'>
                <div className='flex justify-between items-center'>
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

            <div className='card w-96 bg-base-100 shadow-xl bg-neutral/20'>
              <div className='card-body'>
                <div className='flex justify-between items-center'>
                  <h2 className='card-title'>Migawe&apos;s Ecosystem</h2>
                  <div className='badge'>coming soon</div>
                </div>
                <p>
                  No matter if you are a brand or a gaming studio, you can easily leverage
                  Migawe&apos;s infrastructure and thoughts to publish your game.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        src={heroSectionPrimaryIllustartion}
        className={`${styles['slide-in-from-bottom-right']} absolute top-0 right-0 mix-blend-color-burn`}
      />

      <img
        src={heroSectionSecondaryIllustartion}
        className={`${styles['slide-in-from-top-left']} absolute left-40 top-20 mix-blend-overlay`}
      />
    </section>
  )
}

export default HeroSection

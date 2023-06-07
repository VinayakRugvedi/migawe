import { GiBroadsword, GiPlayButton } from 'react-icons/gi'
import { gameTitleIllustration } from 'assets'

import { ActionsModal } from './components'

interface PropTypes {
  showModal: boolean
  handleOnOpen: () => void
  handleOnClose: () => void
  handleGameStart: () => void
  handleGameStartWithAi: () => void
}

const RoninsGambit = ({
  showModal,
  handleOnOpen,
  handleOnClose,
  handleGameStart,
  handleGameStartWithAi,
}: PropTypes) => {
  return (
    <main className='mt-[120px] py-4 mx-auto max-w-7xl mb-8'>
      <section className='mb-8 grid grid-cols-2'>
        <div className='px-4'>
          <div className='italic'>
            <span className='font-medium'>MIGAWE</span> Presents,
          </div>
          <h3 className='text-5xl font-medium'>The Ronin&apos;s Gambit</h3>

          <div className='text-xl mt-8'>
            This is a combat game inspired by the classic rock paper scissors.
            <br />
            You are the chosen samurai and your job is to defeat the enemy samurai in order to save
            your squad.
          </div>

          <div className='mt-8 text-xl'>
            Every fight is a round and you win the battle if you{' '}
            <span className='text-primary font-medium'>win 5 rounds</span>.
            <div className='text-xl'>
              You and your enemy are allowed to execute one of the{' '}
              <span className='text-secondary font-medium'>3 actions</span> namely:{' '}
              <span className='text-secondary font-medium'>Attack, Defend, and Break</span>
            </div>
          </div>

          <div className='card w-96 bg-primary/20 shadow-xl mt-4'>
            <div className='card-body'>
              <h2 className='card-title'>Rule Book</h2>
              <div className='grid grid-cols-3 gap-2'>
                <div className='card p-1 bg-primary/20'>
                  <div className='flex flex-col items-center'>
                    <div className='uppercase text-secondary font-bold'>Attack</div>
                    <span>wins</span>
                    <div className='uppercase text-secondary font-bold'>Break</div>
                  </div>
                </div>
                <div className='card p-1 bg-primary/20'>
                  <div className='flex flex-col items-center'>
                    <div className='uppercase text-secondary font-bold'>Defend</div>
                    <span>wins</span>
                    <div className='uppercase text-secondary font-bold'>Attack</div>
                  </div>
                </div>
                <div className='card p-1 bg-primary/20'>
                  <div className='flex flex-col items-center'>
                    <div className='uppercase text-secondary font-bold'>Break</div>
                    <span>wins</span>
                    <div className='uppercase text-secondary font-bold'>Defend</div>
                  </div>
                </div>
              </div>
              <div className='card p-1 bg-primary/20 text-center uppercase font-medium'>
                Rest results in a tie
              </div>
            </div>
          </div>

          <div className='mt-8 mb-8'>
            <button className='btn btn-wide mr-4' onClick={handleOnOpen}>
              Play Now
            </button>
            <button className='btn btn-outline' onClick={handleGameStartWithAi}>
              Play with CPU
            </button>
          </div>

          <div className='divider'></div>

          <div className='mt-8'>
            <h4 className='text-2xl font-medium'>Getting Started</h4>

            <div className='flex items-center mt-8'>
              <div className='card w-96 bg-base-100 shadow-xl bg-neutral/20'>
                <div className='card-body'>
                  <div className='flex justify-between items-center'>
                    <h2 className='card-title'>Step 1: Top-up Pool</h2>
                  </div>
                  <div>
                    As a starter, you will be asked to transfer a minimum of 1USDT into our top-up
                    pool. Consider this as a security deposit. Futhermore, this top-up pool will be
                    used to setup the reward pool of every game.
                  </div>
                </div>
              </div>
              <div className='ml-4 tooltip' data-tip="Let's add some top-up">
                <button className='btn btn-circle btn-primary text-xl' onClick={handleOnOpen}>
                  <GiBroadsword />
                </button>
              </div>
            </div>

            <div className='flex items-center mt-8'>
              <div className='card w-96 bg-base-100 shadow-xl bg-neutral/20'>
                <div className='card-body'>
                  <div className='flex justify-between items-center'>
                    <h2 className='card-title'>Step 2: Reward Pool</h2>
                  </div>
                  <div>
                    Every time you start a game, you have to transfer 0.2USDT into the reward pool
                    (from top-up pool) which will set the reward pool&apos;s total value to 0.4USDT.
                  </div>
                </div>
              </div>

              <div className='ml-4 tooltip' data-tip="Let's play">
                <button className='btn btn-circle btn-primary text-xl pl-1' onClick={handleOnOpen}>
                  <GiPlayButton />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='px-4 place-self-end'>
          <img
            src={gameTitleIllustration}
            alt='Game_Title_Image'
            className='rounded-2xl mix-blend-multiply'
          />
        </div>
      </section>

      <ActionsModal
        showModal={showModal}
        handleOnClose={handleOnClose}
        handleGameStart={handleGameStart}
      />
    </main>
  )
}

export default RoninsGambit

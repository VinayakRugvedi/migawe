import { GiBroadsword, GiPlayButton } from 'react-icons/gi'
import { gameTitleIllustration } from 'assets'

const RoninsGambit = () => {
  return (
    <main className='mt-[120px] py-4 mx-auto max-w-7xl mb-8'>
      <section className='mb-8 grid grid-cols-2'>
        <div className='px-4'>
          <p className='italic'>
            <span className='font-medium'>MIGAWE</span> Presents,
          </p>
          <h3 className='text-5xl font-medium'>The Ronin&apos;s Gambit</h3>

          <p className='text-xl mt-8'>
            This is a combat game inspired by the classic rock paper scissors.
            <br />
            You are the chosen samurai and your job is to defeat the enemy samurai in order to save
            your squad.
          </p>

          <p className='mt-8 text-xl'>
            Every fight is a round and you win the battle if you{' '}
            <span className='text-primary font-medium'>win 5 rounds</span>.
            <p className='text-xl'>
              You and your enemy are allowed to execute one of the{' '}
              <span className='text-secondary font-medium'>3 actions</span> namely:{' '}
              <span className='text-secondary font-medium'>Attack, Defend, and Break</span>
            </p>
          </p>

          <div className='card w-96 bg-primary/20 shadow-xl mt-4'>
            <div className='card-body'>
              <h2 className='card-title'>Rule Book</h2>
              <p>Attack wins over Defend</p>
              <p>Defend wins over Break</p>
              <p>Break wins over Attack</p>
              <p>Rest results in a tie</p>
            </div>
          </div>

          <div className='mt-8 mb-8'>
            <button className='btn btn-wide'>Get Started</button>
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
                  <p>
                    As a starter, you will be asked to transfer a minimum of 1USDT into our top-up
                    pool. Consider this as a security deposit. Futhermore, this top-up pool will be
                    used to setup the reward pool of every game.
                  </p>
                </div>
              </div>
              <div className='ml-4 tooltip' data-tip="Let's add some top-up">
                <button className='btn btn-circle btn-primary text-xl'>
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
                  <p>
                    Every time you start a game, you have to transfer 0.2USDT into the reward pool
                    (from top-up pool) which will set the reward pool&apos;s total value to 0.4USDT.
                  </p>
                </div>
              </div>

              <div className='ml-4 tooltip' data-tip="Let's play">
                <button className='btn btn-circle btn-primary text-xl pl-1'>
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
    </main>
  )
}

export default RoninsGambit

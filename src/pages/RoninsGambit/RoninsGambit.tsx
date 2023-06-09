import { GiBroadsword, GiPlayButton } from 'react-icons/gi'
import { gameTitleIllustration, gameRules } from 'assets'

import { ActionsModal, LeaderBoard } from './components'
import { MatchMakerResponse } from './components/ActionsModal/MatchMaker'
import { OpponentInfo } from './RoninsGambit.container'
import { ethers } from 'ethers'
import { UI } from 'utils/constants'

interface PropTypes {
  showModal: boolean
  handleOnOpen: () => void
  handleOnClose: () => void
  setOpponentInfo: React.Dispatch<OpponentInfo>
}

const RoninsGambit = ({ showModal, handleOnOpen, handleOnClose, setOpponentInfo }: PropTypes) => {
  const handlePlayRandomAI = () => {
    setOpponentInfo({
      isReady: true,
      type: 'cpu',
      connection: undefined,
      playerId: 0,
      proxyWallet: ethers.Wallet.createRandom(),
    })
  }
  const handleOnConnection = (response: MatchMakerResponse) => {
    setOpponentInfo({
      isReady: true,
      type: 'network',
      connection: response.conn,
      playerId: response.playerId,
      proxyWallet: response.proxyWallet,
    })
  }
  return (
    <main className='overflow-x-hidden mt-[90px] md:mt-[120px] py-4 mx-auto max-w-7xl mb-16'>
      <section className='mb-8 grid grid-cols-1 xl:grid-cols-2 gap-12'>
        <div className='px-8'>
          <div className='italic'>
            <span className='font-medium'>MIGAWE</span> Presents,
          </div>
          <div>
            <h3 className='text-4xl md:text-5xl font-medium'>The Ronin&apos;s Gambit</h3>
            <span className='badge mr-2 badge-secondary font-medium'>on chain</span>
            <span className='badge badge-secondary font-medium'>p2p</span>
          </div>

          <div className='text-md md:text-xl mt-8'>
            Prepare for an epic duel as you embrace the path of the samurai, and delve into the
            world of ancient combat.
            <br />
            Select wisely from <span className='italic'>three distinct fighting styles</span>, each
            embodying unique strengths and weaknesses, forging your destiny in the realm of
            warriors.
            <br />
            Step into this world of fully <strong>on-chain gaming</strong>, where your legacy will
            transcend time, eternally woven into the tapestry of digital existence.
          </div>

          <div className='mt-8 text-md md:text-xl'>
            The duel ends when one legend dies.
            <div className='text-md md:text-xl'>
              You and the enemy are allowed to execute one of the&nbsp;
              <span className='text-primary font-medium'>3 sword techniques</span> namely:{' '}
              <span className='text-primary font-medium'>Tiger, Turtle, and Eagle</span>
            </div>
          </div>

          <div className='mt-8 mb-8 flex gap-4'>
            <button className='btn md:btn-wide' onClick={handleOnOpen}>
              Play Now
            </button>
            <button className='btn btn-outline' onClick={handlePlayRandomAI}>
              Play Against CPU
            </button>
          </div>

          <div className='card md:w-96 bg-primary/20 shadow-xl mt-4'>
            <div className='card-body'>
              <h2 className='card-title'>Rules</h2>
              <img src={gameRules} alt='Game_Title_Image' className='rounded-2xl' />
              <div className='card p-1 bg-primary/20 text-center uppercase font-medium'>
                Rest results in a tie
              </div>
            </div>
          </div>

          <div className='divider mt-12'></div>

          <div className='mt-8'>
            <h4 className='text-2xl font-medium'>Getting Started</h4>

            <div className='flex flex-col md:flex-row items-center mt-8'>
              <div className='card w-full md:w-96 bg-base-100 shadow-xl bg-neutral/20 mb-6 md:mb-0'>
                <div className='card-body'>
                  <div className='flex justify-between items-center'>
                    <h2 className='card-title'>Step 1: Top-up Game Wallet</h2>
                  </div>
                  <div>
                    As a starter, you will need a minimum deposit of 10 {UI.tokenName} in your game
                    wallet. You can withdraw it anytime you want.
                    <br />
                    Futhermore, your reward will be added to your game wallet each time you win.
                  </div>
                </div>
              </div>
              <div
                className='ml-4 tooltip tooltip-bottom md:tooltip-top'
                data-tip="Let's add some top-up"
              >
                <button className='btn btn-circle btn-primary text-xl' onClick={handleOnOpen}>
                  <GiBroadsword />
                </button>
              </div>
            </div>

            <div className='flex flex-col md:flex-row items-center mt-8'>
              <div className='card w-full md:w-96 bg-base-100 shadow-xl bg-neutral/20 mb-6 md:mb-0'>
                <div className='card-body'>
                  <div className='flex justify-between items-center'>
                    <h2 className='card-title'>Step 2: Reward Pool</h2>
                  </div>
                  <div>
                    Every time you start a game, It will cost you 1 {UI.tokenName} to play. The
                    amount collected will be added to the reward pool for the winners to claim.
                  </div>
                </div>
              </div>

              <div className='ml-4 tooltip tooltip-bottom md:tooltip-top' data-tip="Let's play">
                <button className='btn btn-circle btn-primary text-xl pl-1' onClick={handleOnOpen}>
                  <GiPlayButton />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='px-8'>
          <img
            src={gameTitleIllustration}
            alt='Game_Title_Image'
            className='rounded-2xl mix-blend-multiply'
          />
          <LeaderBoard />
        </div>
      </section>

      <ActionsModal
        showModal={showModal}
        handleOnClose={handleOnClose}
        handleOnConnection={handleOnConnection}
      />
    </main>
  )
}

export default RoninsGambit

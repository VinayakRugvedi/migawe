import { GiWallet, GiPiggyBank, GiPlayButton } from 'react-icons/gi'

import { Modal } from 'components/base'
import { ThirdWebConnectWalletButton } from 'components/ui'

interface PropTypes {
  showModal: boolean
  handleOnClose: () => void
  isWalletConnected: boolean
  userBalance: number
  minimumBalanceToPlay: number
  needToPay: number
  tokenName: string
  handleTopup: () => void
  handleGameStart: () => void
}

const ActionsModal = ({
  showModal,
  handleOnClose,
  isWalletConnected,
  userBalance,
  minimumBalanceToPlay,
  tokenName,
  needToPay,
  handleTopup,
  handleGameStart,
}: PropTypes) => {
  const userHasEnoughBalance = userBalance && userBalance >= minimumBalanceToPlay ? true : false

  let modalContent = null

  if (!isWalletConnected) {
    modalContent = (
      <div className='flex items-center justify-center flex-col py-2'>
        <h4 className='text-lg font-bold mt-2 self-start'>Connect Your Wallet</h4>
        <div className='text-7xl my-2'>
          <GiWallet />
        </div>
        <p className='text-center mb-4 px-4'>
          As a starter, please connect your wallet by clicking the button below.
        </p>
        <ThirdWebConnectWalletButton />
      </div>
    )
  }

  // When wallet is connected -> fetch the Game Wallet balance and if its below threshold, show this
  if (isWalletConnected) {
    if (userHasEnoughBalance) {
      modalContent = (
        <div className='flex items-center justify-center flex-col py-2'>
          <h4 className='text-lg font-bold mt-2 self-start'>Start Playing</h4>
          <div className='text-7xl my-2'>
            <GiPlayButton />
          </div>
          <p className='text-center mb-4 px-4'>
            You are all set! Click on the button below to start playing. <br />
            You will be charged{' '}
            <span className='font-medium'>
              {minimumBalanceToPlay} {tokenName}
            </span>
            &nbsp; to setup the reward pool.
          </p>
          <button className='btn' onClick={handleGameStart}>
            Play Now
          </button>
        </div>
      )
    } else {
      modalContent = (
        <div className='flex items-center justify-center flex-col py-2'>
          <h4 className='text-lg font-bold mt-2 self-start'>Top-up your Game Wallet</h4>
          <div className='text-7xl my-2'>
            <GiPiggyBank />
          </div>
          <p className='text-center mb-4 px-4'>
            Please top-up your game wallet.
            <br />
            You game wallet should have a minimum balance of{' '}
            <span className='font-medium'>
              {minimumBalanceToPlay} {tokenName}
            </span>
            &nbsp;to start playing games.
            <br />
            Your current balance is{' '}
            <span className='font-medium'>
              {userBalance} {tokenName}
            </span>
            &nbsp;and you need{' '}
            <span className='font-medium'>
              {needToPay} {tokenName}
            </span>{' '}
            more.
          </p>
          <button onClick={handleTopup} className='btn'>
            Add {needToPay} {tokenName}
          </button>
        </div>
      )
    }
  }

  return (
    <Modal isOpen={showModal} handleOnClose={handleOnClose}>
      {modalContent}
    </Modal>
  )
}

export default ActionsModal

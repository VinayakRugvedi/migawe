import { GiWallet, GiPiggyBank } from 'react-icons/gi'

import { Modal } from 'components/base'
import { ThirdWebConnectWalletButton } from 'components/ui'

interface PropTypes {
  showModal: boolean
  handleOnClose: () => void
  isWalletConnected: boolean
}

const ActionsModal = ({ showModal, handleOnClose, isWalletConnected }: PropTypes) => {
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
    modalContent = (
      <div className='flex items-center justify-center flex-col py-2'>
        <h4 className='text-lg font-bold mt-2 self-start'>Top-up your Game Wallet</h4>
        <div className='text-7xl my-2'>
          <GiPiggyBank />
        </div>
        <p className='text-center mb-4 px-4'>
          Please top-up your game wallet. You game wallet should have a minimum balance of 1 USDT to
          start playing games having reward pools.
        </p>
        <button className='btn'>Top-up</button>
      </div>
    )
  }

  return (
    <Modal isOpen={showModal} handleOnClose={handleOnClose}>
      {modalContent}
    </Modal>
  )
}

export default ActionsModal

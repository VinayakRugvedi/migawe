import { GiWallet } from 'react-icons/gi'

import { Modal } from 'components/base'
import { ActionsContent } from './components'

interface PropTypes {
  isWalletConnected: boolean
  showModal: boolean
  handleModalOpen: () => void
  handleModalClose: () => void
}

const GameWallet = ({
  isWalletConnected,
  showModal,
  handleModalOpen,
  handleModalClose,
}: PropTypes) => {
  return (
    <>
      <button
        className={`btn btn-ghost flex flex-col items-center justify-center ${
          !isWalletConnected ? 'tooltip tooltip-bottom' : ''
        }`}
        data-tip='Connect your wallet to access'
        onClick={handleModalOpen}
      >
        <span className='text-2xl'>
          <GiWallet />
        </span>
        <h6 className='text-xs uppercase'>Game Wallet</h6>
      </button>

      <Modal
        isOpen={showModal}
        handleOnClose={handleModalClose}
        rootClassNames='absolute w-screen h-screen'
      >
        {showModal ? <ActionsContent handleModalClose={handleModalClose} /> : null}
      </Modal>
    </>
  )
}

export default GameWallet

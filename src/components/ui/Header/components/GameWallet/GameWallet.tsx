import { GiWallet } from 'react-icons/gi'

import { Modal } from 'components/base'
import { ActionsContent } from './components'

interface PropTypes {
  isNetworkMismatched: boolean
  isWalletConnected: boolean
  showModal: boolean
  handleModalOpen: () => void
  handleModalClose: () => void
}

const GameWallet = ({
  isWalletConnected,
  isNetworkMismatched,
  showModal,
  handleModalOpen,
  handleModalClose,
}: PropTypes) => {
  let dataTip
  if (!isWalletConnected) dataTip = 'Connect your wallet to access'
  if (isNetworkMismatched) dataTip = 'Connect to Sepolia Testnet to access'
  const needTooltip = dataTip !== undefined
  const onWalletClick = () => {
    if (needTooltip) return
    handleModalOpen()
  }
  return (
    <>
      <button
        className={`btn btn-ghost font-medium ${
          needTooltip ? 'tooltip tooltip-right md:tooltip-bottom' : ''
        }`}
        data-tip={dataTip}
        onClick={onWalletClick}
      >
        <span className='text-2xl flex flex-col items-center justify-center'>
          <GiWallet />
          <span className='text-xs uppercase'>Game Wallet</span>
        </span>
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

import { useEffect, useState } from 'react'
import { useAddress } from '@thirdweb-dev/react'

import GameWallet from './GameWallet'

const GameWalletContainer = () => {
  const [showModal, setShowModal] = useState(false)
  const walletAddress = useAddress()
  const isWalletConnected = walletAddress && walletAddress.length > 0 ? true : false
  const handleModalOpen = () => {
    if (!isWalletConnected) return
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }
  useEffect(() => {
    window.addEventListener('topUpWallet', handleModalOpen)
    return () => {
      window.removeEventListener('topUpWallet', handleModalOpen)
    }
  })

  return (
    <GameWallet
      isWalletConnected={isWalletConnected}
      showModal={showModal}
      handleModalOpen={handleModalOpen}
      handleModalClose={handleModalClose}
    />
  )
}

export default GameWalletContainer

import { useEffect, useState } from 'react'
import { useAddress, useNetworkMismatch } from '@thirdweb-dev/react'

import GameWallet from './GameWallet'

// TODO: Get rid of window.addEventListener
const GameWalletContainer = () => {
  const [showModal, setShowModal] = useState(false)
  const walletAddress = useAddress()
  const isWalletConnected = walletAddress && walletAddress.length > 0 ? true : false
  const isNetworkMismatched = useNetworkMismatch()
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
      isNetworkMismatched={isNetworkMismatched}
      isWalletConnected={isWalletConnected}
      showModal={showModal}
      handleModalOpen={handleModalOpen}
      handleModalClose={handleModalClose}
    />
  )
}

export default GameWalletContainer

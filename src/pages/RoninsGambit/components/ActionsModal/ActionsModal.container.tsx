import { useAddress } from '@thirdweb-dev/react'

import ActionsModal from './ActionsModal'

interface PropTypes {
  showModal: boolean
  handleOnClose: () => void
}

const ActionsModalContainer = ({ showModal, handleOnClose }: PropTypes) => {
  const address = useAddress()
  const isWalletConnected = address && address.length > 0 ? true : false

  return (
    <ActionsModal
      showModal={showModal}
      handleOnClose={handleOnClose}
      isWalletConnected={isWalletConnected}
    />
  )
}

export default ActionsModalContainer

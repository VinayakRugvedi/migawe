import { ConnectWallet } from '@thirdweb-dev/react'

import './ThirdWebConnectWalletButton.css'

interface PropTypes {
  buttonText?: string
}

const ThirdWebConnectWalletButton = ({ buttonText = 'CONNECT WALLET' }: PropTypes) => {
  return (
    <ConnectWallet
      theme='light'
      className='third-web-connect-wallet-button'
      btnTitle={buttonText}
    />
  )
}

export default ThirdWebConnectWalletButton

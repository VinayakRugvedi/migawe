import { ConnectWallet } from '@thirdweb-dev/react'

import './ThirdWebConnectWalletButton.css'

interface PropTypes {
  buttonText?: string
}

const ThirdWebConnectWalletButton = ({ buttonText = 'Connect Wallet' }: PropTypes) => {
  // const address: string | undefined = useAddress()
  // const isWalletConnected = address ? true : false

  return <ConnectWallet theme='light' className='third-web-connect-wallet-button' />
}

export default ThirdWebConnectWalletButton

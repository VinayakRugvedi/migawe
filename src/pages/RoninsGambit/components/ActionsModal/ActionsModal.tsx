import { GiWallet, GiPiggyBank, GiPlayButton } from 'react-icons/gi'

import { Modal } from 'components/base'
import { ThirdWebConnectWalletButton } from 'components/ui'

interface PropTypes {
  showModal: boolean
  handleOnClose: () => void
  isWalletConnected: boolean
  balance: number
  userHasEnoughBalance: boolean
  minimumBalanceToPlay: number
  tokenName:string
}

const ActionsModal = ({ showModal, handleOnClose, isWalletConnected, balance,userHasEnoughBalance,minimumBalanceToPlay,tokenName }: PropTypes) => {
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
            You are ready to start playing. Click the button below to start playing. <br/>
            You will be charged {minimumBalanceToPlay} {tokenName}.
          </p>
          <button className='btn'>Play Now</button>
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
            Please top-up your game wallet. You game wallet should have a minimum balance of {minimumBalanceToPlay} {tokenName} to
            start playing games.<br/>Your currrent balance is {balance} {tokenName}.
            You need {minimumBalanceToPlay - balance} {tokenName} more.
          </p>
          <button onClick={()=>{alert("Not Implemented")}}className='btn'>Add {minimumBalanceToPlay - balance} {tokenName}</button>
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

import { GiWallet, GiPiggyBank, GiStarsStack } from 'react-icons/gi'
import { FaFileSignature } from 'react-icons/fa'
import { IoIosTime } from 'react-icons/io'
import { Modal, Timer } from 'components/base'
import { ThirdWebConnectWalletButton } from 'components/ui'

interface PropTypes {
  showModal: boolean
  handleOnClose: () => void
  isWalletConnected: boolean
  userBalance: number | undefined
  minimumBalanceToPlay: number
  tokenName: string
  userMatchRequestStatus: 'accept' | 'reject' | 'timeout' | undefined
  setUserMatchRequestStatus: (status: 'accept' | 'reject' | 'timeout' | undefined) => void
  topUpWallet: () => void
  enableSigner: boolean
  setEnableSigner: (status: boolean) => void
  signMatchRequest: () => void
}

const ActionsModal = ({
  showModal,
  handleOnClose,
  isWalletConnected,
  userBalance,
  minimumBalanceToPlay,
  tokenName,
  userMatchRequestStatus,
  setUserMatchRequestStatus,
  topUpWallet,
  enableSigner,
  setEnableSigner,
  signMatchRequest,
}: PropTypes) => {
  const userHasEnoughBalance = userBalance && userBalance >= minimumBalanceToPlay ? true : false
  //template variables
  let modalCloseDisabled = false
  let modalHeader = null
  let modalContent = null
  let modalIcon = null
  let modalAction = null

  modalHeader = 'Post a Challenge'
  modalIcon = <FaFileSignature />
  modalContent = (
    <>
      You are ready to start challenging other players. Click the button below to sign.
      <br />
      You will be charged{' '}
      <b>
        {minimumBalanceToPlay} {tokenName}
      </b>
      .
    </>
  )
  modalAction = (
    <button disabled={!enableSigner} onClick={signMatchRequest} className='btn'>
      Post Challenge
    </button>
  )
  //user rejected sign match request
  if (userMatchRequestStatus == 'reject') {
    modalHeader = 'Must Sign a Match Request'
    modalIcon = <FaFileSignature />
    modalContent = (
      <>
        You must sign a match request. Click the button below to sign.
        <br />
      </>
    )
    modalAction = (
      <button disabled={!enableSigner} onClick={signMatchRequest} className='btn'>
        Sign to Post Challenge
      </button>
    )
  }
  if (userMatchRequestStatus == 'timeout') {
    modalHeader = 'Challenge Timeout'
    modalIcon = <IoIosTime />
    modalContent = (
      <>
        Your last challenge has ended. Please try again.
        <br />
      </>
    )
    modalAction = (
      <button onClick={signMatchRequest} className='btn'>
        Post Challenge
      </button>
    )
  }
  if (userMatchRequestStatus == 'accept') {
    modalCloseDisabled = true
    modalHeader = 'Challenge Posted'
    modalIcon = <GiStarsStack />
    modalContent = (
      <>
        Your challenge is now active for &nbsp;
        <Timer
          durationInSeconds={60}
          handleTimerEnd={() => {
            setUserMatchRequestStatus('timeout')
            setEnableSigner(true)
          }}
        />
        &nbsp;secs.
        <br />
      </>
    )
    modalAction = <span>Wait for Someone to Accept Your Challenge</span>
  }
  //user does not have enough balance
  if (!userHasEnoughBalance) {
    const needToPay = minimumBalanceToPlay - (userBalance ? userBalance : 0)
    modalHeader = 'Top-up your Game Wallet'
    modalContent = (
      <>
        Please top-up your game wallet. You game wallet should have a minimum balance of{' '}
        {minimumBalanceToPlay} {tokenName} to start playing games.
        <br />
        Your currrent balance is{' '}
        <b>
          {userBalance} {tokenName}
        </b>
        . You need {needToPay} {tokenName} more.<br/>
        <span className=' leading-10' > You can mint {tokenName} tokens using&nbsp;
        <a href={"https://sepolia.etherscan.io/address/0xa69bd215ab75bdf55d4dab9734c74fea212d7f4c#writeContract"} 
        className='link text-primary-focus'
        target='_blank'
        rel='noopener noreferrer'
        >etherscan</a>.
        </span>
      </>


    )
    modalIcon = <GiPiggyBank />
    modalAction = (
      <button
        onClick={() => {
          topUpWallet()
        }}
        className='btn'
      >
        Add {needToPay} {tokenName}
      </button>
    )
  }

  if (!isWalletConnected) {
    modalHeader = 'Connect Wallet'
    modalContent = 'Please connect your wallet to start playing games.'
    modalIcon = <GiWallet />
    modalAction = <ThirdWebConnectWalletButton />
  }

  return (
    <Modal isOpen={showModal} handleOnClose={handleOnClose} hideCloseIcon={modalCloseDisabled}>
      <div className='flex items-center justify-center flex-col py-2 '>
        <h4 className='text-lg font-bold mt-2 self-start'>{modalHeader}</h4>
        <div className='text-7xl my-2'>{modalIcon}</div>
        <p className='text-center mb-4 px-4'>{modalContent}</p>
        {modalAction}
      </div>
    </Modal>
  )
}

export default ActionsModal

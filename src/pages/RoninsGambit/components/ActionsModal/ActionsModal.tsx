import { Link } from 'react-router-dom'
import { GiWallet, GiPiggyBank, GiStarsStack } from 'react-icons/gi'
import { FaFileSignature } from 'react-icons/fa'
import { IoIosTime } from 'react-icons/io'

import { Modal, Timer } from 'components/base'
import { ThirdWebConnectWalletButton } from 'components/ui'
import { UI } from 'utils/constants'
import { useNetwork, ChainId } from '@thirdweb-dev/react'

interface PropTypes {
  showModal: boolean
  handleOnClose: () => void
  isWalletConnected: boolean
  isNetworkMismatched: boolean
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
  isNetworkMismatched,
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
  const [, switchNetwork] = useNetwork()

  modalHeader = 'Post a Challenge'
  modalIcon = <FaFileSignature />
  modalContent = (
    <>
      You are all set to challenge other players.
      <br />
      Please click on the button below to sign.
      <br />
      You will be charged&nbsp;
      <b>
        {UI.WAGER_AMOUNT} {tokenName}
      </b>
      &nbsp; in order to setup the reward pool.
    </>
  )
  modalAction = (
    <button disabled={!enableSigner} onClick={signMatchRequest} className='btn'>
      Post Challenge
    </button>
  )
  //user rejected sign match request
  if (userMatchRequestStatus == 'reject') {
    modalHeader = 'Signing Match Request is Mandatory'
    modalIcon = <FaFileSignature />
    modalContent = (
      <>
        You must sign the match request in order to play.
        <br />
        Please click on the button below to sign and continue.
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
    modalHeader = 'Challenge Timed Out; Retry'
    modalIcon = <IoIosTime />
    modalContent = (
      <>
        Your challenge has expired. Please click on the button below to try again.
        <br />
        <span className='italic'>Note: You will have to sign the match request again.</span>
      </>
    )
    modalAction = (
      <button onClick={signMatchRequest} className='btn'>
        Post Challenge
      </button>
    )
  }
  if (isNetworkMismatched) {
    modalHeader = 'Switch to Sepolia Testnet'
    modalIcon = <GiWallet />
    modalContent = <>Please switch to Sepolia Testnet to play.</>
    modalAction = (
      <button
        onClick={() => {
          if (switchNetwork) switchNetwork(11155111)
        }}
        className='btn'
      >
        Switch to Sepolia
      </button>
    )
  }
  if (userMatchRequestStatus == 'accept') {
    modalCloseDisabled = true
    modalHeader = 'Challenge Posted!'
    modalIcon = <GiStarsStack />
    modalContent = (
      <>
        Your challenge has been successfully posted and will be&nbsp;
        <b>
          active for&nbsp;
          <Timer
            durationInSeconds={60}
            handleTimerEnd={() => {
              setUserMatchRequestStatus('timeout')
              setEnableSigner(true)
            }}
          />
          &nbsp;secs.
        </b>
        <br />
      </>
    )
    modalAction = (
      <span className='italic text-center'>Please wait until someone accepts your challenge</span>
    )
  }
  //user does not have enough balance
  if (!userHasEnoughBalance) {
    const needToPay = minimumBalanceToPlay - (userBalance ? userBalance : 0)
    modalHeader = 'Top-up your Game Wallet'
    modalContent = (
      <>
        Please top-up your game wallet.
        <br />
        Your game wallet should have a{' '}
        <b>
          minimum balance of {minimumBalanceToPlay} {tokenName}
        </b>
        &nbsp; to start playing the game.
        <br />
        Your currrent balance is{' '}
        <b>
          {userBalance} {tokenName}
        </b>
        &nbsp; and you need{' '}
        <b>
          {needToPay} {tokenName} more
        </b>
        .
        <br />
        <div className='mt-6 italic'>
          Note: You can mint {tokenName} tokens using&nbsp;
          <Link
            to='https://sepolia.etherscan.io/address/0xa69bd215ab75bdf55d4dab9734c74fea212d7f4c#writeContract'
            className='link text-primary-focus'
            target='_blank'
            rel='noopener noreferrer'
          >
            etherscan
          </Link>
          .
        </div>
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
    modalContent = 'Please connect your wallet to start playing the game.'
    modalIcon = <GiWallet />
    modalAction = <ThirdWebConnectWalletButton />
  }

  return (
    <Modal isOpen={showModal} handleOnClose={handleOnClose} hideCloseIcon={modalCloseDisabled}>
      <div className='flex items-center justify-center flex-col py-2 '>
        <h4 className='text-lg font-bold mt-2 self-start'>{modalHeader}</h4>
        <div className='text-7xl my-4'>{modalIcon}</div>
        <p className='text-center mb-6 px-4'>{modalContent}</p>
        {modalAction}
      </div>
    </Modal>
  )
}

export default ActionsModal

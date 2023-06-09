import {
  useAddress,
  useContractRead,
  useContract,
  useSigner,
  useSDK,
} from '@thirdweb-dev/react'
import ActionsModal from './ActionsModal'
import { CONTRACTS, UI } from 'utils/constants'
import { useState } from 'react'
import MatchMaker, { MatchMakerResponse } from './MatchMaker'
interface PropTypes {
  showModal: boolean
  handleOnClose: () => void
  handleOnConnection: (response: MatchMakerResponse) => void
}

const matchMaker = new MatchMaker(0)

const ActionsModalContainer = ({ showModal, handleOnClose, handleOnConnection }: PropTypes) => {
  const sdk = useSDK()
  const userAddress = useAddress()
  //userAddress is undefined when wallet is not connected
  //at this time we face some error in useContractRead
  const { data: erc20Contract } = useContract(CONTRACTS.erc20Address, CONTRACTS.erc20ABI)
  const { data: tokenName } = useContractRead(erc20Contract, 'symbol')
  const { data: walletContract } = useContract(CONTRACTS.gameWalletAddress, CONTRACTS.gameWalletABI)
  const { data: deposit } = useContractRead(walletContract, 'deposits', [userAddress])

  const userBalance = deposit ? Number(deposit.toString()) / 10 ** 18 : undefined
  const minimumBalanceToPlay = UI.MINIMUM_BALANCE
  const isWalletConnected = userAddress && userAddress.length > 0 ? true : false

  const signer = useSigner()
  const wager = 1e17
  const validUntil = Math.floor(Date.now() / 1000) + 60 * 100
  const [userMatchRequestStatus, setUserMatchRequestStatus] = useState<
    'accept' | 'reject' | 'timeout' | undefined
  >(undefined)
  const [enableSigner, setEnableSigner] = useState(true)
  const topUpWallet = async () => {
    handleOnClose();
    window.dispatchEvent(new CustomEvent('topUpWallet'))
  }
  const signMatchRequest = async () => {
    setEnableSigner(false)
    if (!signer) return
    if (!sdk) return
    //proceed only if we have signer and sdk
    const onTimeout = () => {
      setUserMatchRequestStatus('reject')
    }
    const onChallengePosted = () => {
      setUserMatchRequestStatus('accept')
    }
    matchMaker
      .findMatch(sdk, wager, signer, validUntil, onChallengePosted, onTimeout)
      .then((response) => handleOnConnection(response)) //opponent has accepted the match request
      .catch((_) => {
        setUserMatchRequestStatus('reject')
        setEnableSigner(true)
      })
  }

  return (
    <ActionsModal
      showModal={showModal}
      handleOnClose={handleOnClose}
      isWalletConnected={isWalletConnected}
      userBalance={userBalance}
      minimumBalanceToPlay={minimumBalanceToPlay}
      tokenName={tokenName}
      topUpWallet={topUpWallet}
      enableSigner={enableSigner}
      setEnableSigner={setEnableSigner}
      userMatchRequestStatus={userMatchRequestStatus}
      setUserMatchRequestStatus={setUserMatchRequestStatus}
      signMatchRequest={signMatchRequest}
    />
  )
}

export default ActionsModalContainer

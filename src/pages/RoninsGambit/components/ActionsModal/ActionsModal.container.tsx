import { useAddress, useContractRead, useContract, useContractWrite } from '@thirdweb-dev/react'
import ActionsModal from './ActionsModal'
import { CONTRACTS } from 'utils/constants'
import { Modal } from 'components/base'

interface PropTypes {
  showModal: boolean
  handleOnClose: () => void
}

const ActionsModalContainer = ({ showModal, handleOnClose }: PropTypes) => {
  const userAddress = useAddress()
  //userAddress is undefined when wallet is not connected
  //at this time we face some error in useContractRead
  const { data: erc20Contract } = useContract(CONTRACTS.erc20Address, CONTRACTS.erc20ABI)
  const { data: tokenName } = useContractRead(erc20Contract, 'symbol')
  const { data: walletContract } = useContract(CONTRACTS.gameWalletAddress, CONTRACTS.gameWalletABI)
  const {
    data: deposit,
    isLoading,
    error,
  } = useContractRead(walletContract, 'deposits', [userAddress])
  const { mutateAsync } = useContractWrite(walletContract, 'deposit')

  const userBalance = deposit ? Number(deposit.toString()) / 10 ** 18 : -1
  const minimumBalanceToPlay = 10
  const needToPay = minimumBalanceToPlay - userBalance
  const isWalletConnected = userAddress && userAddress.length > 0 ? true : false

  const topUpWallet = async () => {
    console.log('topUpWallet')
    console.log('needToPay', needToPay)
    await mutateAsync({ args: [(needToPay * 10 ** 18).toString()] })
  }

  const playNow = async () => {
    alert('playNow')
  }
  return (
    <ActionsModal
      showModal={showModal}
      handleOnClose={handleOnClose}
      isWalletConnected={isWalletConnected}
      userBalance={userBalance}
      minimumBalanceToPlay={minimumBalanceToPlay}
      needToPay={needToPay}
      tokenName={tokenName}
      topUpWallet={topUpWallet}
      playNow={playNow}
    />
  )
}

export default ActionsModalContainer

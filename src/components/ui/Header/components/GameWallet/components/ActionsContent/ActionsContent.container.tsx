import { useState } from 'react'
import { useAddress, useContractRead, useContract, useContractWrite } from '@thirdweb-dev/react'
import { CONTRACTS } from 'utils/constants'

import ActionsContent from './ActionsContent'

const ActionsContentContainer = () => {
  const [activeTabType, setActiveTabType] = useState<'deposit' | 'withdraw'>('deposit')
  const userAddress = useAddress()

  const { data: erc20Contract } = useContract(CONTRACTS.erc20Address, CONTRACTS.erc20ABI)
  const { data: tokenName } = useContractRead(erc20Contract, 'symbol')
  const { data: gameWalletContract } = useContract(
    CONTRACTS.gameWalletAddress,
    CONTRACTS.gameWalletABI,
  )

  const {
    data: deposit,
    isLoading: contractReadLoading,
    error: contractReadError,
  } = useContractRead(gameWalletContract, 'deposits', [userAddress])
  const userBalance = deposit ? Number(deposit.toString()) / 10 ** 18 : 0
  const minimumBalanceToPlay = 10
  const needToPay = minimumBalanceToPlay - userBalance

  const { mutateAsync } = useContractWrite(gameWalletContract, 'deposit')
  const { mutateAsync: approveAsync } = useContractWrite(erc20Contract, 'approve')

  const handleApproveAndTopup = async () => {
    await approveAsync({
      args: [CONTRACTS.gameWalletAddress, (needToPay * 10 ** 18).toString()],
    }).catch((error) => {
      return
    })
    await mutateAsync({ args: [(needToPay * 10 ** 18).toString()] }).catch((e) => {
      return
    })
  }

  const handleTabChange = (type: 'deposit' | 'withdraw') => {
    setActiveTabType(type)
  }

  return (
    <ActionsContent
      userBalance={userBalance}
      minimumBalanceToPlay={minimumBalanceToPlay}
      needToPay={needToPay}
      tokenName={tokenName}
      handleApproveAndTopup={handleApproveAndTopup}
      activeTabType={activeTabType}
      handleTabChange={handleTabChange}
    />
  )
}

export default ActionsContentContainer

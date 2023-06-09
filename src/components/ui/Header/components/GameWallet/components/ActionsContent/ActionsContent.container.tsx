import { useState } from 'react'
import { useAddress, useContractRead, useContract, useContractWrite, useBalance, NATIVE_TOKEN_ADDRESS } from '@thirdweb-dev/react'
import {toast } from 'react-toastify'

import { CONTRACTS } from 'utils/constants'
import ActionsContent from './ActionsContent'
import { UI } from 'utils/constants'

const MINIMUM_BALANCE = UI.MINIMUM_BALANCE
const MINIMUM_DEPOSIT = 0// you can't deposit less than 0

interface PropTypes {
  handleModalClose: () => void
}

// TODO: Handle contract-read loading and error
const ActionsContentContainer = ({ handleModalClose }: PropTypes) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [validationError, setValidationError] = useState('')
  const [activeTabType, setActiveTabType] = useState<'deposit' | 'withdraw'>('deposit')
  const [depositAmount, setDepositAmount] = useState(MINIMUM_DEPOSIT)

  const userAddress = useAddress()
  const { data: erc20Contract } = useContract(CONTRACTS.erc20Address, CONTRACTS.erc20ABI)
  const { data: tokenName } = useContractRead(erc20Contract, 'symbol')
  const { data: gameWalletContract } = useContract(
    CONTRACTS.gameWalletAddress,
    CONTRACTS.gameWalletABI,
  )

  const {
    data: deposit,
    isLoading: depositIsLoading,
    error: depositIsError,
  } = useContractRead(gameWalletContract, 'deposits', [userAddress])
  const userDeposit = deposit ? Number(deposit.toString()) / 10 ** 18 : 0

  const {
    data: allowance,
    isLoading: allowanceIsLoading,
    error: allowanceIsError,
  } = useContractRead(erc20Contract, 'allowance', [userAddress, CONTRACTS.gameWalletAddress])

  const { data:balance} = useContractRead(erc20Contract, 'balanceOf', [userAddress])
  const balanceValue = balance ? Number(balance.toString()) / 10 ** 18 : 0
  const allowanceValue = allowance ? Number(allowance.toString()) / 10 ** 18 : 0

  const { mutateAsync: depositAsync } = useContractWrite(gameWalletContract, 'deposit')
  const { mutateAsync: approveAsync } = useContractWrite(erc20Contract, 'approve')

  const handleApprove = async () => {
    setIsLoading(true)
    setIsError(false)
    setValidationError('')

    await approveAsync({
      args: [CONTRACTS.gameWalletAddress, (10**20).toString()],
    })
      .then((response) => {
        // console.log(response, 'Allowance Approval Response')
        toast.success('Successfully approved the allowance. Continue to Deposit')
      })
      .catch((error) => {
        setIsError(true)
        console.error(error)
        toast.error('Oops, something went wrong!')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleDeposit = async () => {
    if (isNaN(depositAmount)) {
      setValidationError('Enter a valid amount.')
      return
    }
    if (depositAmount > balanceValue) {
      setValidationError(
        `Deposit can't be greater than your balance (${balanceValue} ${tokenName})`,
      )
      return
    }
    if (depositAmount > allowanceValue) {
      setValidationError(
        `You need to approve more! You have approved (${allowanceValue} ${tokenName})`,
      )
      return
    }

    setIsLoading(true)
    setValidationError('')
    await depositAsync({ args: [(depositAmount * 10 ** 18).toString()] })
      .then((response) => {
        // console.log(response, 'Deposit Response')
        toast.success(`Successfully deposited ${depositAmount} ${tokenName}.`)
        handleModalClose()
      })
      .catch((error) => {
        console.error(error)
        setIsError(true)
        toast.error('Oops, something went wrong!')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleDepositAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepositAmount(parseFloat(event?.target.value))
  }

  const handleTabChange = (type: 'deposit' | 'withdraw') => {
    setActiveTabType(type)
  }

  return (
    <>
      <ActionsContent
        userBalance={userDeposit}
        minimumBalance={MINIMUM_BALANCE}
        tokenName={tokenName}
        balanceValue={balanceValue}
        allowanceValue={allowanceValue}
        handleApprove={handleApprove}
        handleDeposit={handleDeposit}
        activeTabType={activeTabType}
        handleTabChange={handleTabChange}
        depositAmount={depositAmount}
        handleDepositAmount={handleDepositAmount}
        validationError={validationError}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  )
}

export default ActionsContentContainer

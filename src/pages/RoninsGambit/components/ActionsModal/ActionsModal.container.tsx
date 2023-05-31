import { useAddress,useContractRead,useContract, useChainId} from '@thirdweb-dev/react'
import { Web3Button } from "@thirdweb-dev/react";
import ActionsModal from './ActionsModal'
import {CONTRACTS} from 'utils/contants'

interface PropTypes {
  showModal: boolean
  handleOnClose: () => void
}

const ActionsModalContainer = ({ showModal, handleOnClose }: PropTypes) => {
  const userAddress = useAddress()
  const { data: walletContract } = useContract(CONTRACTS.gameWalletAddress, CONTRACTS.gameWalletABI)
  const { data, isLoading, error } = useContractRead(walletContract, "deposits",[userAddress]);
  //convert data Bignumber to number and devide by 10^18
  const balance = data ? Number(data.toString())/10**18 : -1;
  const minimumBalanceToPlay=10;
  const tokenName='TST';// TODO: Get token name from contract
  
  const userHasEnoughBalance = balance && balance > minimumBalanceToPlay ? true : false
  const isWalletConnected = userAddress && userAddress.length > 0 ? true : false
  return (
    <ActionsModal
      showModal={showModal}
      handleOnClose={handleOnClose}
      isWalletConnected={isWalletConnected}
      balance={balance}
      userHasEnoughBalance ={userHasEnoughBalance}
      minimumBalanceToPlay ={minimumBalanceToPlay}
      tokenName={tokenName} 
    />
  )
}

export default ActionsModalContainer

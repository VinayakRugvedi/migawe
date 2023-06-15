import LeaderBoard from './LeaderBoard'
import { useContract, useContractRead } from '@thirdweb-dev/react'
import { BigNumber, ethers } from 'ethers'
import { useEffect } from 'react'
import { CONTRACTS } from 'utils/constants'

interface PropTypes {
  addresses: Array<string>
}

const Wins = ({ addresses }: PropTypes) => {
  const { contract: rpsGameContract } = useContract(CONTRACTS.rpsGameAddress, CONTRACTS.rpsGameABI)
  const { contract: gameWalletContract } = useContract(
    CONTRACTS.gameWalletAddress,
    CONTRACTS.gameWalletABI,
  )
  const { data: lastUpkeepTime } = useContractRead(rpsGameContract, 'lastUpkeepTime')
  const { data: interval } = useContractRead(rpsGameContract, 'interval')
  const endTime =
    lastUpkeepTime && interval
      ? ((lastUpkeepTime as BigNumber).toNumber() + (interval as BigNumber).toNumber()) * 1000
      : undefined

  const { data: treasuryAddress } = useContractRead(rpsGameContract, 'treasuryAddr')
  const { data: treasuryBal } = useContractRead(gameWalletContract, 'deposits', [treasuryAddress])
  const rewardPool = treasuryBal ? ethers.utils.formatUnits(treasuryBal, 18) : undefined
  const leaderboard = [
    {
      address: addresses[0],
      wins: useContractRead(rpsGameContract, 'currTournamentScore', [addresses[0]])
        .data as BigNumber,
    },
    {
      address: addresses[1],
      wins: useContractRead(rpsGameContract, 'currTournamentScore', [addresses[1]])
        .data as BigNumber,
    },
    {
      address: addresses[2],
      wins: useContractRead(rpsGameContract, 'currTournamentScore', [addresses[2]])
        .data as BigNumber,
    },
    {
      address: addresses[3],
      wins: useContractRead(rpsGameContract, 'currTournamentScore', [addresses[3]])
        .data as BigNumber,
    },
    {
      address: addresses[4],
      wins: useContractRead(rpsGameContract, 'currTournamentScore', [addresses[4]])
        .data as BigNumber,
    },
  ]
  // console.log(leaderboard);
  return <LeaderBoard leaderboard={leaderboard} endTime={endTime} rewardPool={rewardPool} />
}

const LeaderBoardContainer = () => {
  const { contract: rpsGameContract } = useContract(CONTRACTS.rpsGameAddress, CONTRACTS.rpsGameABI)
  const { data: addresses } = useContractRead(rpsGameContract, 'getLeaderBoard', [])
  if (addresses) return <Wins addresses={addresses} />
  return <div>Loading...</div>
}
export default LeaderBoardContainer

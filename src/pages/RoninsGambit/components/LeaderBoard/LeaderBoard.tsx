import { BigNumber } from 'ethers'
import dayjs from 'dayjs'
import relativeTimePlugin from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTimePlugin)

import { UI } from 'utils/constants'
interface PropTypes {
  leaderboard: {
    address: string
    wins: BigNumber
  }[]
  endTime: number | undefined // in ms
  rewardPool: string | undefined
}

const LeaderBoard = ({ leaderboard, endTime, rewardPool }: PropTypes) => {
  const leaderboardFiltered = leaderboard.filter(
    (player) => player.address !== '0x0000000000000000000000000000000000000000',
  )
  const isLeaderBoardEmpty = leaderboardFiltered.length === 0 ? true : false
  const formattedTime = dayjs(endTime).fromNow()

  return (
    <div className='mt-16 w-full'>
      <h4 className='text-2xl font-medium'>Leaderboard</h4>
      <div className='card mt-8'>
        <div className='text-xl font-medium'>
          Top 5 players will receive bonus rewards at the end of each tournament.
        </div>
        <div className='stats stats-vertical md:stats-horizontal shadow-lg bg-primary/10 mt-4'>
          {rewardPool ? (
            <div className='stat'>
              <div className='stat-title'>Reward pool</div>
              <div className='stat-value'>
                {rewardPool} {UI.tokenName}
              </div>
            </div>
          ) : null}
          {endTime ? (
            <div className='stat'>
              <div className='stat-title'>Tournament ends</div>
              <div className='stat-value'>{formattedTime}</div>
            </div>
          ) : null}
        </div>
        <div className='shadow-xl rounded-md overflow-x-auto mt-8'>
          <div className='flex flex-col'>
            <div className='flex bg-neutral/20'>
              <div className='w-[25%] p-2 text-center font-bold'>Rank</div>
              <div className='w-[50%] p-2 text-center font-bold'>Address</div>
              <div className='w-[25%] p-2 text-center font-bold'>Wins</div>
            </div>
            {!isLeaderBoardEmpty ? (
              leaderboardFiltered.map((player, index) => {
                return (
                  <div className='flex items-center' key={index}>
                    <div className='w-[25%] p-2 text-center'>
                      <span className='badge font-medium'>{index + 1}</span>
                    </div>
                    <div className='w-[50%] p-2 text-center overflow-hidden overflow-ellipsis'>
                      {player.address}
                    </div>
                    <div className='w-[25%] p-2 text-center'>
                      {player.wins?.toString() || 'loading...'}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className='flex flex-col items-center justify-center p-4'>No one here yet!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default LeaderBoard

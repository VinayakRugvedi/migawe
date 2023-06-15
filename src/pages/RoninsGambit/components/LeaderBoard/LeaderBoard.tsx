import { BigNumber } from 'ethers'
import moment from 'moment'
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
  const formattedTime = moment(endTime).fromNow()
  return (
    <div className='mt-16 w-full'>
      <h4 className='text-2xl font-medium'>Leaderboard</h4>
      <div className='card mt-8'>
        <div className='text-xl font-medium'>
          Top 5 players will receive bonus rewards at the end of each tournament !
        </div>
        <div className='flex flex-row'>
          {rewardPool ? (
            <div className='stat'>
              <div className='stat-title'>Reward pool</div>
              <div className='stat-value'>
                {rewardPool} {UI.tokenName}
              </div>
            </div>
          ) : (
            ''
          )}
          {endTime ? (
            <div className='stat'>
              <div className='stat-title'>Tournament ends</div>
              <div className='stat-value'>{formattedTime}</div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className='shadow-xl rounded-md overflow-x-auto mt-8'>
          <div className='flex flex-col'>
            <div className='flex bg-base-100 bg-neutral/20'>
              <div className='w-[25%] p-2 text-center font-bold'>Rank</div>
              <div className='w-[50%] p-2 text-center font-bold'>Address</div>
              <div className='w-[25%] p-2 text-center font-bold'>Wins</div>
            </div>
            {leaderboardFiltered.map((player, index) => {
              return (
                <div className='flex ' key={index}>
                  <div className='w-[25%] p-2 text-center'>{index + 1}</div>
                  <div className='w-[50%] p-2 text-center overflow-hidden overflow-ellipsis'>
                    {player.address}
                  </div>
                  <div className='w-[25%] p-2 text-center'>
                    {player.wins?.toString() || 'loading...'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
export default LeaderBoard

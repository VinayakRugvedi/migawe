import { BigNumber } from 'ethers'

interface PropTypes {
  leaderboard: {
    address: string
    wins: BigNumber
  }[]
}

const LeaderBoard = ({ leaderboard }: PropTypes) => {
  const leaderboardFiltered = leaderboard.filter(
    (player) => player.address !== '0x0000000000000000000000000000000000000000',
  )
  return (
    <div className='mt-16 w-full'>
      <h4 className='text-2xl font-medium'>Leaderboard</h4>
      <div className='card mt-8'>
        <div className='text-xl font-medium'>
          Top 5 players will receive bonus rewards at the end of each week. Stay tuned!
        </div>
        <div className='shadow-xl rounded-md overflow-x-auto'>
          <table className='table rounded-md w-full mt-4'>
            <thead>
              <tr>
                <th style={{ position: 'relative' }}>Rank</th>
                <th className='overflow-ellipsis'>Address</th>
                <th>Wins</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardFiltered.map((player, index) => (
                <tr key={index}>
                  <td className='font-medium'>
                    <div className='badge'>{index + 1}</div>
                  </td>
                  <td className='overflow-ellipsis'>{player.address}</td>
                  <td className='font-medium'>{player.wins?.toString() || 'loading...'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default LeaderBoard

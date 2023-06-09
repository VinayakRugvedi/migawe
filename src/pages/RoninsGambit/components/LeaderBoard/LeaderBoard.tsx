import { BigNumber } from "ethers";

interface PropTypes {
    leaderboard: {
        address: string;
        wins: BigNumber;
    }[];
}

const LeaderBoard = ({ leaderboard } : PropTypes) => {
    const leaderboardPadded = leaderboard.concat(Array(5).fill({address: 'loading...', wins: 'loading...'})).slice(0, 5); 
    return (
        <div className='mt-8 w-full'>
            <h4 className='text-2xl font-medium'>LeaderBoards</h4>
            <div className='card mt-8 '>
                <div className="card-title "> Top 5 players will get Bonus Rewards at the end of each week!</div>
                    <table className="table table-accent rounded-md w-full mt-4 shadow-xl">    
                        <thead>
                            <tr>
                                <th className="w-8">Rank</th>
                                <th className=" overflow-ellipsis">Address</th>
                                <th className="w-32">Wins</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboardPadded.map((player, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td className=" overflow-ellipsis">{player.address}</td>
                                    <td>{player.wins?.toString()|| "loading..."}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        </div>
);
}
export default LeaderBoard;
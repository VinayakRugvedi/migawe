import LeaderBoard from "./LeaderBoard";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import { useEffect } from "react";
import { CONTRACTS } from "utils/constants";

interface PropTypes {
    addresses: Array<string>
}

const Wins = ({addresses}:PropTypes) => {
    const {contract:rpsGameContract}= useContract(CONTRACTS.rpsGameAddress,CONTRACTS.rpsGameABI);
    const leaderboard=[
        {address: addresses[0], wins: useContractRead(rpsGameContract, 'currTournamentScore',[addresses[0]]).data as BigNumber},
        {address: addresses[1], wins: useContractRead(rpsGameContract, 'currTournamentScore',[addresses[1]]).data as BigNumber},
        {address: addresses[2], wins: useContractRead(rpsGameContract, 'currTournamentScore',[addresses[2]]).data as BigNumber},
        {address: addresses[3], wins: useContractRead(rpsGameContract, 'currTournamentScore',[addresses[3]]).data as BigNumber},
        {address: addresses[4], wins: useContractRead(rpsGameContract, 'currTournamentScore',[addresses[4]]).data as BigNumber},
    ]
    // console.log(leaderboard);
    return <LeaderBoard leaderboard={leaderboard} />;
}

const LeaderBoardContainer = () => {
    const {contract:rpsGameContract}= useContract(CONTRACTS.rpsGameAddress,CONTRACTS.rpsGameABI);
    const {data:addresses}=useContractRead(rpsGameContract, 'getLeaderBoard',[]);
    if(addresses)
        return <Wins addresses={addresses} />;
    return <div>Loading...</div>
}
export default LeaderBoardContainer;
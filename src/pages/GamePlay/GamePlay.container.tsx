import GamePlay from './GamePlay'
import type { DataConnection } from "peerjs";
import { useEffect, useState } from "react";
import MatchMaker from './MatchMaker';
import Player from "core/agents/Player"
import NetworkedAgent from "core/agents/NetworkedAgent"
import type { GameState,IAgent } from "core/types"


const GamePlayContainer = () => {

  const matchMaker = new MatchMaker();
  const [conn,setConn] = useState<DataConnection|undefined>(undefined);
  matchMaker.findOpponent.then((conn)=>setConn(conn));

  if(conn==undefined) {
    return <div>Waiting for opponent...</div>
  }
  const player=new Player();
  const opponent = new NetworkedAgent(conn);
  return <GamePlay 
    player={player}
    opponent={opponent}
    firstPlayer
    onExit={() => {
      conn.close();
    }}
  />
}

export default GamePlayContainer

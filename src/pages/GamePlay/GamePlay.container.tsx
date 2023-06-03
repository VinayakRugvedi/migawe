import GamePlay from './GamePlay'
import type { DataConnection } from 'peerjs'
import { useEffect, useState } from 'react'
import MatchMaker from './MatchMaker'
import { useSigner } from '@thirdweb-dev/react-core'
import GameEngine from "core/GameEngine"
import GameLogic from "core/GameLogic"
import Player from "core/agents/Player"
import NetworkedAgent from 'core/agents/NetworkedAgent'
import type { GameState,IAgent } from "core/types"
import { start } from 'repl'

// TODO: Move relevant logic and state from GamePlay.tsx to this file
const GamePlayContainer = () => {
  const player= new Player();
  const gameEngine = new GameEngine(new GameLogic(),(newState:GameState)=>{
    console.log(newState);
    //TODO update playerHealth and opponentHealth
    //TODO update outcome
  });
  const matchMaker = new MatchMaker()
  const [matchFound, setMatchFound] = useState<boolean>(false)
  //to start match making process call
  const signer=useSigner()
  useEffect(() => {
    if(!signer) return
    matchMaker.findMatch(1e17,signer, Math.floor(Date.now() / 1000) + 60*100).then((conn) => {
      const opponent = new NetworkedAgent(conn);
      gameEngine.startGame([player,opponent]);
      setMatchFound(true)
    })
  }, [signer])
  //TODO if time runs out before match is found, show error screen
  if (matchFound === false) {
    // TODO show loading screen
    return <div className='w-screen h-screen fixed top-0 left-0 right-0 z-30 bg-black text-white'>Waiting for opponent...</div>
  }
  return (
    <GamePlay
      playerHealth={5}
      opponentHealth={5}
      outcome='win'
      finalizeMove={(move: 0 | 1 | 2) => player.selectMove(move)}
    />
  )
}

export default GamePlayContainer

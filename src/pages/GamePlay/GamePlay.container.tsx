import GameEngine from 'core/GameEngine'
import GameLogic from 'core/GameLogic'
import Player from 'core/agents/Player'
import type { IAgent, GameState } from 'core/types'
import GamePlay from './GamePlay'
import { OpponentInfo } from 'pages/RoninsGambit/RoninsGambit.container'
import RandomAI from 'core/agents/RandomAI'
import NetworkedAgent from 'core/agents/NetworkedAgent'
import { DataConnection } from 'peerjs'
import { useState } from 'react'

interface PropTypes {
  opponentInfo:OpponentInfo
}
const onStateChange = (gameState:GameState) => {
  alert("state changed unimplemented"+gameState)
}

const gameEngine= new GameEngine(new GameLogic())

const GamePlayContainer = ({opponentInfo}: PropTypes) => {
  console.log('%c GamePlayContainer', 'background: #222; color: #bada55');
  const {type,connection,playerId} = opponentInfo
  const player= new Player();
  let opponent:IAgent<GameState>;
    switch (type) {
      case "network":
        opponent = new NetworkedAgent(connection as DataConnection);
        break;
      case "cpu":
        opponent = new RandomAI();
        break;
      default:
        opponent = new RandomAI();
    }
    switch (playerId) {
      case 0:
        gameEngine.startGame([player,opponent]);
        break;
      case 1:
        gameEngine.startGame([opponent,player]);
        break;
      default:
        console.error("invalid player id");
    }

  const selectRandomOutcome=()=>{
    const outcomes=['win','loose','tie'];
    const outcome=outcomes[Math.floor(Math.random()*outcomes.length)];
    return outcome as 'win' | 'loose' | 'tie';
  }
  const outcomes:string[]=[];
  const loop=()=>{
    const randomOutcome=selectRandomOutcome();
    outcomes.push(randomOutcome);
    const nextTimeout=8*1000;
    console.log("outcomes",outcomes);
    setTimeout(loop,nextTimeout);
  }
    loop()
  return (
    <GamePlay outcomes={outcomes}/>
  )
}

export default GamePlayContainer
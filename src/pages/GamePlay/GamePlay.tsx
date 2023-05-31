import GameEngine from "core/GameEngine"
import GameLogic from "core/GameLogic"
import type Player from "core/agents/Player"
import type { GameState,IAgent } from "core/types"


interface GamePlayProps {
  player:Player,
  opponent:IAgent<GameState>,
  firstPlayer:boolean,
  onExit:()=>void
}

const GamePlay = ({player,opponent,firstPlayer,onExit}:GamePlayProps) => {
  //identical to GamePage.svelte
  return <div className='w-screen h-screen fixed top-0 left-0 right-0 z-30 bg-black'>
  </div>
}

export default GamePlay

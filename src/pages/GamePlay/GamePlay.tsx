
interface GamePlayProps {
  playerHealth:number,
  opponentHealth:number,
  outcome:'win' | 'lose' | 'tie',
  finalizeMove:(move:0|1|2)=>void,
}

const GamePlay = ({playerHealth,opponentHealth,outcome,finalizeMove}:GamePlayProps) => {
  let playerHasMadeAMove=false;
  const handlePlayerMove = (move:0|1|2) => {
    playerHasMadeAMove=true;
    finalizeMove(move);
  }
  const handleVideoEnd = () => {
    if(playerHasMadeAMove){
      // setVideoType(outcome);
      playerHasMadeAMove=false;
    }
    else{
      // setVideoType('idle')
    }
  }
  const videoWidth = window.screen.width
  const videoHeight = window.screen.height
  //when the video ends we will check the outcome to see if we won or lost on the next round,
  return (
  <div className='w-screen h-screen fixed top-0 left-0 right-0 z-30 bg-black font-game grid place-content-center  text-6xl'>
    BATTLE SCENE
  </div>
  )
}

export default GamePlay

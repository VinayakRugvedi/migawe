import ChooseButtonGroup from "./components/ChooseButtonGroup";
import HitPoints from "./components/HitPoints";
import { useEffect, useState } from "react";
import { Scene } from "./GamePlay";
import { GameData } from "./GamePlay.container";
import "components/base/swap.css"
interface PropTypes {
    gameData:GameData
    handlePlayerMove: (move: 0|1|2) => void;
    handleOnEnd: () => void;
}
const playerMoveFrom = {
    "tiger": 0,
    "turtle": 1,
    "eagle": 2
}

const GamePlayUI = ({gameData,handlePlayerMove,handleOnEnd}: PropTypes) => {
    const [ playerHealth, setPlayerHealth ] = useState(gameData.playerHealth);
    const [ opponentHealth, setOpponentHealth ] = useState(gameData.opponentHealth);
    const [countdown, setCountdown] = useState(15);
    const [showLoader, setShowLoader] = useState(false);
    const [disableChoice, setDisableChoice] = useState(false);
    const [showChoice, setShowChoice] = useState(true);
    const [msg,setMsg]=useState<string|null>(null);
    useEffect(() => {
        const onSceneChange = (e:any)=>{
            const newScene=e.detail as Scene;
            if(newScene!=="idle"){
                setShowChoice(false);
                setTimeout(() => {
                    if(gameData.playerHealth<=0){
                        setMsg("You Loose");
                        handleOnEnd();
                    }
                    else if(gameData.opponentHealth<=0){
                        setMsg("You Win");
                        handleOnEnd();
                    }
                    setPlayerHealth(gameData.playerHealth);
                    setOpponentHealth(gameData.opponentHealth);
                }, 1000*2.5);
                setTimeout(() => {
                    setShowChoice(true);
                    setDisableChoice(false);
                    setCountdown(15);
                }, 1000*3);
            }
        }
        addEventListener("scene-change",onSceneChange)
        return () => {
            removeEventListener("scene-change",onSceneChange)
        }
    }, [])

    const setChoice=(choice:0|1|2)=>{
        handlePlayerMove(choice);
        setDisableChoice(true);
        setCountdown(-1);
    }
    return (
        <div className = 'absolute inset-0 w-full h-full text-white z-30'>
            <div className="absolute bottom-0 translate-y-4  w-full grid place-items-center">
                <div className={`swap swap-fly-in  ${showChoice?"swap-active":""} `}>
                    <div className="swap-on duration-[1s] ">
                        <ChooseButtonGroup
                        disableChoice={disableChoice}
                        handleChoice={(choice)=>{setChoice(playerMoveFrom[choice] as 0|1|2)}}                        
                        />
                    </div>
                </div>
            </div>
            {/* player0 hitpoints */}
            <div className="absolute bottom-8 right-8 pointer-events-none">
                <HitPoints hitPoints={playerHealth} maxHitPoints={5} flip/>
            </div>
            {/* player1 hitpoints */}
            <div className="absolute top-8 left-8 pointer-events-none">
                <HitPoints hitPoints={opponentHealth} maxHitPoints={5} flip={false}/>
            </div>
            <div className={`absolute inset-0 flex justify-center items-center pointer-events-none text-8xl font-bold swap ${(0<countdown)?"swap-active":""}`}>
                <div className="swap-on">
                    {/* implement a CountDown */}
                </div>
            </div>
            <div className={`absolute inset-0 flex justify-center items-center pointer-events-none text-8xl font-bold swap ${showLoader?"swap-active":""}`}>
                <div className="swap-on">
                    <div className="radial-progress" style={{ "--value": "70", "--size": "12rem", "--thickness": "2px" } as any}>70%</div>
                </div>
            </div>
            <div className={`absolute inset-0 flex justify-center items-center pointer-events-none text-8xl font-bold swap ${msg?"swap-active":""}`}>
                <div className="swap-on">
                    <div className="text-9xl">{msg}</div>
                </div>
            </div>
        </div>
    )
}

export default GamePlayUI;
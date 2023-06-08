import ChooseButtonGroup from "./components/ChooseButtonGroup";
import HitPoints from "./components/HitPoints";
import { useEffect, useRef, useState } from "react";
import { Scene } from "./GamePlay";
import { GameData } from "./GamePlay.container";
import {normalMusic,intenseMusic,fillMusic} from "game-play-assets"
import "components/base/swap.css"
interface PropTypes {
    gameData:GameData
    handlePlayerMove: (move: 0|1|2) => void;
    handleOnEnd: () => void;
}
const countDownStartValue=30;
const showCountDownStartValue=10;

const playerMoveFromChoice = (move: 0|1|2|undefined) => {
    switch (move) {
        case 0:
            return "Tiger";
        case 1:
            return "Turtle";
        case 2:
            return "Eagle";
        default:
            return "random?";
    }
}
const GamePlayUI = ({gameData,handlePlayerMove,handleOnEnd}: PropTypes) => {

    //MUSIC
    const normalMusicRef=useRef<HTMLAudioElement>(null);
    const intenseMusicRef=useRef<HTMLAudioElement>(null);
    const fillMusicRef=useRef<HTMLAudioElement>(null);
    const handleAudio=(gameData:GameData)=>{
        if(gameData.playerHealth<=3){
            normalMusicRef.current?.pause();
            intenseMusicRef.current?.play();
        }
        if(gameData.playerHealth<=1){
            fillMusicRef.current?.play();
        }
    }
    useEffect(()=>{
        normalMusicRef.current?.play();
            //loop on end
            normalMusicRef.current?.addEventListener("ended",()=>{
                normalMusicRef.current?.play();
            }
        )
        return ()=>{
            normalMusicRef.current?.pause();
            normalMusicRef.current?.removeEventListener("ended",()=>{
                normalMusicRef.current?.play();
            })
        }
    },[normalMusicRef])
    //
    let healthTimeout:NodeJS.Timeout;
    const [ playerHealth, setPlayerHealth ] = useState(gameData.playerHealth);
    const [ opponentHealth, setOpponentHealth ] = useState(gameData.opponentHealth);

    let countdownTimeout:NodeJS.Timeout;
    const [countdown, setCountdown] = useState(countDownStartValue);

    let showLoaderTimeout:NodeJS.Timeout;
    const [showLoader, setShowLoader] = useState(false);
    const [playerChoice, setPlayerChoice] = useState<0|1|2|undefined>(undefined);

    let showChoiceTimeout:NodeJS.Timeout;
    const [showChoice, setShowChoice] = useState(true);

    const [msg,setMsg]=useState<string|null>(null);
    useEffect(() => {
        const onSceneChange = (e:any)=>{
            const newScene=e.detail as Scene;
            if(newScene!=="idle"){
                setShowChoice(false);
                showLoaderTimeout&&clearTimeout(showLoaderTimeout);
                setShowLoader(false);

                healthTimeout=setTimeout(() => {
                    handleAudio(gameData);
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
                }, 1000*1.8);
                showChoiceTimeout=setTimeout(() => {
                    setShowChoice(true);
                    setPlayerChoice(undefined);
                    countdownTimeout&&clearTimeout(countdownTimeout);
                    setCountdown(countDownStartValue);
                }, 1000*3);
            }
        }
        addEventListener("scene-change",onSceneChange)
        return () => {
            showLoaderTimeout&&clearTimeout(showLoaderTimeout);
            healthTimeout&&clearTimeout(healthTimeout);
            showChoiceTimeout&&clearTimeout(showChoiceTimeout);
            removeEventListener("scene-change",onSceneChange)
        }
    }, [])

    const handlePlayerChoice=(choice:0|1|2)=>{
        console.log("player choice",choice);
        handlePlayerMove(choice);
        //to make the choice buttons disabled
        setPlayerChoice(choice);
        countdownTimeout&&clearTimeout(countdownTimeout);
        setCountdown(-1);
        showLoaderTimeout=setTimeout(() => {
            showLoaderTimeout&&clearTimeout(showLoaderTimeout);
            setShowLoader(true);
        },1000);
    }
    useEffect(() => {
        if(countdown===0){
            handlePlayerChoice(Math.floor(Math.random()*3) as 0|1|2);
        }
        else if(countdown>0){
            countdownTimeout= setTimeout(() => {
                countdownTimeout&&clearTimeout(countdownTimeout);
                setCountdown(countdown-1);
            }, 1000);
        }
        return () => {
            countdownTimeout&&clearTimeout(countdownTimeout);
        }
    }, [countdown])
    
    return (
        <div className = 'absolute inset-0 w-full h-full text-white z-30'>
            <div className="absolute bottom-0 translate-y-4  w-full grid place-items-center">
                <div className={`swap swap-fly-in  ${showChoice?"swap-active":""} `}>
                    <div className="swap-on duration-[1s] ">
                        <ChooseButtonGroup
                        choice={playerChoice}
                        handleChoice={handlePlayerChoice}                       
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
            <div className={`absolute inset-0 flex justify-center items-center pointer-events-none text-8xl font-bold swap ${(0<countdown &&countdown<showCountDownStartValue)?"swap-active":""}`}>
                <div className="swap-on">
                    <span className="countdown">
                        <span style={{"--value":countdown} as any}></span>
                    </span>
                </div>
            </div>
            <div className={`absolute inset-0 flex justify-center items-center pointer-events-none text-8xl font-bold swap ${showLoader?"swap-active":""}`}>
                <div className="swap-on text-center">
                    <div className="text-4xl">waiting for opponent...</div>
                    <div className="text-2xl">you chose {playerMoveFromChoice(playerChoice)}</div>
                </div>
            </div>
            <div className={`absolute inset-0 flex justify-center items-center pointer-events-none text-8xl font-bold swap ${msg?"swap-active":""}`}>
                <div className="swap-on">
                    <div className="text-9xl">{msg}</div>
                </div>
            </div>
            <div className="hidden">
                <audio ref={normalMusicRef} src={normalMusic} preload="auto"></audio>
                <audio ref={intenseMusicRef} src={intenseMusic} preload="auto"></audio>
                <audio ref={fillMusicRef} src={fillMusic} preload="auto"></audio>
            </div>
        </div>
    )
}

export default GamePlayUI;
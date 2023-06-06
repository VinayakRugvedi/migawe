import { useEffect, useRef, useState } from 'react'
import { GiStripedSword, GiVibratingShield, GiSwordBreak } from 'react-icons/gi'

import { idleVideo, winVideo, looseVideo, tieVideo } from 'game-play-assets'

interface GamePlayProps {
  outcomes:any
}
const videoSrcs=[idleVideo,winVideo,looseVideo,tieVideo];

const outcomeToVideoSrc = {
  'win':winVideo,
  'loose':looseVideo,
  'tie':tieVideo,
  'idle':idleVideo
}
const GamePlay = ({outcomes}:GamePlayProps) => {
  console.log('%c GamePlay', 'background: #222; color: #bada55');
  let lastOutcomeLength=0;
  let nextVideoSrc = idleVideo;
  const videoElements:HTMLVideoElement[]=[]
  function enableChoices(){
    // document.querySelectorAll(".choice-button").forEach(button=>button.disabled=false);
  }
  function hideAll(){
    videoElements.forEach((el)=>el.style.display="none");
  };
  return (
    <div className = 'absolute inset-0 w-full h-full bg-black z-30'>
      <video
        className='absolute inset-0 w-full h-full object-contain object-center'
      >
        <source src={idleVideo} type="video/mp4" />
      </video>
    {videoSrcs.map((src,index)=>(
      <video 
      key={index}
      ref={(el) => {
        if(el){
          videoElements.push(el);
          el.dataset.src=src;
          el.playbackRate=1.2;
          if(src===idleVideo){
            el.style.display="block";
            el.currentTime = 0;
            el.play();
          }
          else{
            el.load();
            el.style.display="none";
          }
        }
      }}
      onEnded={(el)=>{
        console.log("%c video ended","background: #222; color: #ff2a55");
        enableChoices();
        //hide all videos
        hideAll();
        if(outcomes.length>lastOutcomeLength){
          nextVideoSrc= outcomeToVideoSrc[outcomes.at(-1) as 'win' | 'loose' | 'tie'];
          lastOutcomeLength=outcomes.length;
        }
        //show the next video
        videoElements.forEach((el)=>{
          if(el.dataset.src===nextVideoSrc){
          el.style.display="block";
          el.currentTime = 0;
          el.playbackRate=1.2;
          el.play();
          nextVideoSrc=idleVideo;
          }
        });
      }}
        className='absolute inset-0 w-full h-full object-contain object-center'
      >
        <source src={src} type="video/mp4" />
      </video>
    ))}
    </div>
 )
}

export default GamePlay

import { useRef, useEffect } from 'react'

import { idleVideo, winVideo, loseVideo, tieVideo } from 'game-play-assets'
import { RONIN_GAMBIT } from 'utils/types'
const { VIDEO_TYPES } = RONIN_GAMBIT

interface PropTypes {
  videoType: string
  handleVideoEnd: () => void
}

const Videos = ({ videoType, handleVideoEnd }: PropTypes) => {
  const idleVideoRef = useRef<HTMLVideoElement>(null)
  const winVideoRef = useRef<HTMLVideoElement>(null)
  const loseVideoRef = useRef<HTMLVideoElement>(null)
  const tieVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoType === VIDEO_TYPES.Win) {
      if (winVideoRef && winVideoRef.current) {
        winVideoRef.current.play()
      }
    } else if (videoType === VIDEO_TYPES.Lose) {
      if (loseVideoRef && loseVideoRef.current) {
        loseVideoRef.current.play()
      }
    } else if (videoType === VIDEO_TYPES.Tie) {
      if (tieVideoRef && tieVideoRef.current) {
        tieVideoRef.current.play()
      }
    }
  }, [videoType])

  const videoWidth = window.screen.width
  const videoHeight = window.screen.height

  return (
    <>
      <video
        autoPlay
        ref={idleVideoRef}
        muted
        loop
        width={videoWidth}
        height={videoHeight}
        className={`${videoType !== VIDEO_TYPES.Idle ? 'z-0' : 'z-10'} absolute`}
      >
        <source src={idleVideo} type='video/mp4'></source>
      </video>

      <video
        ref={winVideoRef}
        width={videoWidth}
        height={videoHeight}
        className={`${videoType !== VIDEO_TYPES.Win ? 'z-0' : 'z-10'} absolute`}
        onEnded={handleVideoEnd}
      >
        <source src={winVideo} type='video/mp4'></source>
      </video>

      <video
        ref={loseVideoRef}
        width={videoWidth}
        height={videoHeight}
        className={`${videoType !== VIDEO_TYPES.Lose ? 'z-0' : 'z-10'} absolute`}
        onEnded={handleVideoEnd}
      >
        <source src={loseVideo} type='video/mp4'></source>
      </video>

      <video
        ref={tieVideoRef}
        width={videoWidth}
        height={videoHeight}
        className={`${videoType !== VIDEO_TYPES.Tie ? 'z-0' : 'z-10'} absolute`}
        onEnded={handleVideoEnd}
      >
        <source src={tieVideo} type='video/mp4'></source>
      </video>
    </>
  )
}

export default Videos

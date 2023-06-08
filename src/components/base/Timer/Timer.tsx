import { useEffect, useState } from 'react'

interface PropTypes {
  durationInSeconds: number
  handleTimerEnd: () => void
}


const Timer = ({ durationInSeconds, handleTimerEnd }: PropTypes) => {
  const [secondsLeft, setSecondsLeft] = useState(durationInSeconds)
  useEffect(() => {
    if (secondsLeft == 0) {
      handleTimerEnd()
    }
    const timerout=setTimeout(()=>setSecondsLeft(secondsLeft-1),1000)
    return () => {
      clearTimeout(timerout)
    }
  }, [secondsLeft])

  return (
    <span className="countdown">
        <span style={{"--value":secondsLeft} as any}></span>
    </span>
  )
}

export default Timer

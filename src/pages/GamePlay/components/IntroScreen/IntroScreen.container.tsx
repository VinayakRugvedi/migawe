import { useState, useEffect } from 'react'

import IntroScreen from './IntroScreen'

interface PropTypes {
  handleGameStart: () => void
}

const IntroScreenContainer = ({ handleGameStart }: PropTypes) => {
  const [isMatchMaking, setIsMatchMaking] = useState(false)
  const [canRetry, setCanRetry] = useState(false)

  useEffect(() => {
    setIsMatchMaking(true)
    setTimeout(() => {
      handleGameStart()
    }, 3000)
  }, [])

  const handleTimerEnd = () => {
    setIsMatchMaking(false)
    setCanRetry(true)
  }

  const handleRetry = () => {
    setCanRetry(false)
    setIsMatchMaking(true)
  }

  return (
    <IntroScreen
      isMatchMaking={isMatchMaking}
      handleTimerEnd={handleTimerEnd}
      canRetry={canRetry}
      handleRetry={handleRetry}
    />
  )
}

export default IntroScreenContainer

import { useState, useEffect } from 'react'
import { useSigner } from '@thirdweb-dev/react-core'

import type { IAgent, GameState } from 'core/types'
import NetworkedAgent from 'core/agents/NetworkedAgent'
import MatchMaker from './MatchMaker'
import IntroScreen from './IntroScreen'

interface PropTypes {
  setMatchedEnemy: (arg0: IAgent<GameState>) => void
}

const MATCH_MAKER = new MatchMaker()

const IntroScreenContainer = ({ setMatchedEnemy }: PropTypes) => {
  const [isMatchMaking, setIsMatchMaking] = useState(false)
  const [canRetry, setCanRetry] = useState(false)

  const signer = useSigner()
  useEffect(() => {
    if (!signer) return

    setIsMatchMaking(true)
    // MATCH_MAKER.findMatch(1e17, signer, Math.floor(Date.now() / 1000) + 60 * 100).then(
    //   (connection) => {
    //     const enemy = new NetworkedAgent(connection)
    //     setMatchedEnemy(enemy)
    //     setIsMatchMaking(false)
    //   },
    // )
  }, [signer])

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

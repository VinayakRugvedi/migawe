import { useState, useEffect } from 'react'
import { useSigner } from '@thirdweb-dev/react-core'

import type { IAgent, GameState } from 'core/types'
import RandomAI from 'core/agents/RandomAI'
import NetworkedAgent from 'core/agents/NetworkedAgent'
import MatchMaker from './MatchMaker'
import IntroScreen from './IntroScreen'

const AI = new RandomAI()

interface PropTypes {
  handleMatch: (arg0: IAgent<GameState>, arg1: number) => void
}

const MATCH_MAKER = new MatchMaker()
const USE_RANDOM_UI = false

const IntroScreenContainer = ({ handleMatch }: PropTypes) => {
  const [isMatchMaking, setIsMatchMaking] = useState(false)
  const [canRetry, setCanRetry] = useState(false)

  const signer = useSigner()
  useEffect(() => {
    if (!signer) return

    setIsMatchMaking(true)

    if (USE_RANDOM_UI) {
      setTimeout(() => {
        handleMatch(AI, 0)
        setIsMatchMaking(false)
      }, 3000)
      return
    }

    MATCH_MAKER.findMatch(1e17, signer, Math.floor(Date.now() / 1000) + 60 * 100).then(
      ({ conn, playerId }) => {
        const enemy = new NetworkedAgent(conn)
        handleMatch(enemy, playerId)
        setIsMatchMaking(false)
      },
    )
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

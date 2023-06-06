import { useState, useEffect ,createContext,useContext} from 'react'
import { useSigner } from '@thirdweb-dev/react-core'

import type { IAgent, GameState } from 'core/types'
import NetworkedAgent from 'core/agents/NetworkedAgent'
import MatchMakerContext from './MatchMakerContext'

import MatchMaker from './MatchMaker'
import RandomAI from 'core/agents/RandomAI'

export const MATCH_MAKER_CONTEXT = createContext(new MatchMaker(0));

interface PropTypes {
  children: React.ReactNode
  agent:"cpu"|"network"
  onMatch: (agent:IAgent<GameState>,playerId:0|1) => void
}

const MatchMakerContextContainer = ({children,agent,onMatch}: PropTypes) => {
  console.log("MatchMakerContextContainer",agent)
  if(agent==="cpu"){
    onMatch(new RandomAI(),0)
    return (<>{children}</>)
  }
  const MatchMaker = useContext(MATCH_MAKER_CONTEXT)
  // if(agent==="network")
  const [isMatchMakingSuccessful, setIsMatchMakingSuccessful] = useState(false)
  const signer = useSigner()
  const wager = 1e17;
  const validUntil = Math.floor(Date.now() / 1000) + 60 * 100;
  console.log("MatchMakerSigner",signer);
  useEffect(() => {
    console.log("MatchMakerSigner",signer);
    if (!signer) return
    console.log("MatchMakerFindMatch",wager,signer,validUntil);
    MatchMaker.findMatch(wager,signer,validUntil).then(
      ({conn, playerId}) => {
        console.log("MatchMakerContextContainer",conn, playerId);
        onMatch(new NetworkedAgent(conn),playerId)
        setIsMatchMakingSuccessful(true)
      }
    )
  }, [signer])
  if(isMatchMakingSuccessful) {
    return (<>{children}</>)
  }
  const [canRetry, setCanRetry] = useState(false)
  const handleRetry = () => {
    setCanRetry(false)
  }
  return (
    <MatchMakerContext
      canRetry={canRetry}
      handleRetry={handleRetry}
    />
  )
}

export default MatchMakerContextContainer

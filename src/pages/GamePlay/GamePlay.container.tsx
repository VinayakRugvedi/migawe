import GamePlay from './GamePlay'
import type { DataConnection } from 'peerjs'
import { useEffect, useState } from 'react'
import MatchMaker from './MatchMaker'
import Player from 'core/agents/Player'
import NetworkedAgent from 'core/agents/NetworkedAgent'
import type { GameState, IAgent } from 'core/types'
import { useSigner } from '@thirdweb-dev/react-core'

const GamePlayContainer = () => {
  const matchMaker = new MatchMaker()
  const [conn, setConn] = useState<DataConnection | undefined>(undefined)
  //to start match making process call
  const signer=useSigner()
  useEffect(() => {
    if(!signer) return
    matchMaker.findMatch(1e17,signer, Math.floor(Date.now() / 1000) + 60*100).then((conn) => {
      setConn(conn)
    })
  }, [signer])

  if (conn == undefined) {
    // TODO show loading screen
    return <div>Waiting for opponent...</div>
  }
  const player = new Player()
  const opponent = new NetworkedAgent(conn)
  return (
    <GamePlay
      player={player}
      opponent={opponent}
      firstPlayer
      onExit={() => {
        conn.close()
      }}
    />
  )
}

export default GamePlayContainer

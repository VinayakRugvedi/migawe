import { useState } from 'react'
import { GamePlay } from 'pages'
import RoninsGambit from './RoninsGambit'
import { MatchMakerResponse } from './components/ActionsModal/MatchMaker'
import { DataConnection } from 'peerjs'

export interface OpponentInfo{
  isReady:boolean
  type:"cpu"|"network"
  connection:DataConnection|undefined
  playerId:0|1
}


const RoninsGambitContainer = () => {
  const [opponentInfo,setOpponentInfo] = useState<OpponentInfo>({isReady:false,type:"network",connection:undefined,playerId:0})
  const [showModal, setShowModal] = useState(false)
  const handleOnOpen = () => {
    setShowModal(true)
  }
  const handleOnClose = () => {
    setShowModal(false)
  }

  if(opponentInfo.isReady === false) 
    return (
    <RoninsGambit
    showModal={showModal}
    handleOnOpen={handleOnOpen}
    handleOnClose={handleOnClose}
    setOpponentInfo={setOpponentInfo}
    />
    )
  return (
  <GamePlay 
  opponentInfo={opponentInfo}
  />
  )
}

export default RoninsGambitContainer

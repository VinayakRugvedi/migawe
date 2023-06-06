import { useState } from 'react'

import { GamePlay } from 'pages'
import RoninsGambit from './RoninsGambit'

const RoninsGambitContainer = () => {
  const [showModal, setShowModal] = useState(false)
  const [showGamePlay, setShowGamePlay] = useState(false)

  const handleOnOpen = () => {
    setShowModal(true)
  }

  const handleOnClose = () => {
    setShowModal(false)
  }

  const handleGameStart = () => {
    setShowGamePlay(true)
  }

  return (
    <>
      {showGamePlay ? (
        <GamePlay />
      ) : (
        <RoninsGambit
          showModal={showModal}
          handleOnOpen={handleOnOpen}
          handleOnClose={handleOnClose}
          handleGameStart={handleGameStart}
        />
      )}
    </>
  )
}

export default RoninsGambitContainer

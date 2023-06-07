import { useState } from 'react'

import { GamePlay } from 'pages'
import RoninsGambit from './RoninsGambit'

const RoninsGambitContainer = () => {
  const [showModal, setShowModal] = useState(false)
  const [showGamePlay, setShowGamePlay] = useState(false)
  const [canPlayWithAi, setCanPlayWithAi] = useState(false)

  const handleOnOpen = () => {
    setShowModal(true)
  }

  const handleOnClose = () => {
    setShowModal(false)
  }

  const handleGameStart = () => {
    setShowGamePlay(true)
  }

  const handleGameStartWithAi = () => {
    setCanPlayWithAi(true)
    handleGameStart()
  }

  return (
    <>
      {showGamePlay ? (
        <GamePlay setShowGamePlay={setShowGamePlay} canPlayWithAi={canPlayWithAi} />
      ) : (
        <RoninsGambit
          showModal={showModal}
          handleOnOpen={handleOnOpen}
          handleOnClose={handleOnClose}
          handleGameStart={handleGameStart}
          handleGameStartWithAi={handleGameStartWithAi}
        />
      )}
    </>
  )
}

export default RoninsGambitContainer

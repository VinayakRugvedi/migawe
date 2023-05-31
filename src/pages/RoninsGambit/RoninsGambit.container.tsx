import { useState } from 'react'

import { GamePlay } from 'pages'
import RoninsGambit from './RoninsGambit'

const RoninsGambitContainer = () => {
  const [showModal, setShowModal] = useState(false)
  const [showGamePlay, setShowGamePlay] = useState(true)

  const handleOnOpen = () => {
    setShowModal(true)
  }

  const handleOnClose = () => {
    setShowModal(false)
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
        />
      )}
    </>
  )
}

export default RoninsGambitContainer
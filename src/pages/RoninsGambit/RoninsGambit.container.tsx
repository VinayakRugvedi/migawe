import { useState } from 'react'

import RoninsGambit from './RoninsGambit'

const RoninsGambitContainer = () => {
  const [showModal, setShowModal] = useState(false)

  const handleOnOpen = () => {
    setShowModal(true)
  }

  const handleOnClose = () => {
    setShowModal(false)
  }

  return (
    <RoninsGambit showModal={showModal} handleOnOpen={handleOnOpen} handleOnClose={handleOnClose} />
  )
}

export default RoninsGambitContainer

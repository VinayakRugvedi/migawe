import { useState, useEffect } from 'react'

import Modal from './Modal'

interface PropTypes {
  isOpen: boolean
  handleOnClose: () => void
  hideCloseIcon?: boolean
  children: React.ReactNode
  rootClassNames?: string
}

const ModalContainer = ({
  isOpen,
  handleOnClose,
  hideCloseIcon,
  children,
  rootClassNames = '',
}: PropTypes) => {
  const onCloseHandler = () => {
    handleOnClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      hideCloseIcon={hideCloseIcon}
      onCloseHandler={onCloseHandler}
      rootClassNames={rootClassNames}
    >
      {children}
    </Modal>
  )
}

export default ModalContainer

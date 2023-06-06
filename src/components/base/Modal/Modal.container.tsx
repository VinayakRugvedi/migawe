import Modal from './Modal'

interface PropTypes {
  isOpen: boolean
  handleOnClose: () => void
  hideCloseIcon?: boolean
  children: React.ReactNode
}

const ModalContainer = ({ isOpen, handleOnClose, hideCloseIcon, children }: PropTypes) => {
  const onCloseHandler = () => {
    handleOnClose()
  }

  return (
    <Modal isOpen={isOpen} hideCloseIcon={hideCloseIcon} onCloseHandler={onCloseHandler}>
      {children}
    </Modal>
  )
}

export default ModalContainer

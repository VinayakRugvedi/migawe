import { Modal } from 'components/base'

interface PropTypes {
  showModal: boolean
  handleOnClose: () => void
}

const ActionsModal = ({ showModal, handleOnClose }: PropTypes) => {
  return (
    <Modal isOpen={showModal} handleOnClose={handleOnClose}>
      <h4 className='text-lg font-bold'>Further steps</h4>
      <p>If wallet not connetced yet --+ Ask user to connect wallet</p>
      <p>If top-up pool below threshhold --+ Ask user to add USDTs to top-up pool</p>
      <p>If everythings set --+ show loader until random user is matched</p>
    </Modal>
  )
}

export default ActionsModal

import { Children } from 'react'

interface PropTypes {
  isOpen: boolean
  hideCloseIcon?: boolean
  onCloseHandler: () => void
  children: React.ReactNode
  rootClassNames: string
}

const Modal = ({ isOpen, hideCloseIcon, onCloseHandler, children, rootClassNames }: PropTypes) => {
  return (
    <>
      <div className={`modal ${isOpen ? 'modal-open' : ''} ${rootClassNames}`}>
        <div className='modal-box relative'>
          <label className='btn btn-sm btn-circle absolute right-2 top-2' onClick={onCloseHandler}>
            ✕
          </label>
          {children}
        </div>
      </div>
    </>
  )
}

export default Modal

import { Link } from 'react-router-dom'

import { ThirdWebConnectWalletButton } from 'components/ui'
import { Logo512 } from 'assets'
import { GameWallet } from './components'

interface PropTypes {
  showMobileHeader: boolean
  handleToggleMobileHeader: () => void
}

const Header = ({ showMobileHeader, handleToggleMobileHeader }: PropTypes) => {
  return (
    <header
      className='h-[90px] md:h-[125px] fixed top-0 inset-x-0 px-8 xl:px-12 z-30 bg-opacity-70 backdrop-blur transition-all duration-100 
    bg-base-100'
    >
      <nav className='h-full flex justify-between items-center'>
        <Link to='/' className='hover:text-primary flex items-center'>
          <img
            src={Logo512}
            alt='logo'
            width='24'
            className='mr-2 animate-[spin_5s_ease-in-out_infinite]'
          />
          <h3 className='text-2xl font-bold uppercase'>MIGAWE</h3>
        </Link>

        <div className='items-center hidden md:flex'>
          <div className='mr-12'>
            <GameWallet />
          </div>
          <Link className='mr-12 font-medium uppercase hover:text-primary' to='/ronins-gambit'>
            Game
          </Link>
          <ThirdWebConnectWalletButton />
        </div>

        <div className='flex items-center md:hidden'>
          <Link className='mr-4 font-medium uppercase hover:text-primary' to='/ronins-gambit'>
            Game
          </Link>
          <label className={`btn btn-xs swap swap-rotate ${showMobileHeader ? 'swap-active' : ''}`}>
            {/* this hidden checkbox controls the state */}
            <input type='checkbox' onChange={handleToggleMobileHeader} />

            {/* hamburger icon */}
            <svg
              className='swap-off fill-current'
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 512 512'
            >
              <path d='M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,120v42.67H448V120Z' />
            </svg>

            {/* close icon */}
            <svg
              className='swap-on fill-current'
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 512 512'
            >
              <polygon points='400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49' />
            </svg>
          </label>

          <div
            className={`absolute transition-all z-[-1] w-screen ${
              showMobileHeader ? 'top-[90px]' : 'top-[0px] opacity-0'
            } h-[100px] bg-secondary/90 left-0  flex items-center justify-between px-4`}
          >
            <div className='mr-12'>
              <GameWallet />
            </div>
            <ThirdWebConnectWalletButton />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

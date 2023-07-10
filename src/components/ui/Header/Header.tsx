import { Link } from 'react-router-dom'

import { GiHamburgerMenu, GiCrossedSwords } from 'react-icons/gi'

import { ThirdWebConnectWalletButton } from 'components/ui'
import { Logo512 } from 'components/base'
import { GameWallet, ToggleTheme } from './components'

interface PropTypes {
  showMobileHeader: boolean
  handleToggleMobileHeader: () => void
}

// TODO: Fix UI bug w.r.t clicking actions

const Header = ({ showMobileHeader, handleToggleMobileHeader }: PropTypes) => {
  return (
    <header
      className='h-[90px] md:h-[125px] fixed top-0 inset-x-0 px-8 xl:px-12 z-30 bg-opacity-70 backdrop-blur transition-all duration-100 
    bg-base-100'
    >
      <nav className='h-full flex justify-between items-center'>
        <Link to='/' className='hover:text-primary flex items-center'>
          <Logo512 width='24' className='mr-2 animate-[spin_5s_ease-in-out_infinite]' />
          <h3 className='text-2xl font-bold uppercase'>MIGAWE</h3>
        </Link>

        <div className='items-center hidden md:flex'>
          <div className='mr-12'>
            <ToggleTheme />
          </div>
          <div className='mr-12'>
            <GameWallet />
          </div>
          <Link className='mr-12 font-medium uppercase hover:text-primary' to='/ronins-gambit'>
            Game
          </Link>
          <ThirdWebConnectWalletButton />
        </div>

        <div className='flex items-center md:hidden'>
          <div className='mr-4 flex'>
            <ToggleTheme />
          </div>
          <Link className='mr-4 font-medium uppercase hover:text-primary' to='/ronins-gambit'>
            Game
          </Link>
          <label className={`btn btn-xs swap swap-rotate ${showMobileHeader ? 'swap-active' : ''}`}>
            {/* this hidden checkbox controls the state */}
            <input type='checkbox' onClick={handleToggleMobileHeader} />

            <GiHamburgerMenu className='swap-off' />
            <GiCrossedSwords className='swap-on' />
          </label>

          <div
            className={`absolute transition-all z-[-1] w-screen ${
              showMobileHeader ? 'top-[90px]' : 'top-[0px] opacity-0'
            } h-[90px] bg-primary left-0 flex items-center justify-between px-4`}
          >
            {showMobileHeader ? (
              <>
                <div className='mr-12'>
                  <GameWallet />
                </div>
                <ThirdWebConnectWalletButton />
              </>
            ) : null}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

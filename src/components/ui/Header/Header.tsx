import { Link } from 'react-router-dom'

import { ThirdWebConnectWalletButton } from 'components/ui'
import { Logo512 } from 'assets'

const Header = () => {
  return (
    <header
      className='h-[125px] fixed top-0 inset-x-0 px-12 z-30 bg-opacity-70 backdrop-blur transition-all duration-100 
    bg-base-100'
    >
      <nav className='h-full flex justify-between items-center uppercase'>
        <Link to='/' className='hover:text-primary flex items-center'>
          <img
            src={Logo512}
            alt='logo'
            width='24'
            className='mr-2 animate-[spin_5s_ease-in-out_infinite]'
          />
          <h3 className='text-2xl font-bold'>MIGAWE</h3>
        </Link>
        <div className='flex items-center'>
          <Link className='mr-6 font-normal hover:text-primary' to='/ronins-gambit'>
            Game
          </Link>
          <ThirdWebConnectWalletButton />
        </div>
      </nav>
    </header>
  )
}

export default Header

import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='h-[125px] fixed top-0 inset-x-0 px-12'>
      <div className='h-full flex justify-between items-center uppercase'>
        <Link to='/' className='hover:text-primary'>
          <h3 className='text-2xl font-bold'>MIGAWE</h3>
        </Link>
        <div>
          <Link className='mr-6 font-normal hover:text-primary' to='/game'>
            Let&apos;s Play
          </Link>
          <button className='btn'>Connect Wallet</button>
        </div>
      </div>
    </header>
  )
}

export default Header

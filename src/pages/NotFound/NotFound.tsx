import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center p-6'>
      <div className='mb-6 text-center'>
        <h3 className='text-7xl'>404</h3>
        <p>The page you are looking for cannot be found.</p>
      </div>
      <Link className='btn btn-primary btn-wide' to='/'>
        Take me Home
      </Link>
    </main>
  )
}

export default NotFound

import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'
import { GrMail } from 'react-icons/gr'

const GITHUB_REPO_LINK = 'https://github.com/VinayakRugvedi/migawe/tree/develop'

const Footer = () => {
  return (
    <footer className='footer items-center px-8 xl:px-12 py-8 bg-neutral text-neutral-content'>
      <div className='items-center grid-flow-col'>
        <h4 className='font-semibold'>MIGAWE</h4>
        <p>Copyright © 2023 - All right reserved</p>
      </div>
      <div className='grid-flow-col gap-4 md:place-self-center md:justify-self-end'>
        <Link to={GITHUB_REPO_LINK} target='_blank' rel='noopener' className='text-2xl mr-4'>
          <FaGithub />
        </Link>
        <Link to='mailto:info@migawe.xyz' className='text-2xl'>
          <GrMail />
        </Link>
      </div>
    </footer>
  )
}

export default Footer

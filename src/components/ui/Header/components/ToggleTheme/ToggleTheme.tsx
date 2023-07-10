import { FaSun, FaMoon } from 'react-icons/fa'

interface PropTypes {
  theme: string
  handleToggle: () => void
}

const ToggleTheme = ({ theme, handleToggle }: PropTypes) => {
  return (
    <button className='btn btn-xs md:btn-sm btn-circle' onClick={handleToggle}>
      {theme === 'valentine' ? <FaMoon /> : <FaSun />}
    </button>
  )
}

export default ToggleTheme

import { useContext } from 'react'

import { Logo512Dark, Logo512Light } from 'assets'
import { ThemeContext } from 'contexts'

interface PropTypes {
  width?: string
  className?: string
}

const Logo512 = ({ width = '', className = '' }: PropTypes) => {
  const { theme } = useContext(ThemeContext)
  const logo = theme === 'valentine' ? Logo512Dark : Logo512Light

  return <img src={logo} alt='Migawe Logo' width={width} className={className} />
}

export default Logo512

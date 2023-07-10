import { Logo512Dark, Logo512Light } from 'assets'

const getThemeFromLocalStorage = () => {
  return localStorage.getItem('theme')
}

const IS_LIGHT_THEME = getThemeFromLocalStorage() === 'valentine' ? true : false

const getLogo512 = () => {
  return IS_LIGHT_THEME ? Logo512Light : Logo512Dark
}

export { getThemeFromLocalStorage, IS_LIGHT_THEME, getLogo512 }

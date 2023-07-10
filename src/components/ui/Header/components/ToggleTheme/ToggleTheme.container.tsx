import { useState, useEffect, useContext } from 'react'

import { ThemeContext } from 'contexts'
import ToggleTheme from './ToggleTheme'

const ToggleThemeContainer = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  useEffect(() => {
    const themeStoredInLocal = localStorage.getItem('theme')
      ? localStorage.getItem('theme')
      : 'valentine'
    setTheme(themeStoredInLocal || 'valentine')
  }, [])

  useEffect(() => {
    if (!theme) return

    localStorage.setItem('theme', theme)
    const localTheme = localStorage.getItem('theme') || 'valentine'
    document.querySelector('html')?.setAttribute('data-theme', localTheme)
  }, [theme])

  const handleToggle = () => {
    if (theme === 'valentine') {
      setTheme('valentineDark')
    } else {
      setTheme('valentine')
    }
  }

  return <ToggleTheme theme={theme} handleToggle={handleToggle} />
}
export default ToggleThemeContainer

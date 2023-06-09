import { useState } from 'react'

import Header from './Header'

const HeaderContainer = () => {
  const [showMobileHeader, setShowMobileHeader] = useState(false)

  const handleToggleMobileHeader = () => {
    if (showMobileHeader) {
      setShowMobileHeader(false)
    } else {
      setShowMobileHeader(true)
    }
  }

  return (
    <Header
      showMobileHeader={showMobileHeader}
      handleToggleMobileHeader={handleToggleMobileHeader}
    />
  )
}

export default HeaderContainer

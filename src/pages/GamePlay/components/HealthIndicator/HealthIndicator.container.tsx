import { useState, useEffect } from 'react'

import { RONIN_GAMBIT } from 'utils/constants'
import HealthIndicator from './HealthIndicator'

interface PropTypes {
  updatedHealth: number
  canUpdateHealth: boolean
}

const HealthIndicatorContainer = ({ updatedHealth, canUpdateHealth }: PropTypes) => {
  const [health, setHealth] = useState(RONIN_GAMBIT.START_HEALTH)
  useEffect(() => {
    if (canUpdateHealth) {
      setHealth(updatedHealth)
    }
  }, [canUpdateHealth])

  return <HealthIndicator health={health} />
}

export default HealthIndicatorContainer

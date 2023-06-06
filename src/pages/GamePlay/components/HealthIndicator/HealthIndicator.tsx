import { RONIN_GAMBIT } from 'utils/constants'

interface PropTypes {
  health: number
}

const HealthIndicator = ({ health }: PropTypes) => {
  const playerHealthContent = []
  const lostPlayerHealth = RONIN_GAMBIT.START_HEALTH - health
  for (let i = 0; i < RONIN_GAMBIT.START_HEALTH; i++) {
    if (i < lostPlayerHealth) {
      playerHealthContent.push(
        <div key={i} className='bg-black border border-white w-[25px] h-[30px] mr-1'></div>,
      )
    } else {
      playerHealthContent.push(
        <div key={i} className='bg-white border border-white w-[25px] h-[30px] mr-1'></div>,
      )
    }
  }

  return (
    <div className='flex flex-col items-end'>
      <div className='flex'>{playerHealthContent}</div>
      <span className='text-sm mt-1'>
        {health} out of {RONIN_GAMBIT.START_HEALTH}
      </span>
    </div>
  )
}

export default HealthIndicator

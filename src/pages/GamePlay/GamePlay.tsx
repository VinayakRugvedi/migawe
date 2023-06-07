import { GiStripedSword, GiVibratingShield, GiSwordBreak } from 'react-icons/gi'

import type { IAgent, GameState } from 'core/types'
import { InternalGameState } from './GamePlay.container'

import { RONIN_GAMBIT } from 'utils/types'
import { Timer } from 'components/base'
import { IntroScreen, HealthIndicator, Videos } from './components'

const { ACTION_TYPES } = RONIN_GAMBIT

interface PropTypes {
  handleMatch: (arg0: IAgent<GameState>, arg1: number) => void
  canPlayWithAi: boolean
  hasGameStarted: boolean
  videoType: string
  handleVideoEnd: () => void
  canShowTimer: boolean
  handleTimerEnd: () => void
  action: { type: string; isLocked: boolean }
  handleActionSelect: (arg0: string) => void
  handleActionLock: () => void
  gameState: InternalGameState
  canHandleGameEnd: boolean
  handleBackToGamePage: () => void
}

const GamePlay = ({
  handleMatch,
  canPlayWithAi,
  hasGameStarted,
  videoType,
  handleVideoEnd,
  canShowTimer,
  handleTimerEnd,
  action,
  handleActionSelect,
  handleActionLock,
  gameState,
  canHandleGameEnd,
  handleBackToGamePage,
}: PropTypes) => {
  const isActionChosen = action.type.length > 0 ? true : false
  const isActionLocked = action.isLocked
  const isWaitingForEnemyMove = false
  const hasGameEnded = gameState.hasGameEnded
  const hasCurrentPlayerWon = gameState.winningPlayerId === 0 ? true : false

  return (
    <div
      className='w-screen h-screen fixed top-0 left-0 right-0 z-30 bg-black flex flex-col items-center justify-start'
      id='game-play'
    >
      {!hasGameStarted ? (
        <IntroScreen handleMatch={handleMatch} canPlayWithAi={canPlayWithAi} />
      ) : null}

      {hasGameEnded && canHandleGameEnd ? (
        <div className='absolute w-screen h-screen top-0 left-0 z-[40] font-game  bg-black/70 flex flex-col justify-center items-center'>
          <h3 className='text-4xl text-white text-center mb-8'>
            {hasCurrentPlayerWon ? (
              <span>
                Congratulations!
                <br />
                You have won this game.
              </span>
            ) : (
              <span>
                Uh-oh!
                <br />
                You have lost this game.
              </span>
            )}
          </h3>
          <button
            className='p-4 bg-white text-black uppercase hover:text-primary-focus justify-center'
            onClick={handleBackToGamePage}
          >
            Go back
          </button>
        </div>
      ) : null}

      <Videos videoType={videoType} handleVideoEnd={handleVideoEnd} />

      {/* Show Enemy Health */}
      {hasGameStarted ? (
        <div className='absolute z-[30] top-0 font-game py-4 px-8 bg-black/30 text-white font-medium'>
          <div className='my-4 flex items-start justify-between'>
            <h4 className='mr-8'>Ememy&apos;s Health :</h4>
            <HealthIndicator
              updatedHealth={gameState.enemyHealth}
              canUpdateHealth={canShowTimer || canHandleGameEnd}
            />
          </div>
        </div>
      ) : null}

      {/* TODO: Better semantic tags */}
      {hasGameStarted ? (
        <div className='absolute z-[30] bottom-0 font-game py-4 px-8 bg-black/30 text-white font-medium'>
          {isWaitingForEnemyMove ? (
            <div className='flex flex-col items-center justify-center mb-8'>
              <p className='text-xs'>...Waiting for your enemy Samurai...</p>
            </div>
          ) : null}

          {/* Display timer until player locks an action */}
          {canShowTimer ? (
            <div>
              <div className='mb-2'>
                Lock your next move in&nbsp;
                <Timer durationInSeconds={20} handleTimerEnd={handleTimerEnd} />
                &nbsp;seconds
              </div>
              <div
                className={`${isActionChosen && !isActionLocked ? '' : 'invisible'} text-center`}
              >
                <button
                  className='p-4 bg-white text-black uppercase hover:text-primary-focus'
                  onClick={handleActionLock}
                >
                  Lock {action.type}
                </button>
              </div>
            </div>
          ) : null}

          <h4 className='mb-4 text-center'>
            {isActionChosen && isActionLocked ? (
              <>
                You have chosen to{' '}
                <span className='uppercase text-primary-focus bg-white p-1'>{action.type}</span>
              </>
            ) : null}
          </h4>

          <div className='mb-8 flex items-start justify-between'>
            <h4>Health :</h4>
            <HealthIndicator
              updatedHealth={gameState.playerHealth}
              canUpdateHealth={canShowTimer || canHandleGameEnd}
            />
          </div>
          <div className='flex items-center justify-between'>
            <div
              className={`w-32 h-32 flex flex-col items-center justify-center border-2 rounded-full mr-12 ${
                action.type === ACTION_TYPES.Attack
                  ? 'bg-white text-black'
                  : isActionLocked
                  ? ''
                  : 'hover:text-primary-focus hover:border-primary-focus hover:cursor-pointer'
              }`}
              onClick={() => handleActionSelect(ACTION_TYPES.Attack)}
            >
              <div className='p-2 text-4xl'>
                <GiStripedSword />
              </div>
              <p className='font-bold'>ATTACK</p>
            </div>

            <div
              className={`w-32 h-32 flex flex-col items-center justify-center border-2 rounded-full mr-12 ${
                action.type === ACTION_TYPES.Defend
                  ? 'bg-white text-black'
                  : isActionLocked
                  ? ''
                  : 'hover:text-primary-focus hover:border-primary-focus hover:cursor-pointer'
              }`}
              onClick={() => handleActionSelect(ACTION_TYPES.Defend)}
            >
              <div className='p-2 text-4xl'>
                <GiVibratingShield />
              </div>
              <p className='font-bold'>DEFEND</p>
            </div>

            <div
              className={`w-32 h-32 flex flex-col items-center justify-center border-2 rounded-full ${
                action.type === ACTION_TYPES.Break
                  ? 'bg-white text-black'
                  : isActionLocked
                  ? ''
                  : 'hover:text-primary-focus hover:border-primary-focus hover:cursor-pointer'
              }`}
              onClick={() => handleActionSelect(ACTION_TYPES.Break)}
            >
              <div className='p-2 text-4xl'>
                <GiSwordBreak />
              </div>
              <p className='font-bold'>BREAK</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default GamePlay

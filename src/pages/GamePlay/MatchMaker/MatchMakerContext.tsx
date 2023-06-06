
interface PropTypes {
  canRetry: boolean
  handleRetry: () => void
}

const MatchMakerContext = ({canRetry, handleRetry }: PropTypes) => {
  const retryJSX=
  <div className='flex flex-col items-center'>
    <p className='text-white mb-4'>Oops, could not find a Samurai.</p>
    <button
      className={`p-4 bg-white text-black uppercase hover:text-primary-focus justify-center`}
      onClick={handleRetry}
    >
      Retry
    </button>
  </div>

  const matchMakingJSX=
  <div className='text-white'>
    Match making...
  </div>

  return (
    <div className='absolute w-screen h-screen top-0 left-0 z-30 font-game  bg-black flex flex-col items-center'>
      <h3 className='text-6xl mt-16 text-white text-center'>The Ronins Gambit</h3>
      <div className='flex-1 grid place-content-center p-4'>
        {canRetry?retryJSX:matchMakingJSX}
      </div>
    </div>
  )
}

export default MatchMakerContext

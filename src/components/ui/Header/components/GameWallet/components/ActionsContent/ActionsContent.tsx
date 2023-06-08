interface PropTypes {
  userBalance: number
  minimumBalanceToPlay: number
  needToPay: number
  tokenName: string
  handleApproveAndTopup: () => void
  activeTabType: 'deposit' | 'withdraw'
  handleTabChange: (arg0: 'deposit' | 'withdraw') => void
}

const ActionsContent = ({
  userBalance,
  minimumBalanceToPlay,
  tokenName,
  needToPay,
  handleApproveAndTopup,
  activeTabType,
  handleTabChange,
}: PropTypes) => {
  const doesUserHasEnoughBalance = userBalance && userBalance >= minimumBalanceToPlay ? true : false
  let depositContent = null,
    withdrawContent = null

  if (activeTabType === 'deposit') {
    depositContent = (
      <div>
        <h4 className='text-md font-bold mt-2 text-left'>Deposit</h4>
        <p className='mt-2 text-left'>
          This is an upcoming feature. Please give us some time until we ship.
        </p>
      </div>
    )
  } else if (activeTabType === 'withdraw') {
    withdrawContent = (
      <div>
        <h4 className='text-md font-bold mt-2 text-left'>Withdraw</h4>
        <p className='mt-2 text-left'>
          This is an upcoming feature.
          <br />
          Please give us some time until we ship.
        </p>
      </div>
    )
  }

  return (
    <div className='flex items-center justify-center flex-col py-2'>
      <h4 className='text-lg font-bold mt-2 self-start'>Your Game Wallet</h4>
      <p className='text-xs font-medium self-start'>View your ballance, deposit, and withdraw</p>
      <div className='stats shadow bg-primary text-primary-content mt-4'>
        <div className='stat'>
          <div className='stat-title'>Current Balance</div>
          <div className='stat-value'>
            {userBalance} {tokenName}
          </div>
          {/* <div className='stat-desc'>21% more than last month</div> */}
        </div>
      </div>
      <div className='tabs tabs-boxed mt-8'>
        <a
          className={`tab ${activeTabType === 'deposit' ? 'tab-active' : ''}`}
          onClick={() => handleTabChange('deposit')}
        >
          Deposit
        </a>
        <a
          className={`tab ${activeTabType === 'withdraw' ? 'tab-active' : ''}`}
          onClick={() => handleTabChange('withdraw')}
        >
          Withdraw
        </a>
      </div>
      <div className='mt-4 w-full'>
        {activeTabType === 'deposit' ? depositContent : withdrawContent}
      </div>
    </div>
  )
}

export default ActionsContent

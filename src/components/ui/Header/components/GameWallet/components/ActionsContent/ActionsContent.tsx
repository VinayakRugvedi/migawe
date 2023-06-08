interface PropTypes {
  userBalance: number
  minimumBalance: number
  needToPay: number
  tokenName: string
  allowanceValue: number
  isAllowanceApprovalRequired: boolean
  handleApprove: () => void
  handleDeposit: () => void
  activeTabType: 'deposit' | 'withdraw'
  handleTabChange: (arg0: 'deposit' | 'withdraw') => void
  depositAmount: number
  handleDepositAmount: (arg0: React.ChangeEvent<HTMLInputElement>) => void
  validationError: string
  isLoading: boolean
  isError: boolean
}

const ActionsContent = ({
  userBalance,
  minimumBalance,
  tokenName,
  isAllowanceApprovalRequired,
  allowanceValue,
  needToPay,
  handleApprove,
  handleDeposit,
  activeTabType,
  handleTabChange,
  depositAmount,
  handleDepositAmount,
  validationError,
  isLoading,
  isError,
}: PropTypes) => {
  const doesUserHasEnoughBalance = userBalance && userBalance >= minimumBalance ? true : false

  const isValidationErrorPresent = validationError.length > 0 ? true : false
  let depositContent = null,
    withdrawContent = null

  if (activeTabType === 'deposit') {
    depositContent = (
      <div className='flex flex-col items-center justify-center'>
        <h4 className='text-md font-bold mt-2 self-start'>Deposit</h4>
        <p className='text-xs font-medium self-start'>
          Your approved allowance is {allowanceValue} {tokenName}
        </p>
        <div className='mt-2 text-left'>
          {isAllowanceApprovalRequired ? (
            <span>You need to approve the allowance first and then deposit</span>
          ) : (
            <div className='form-control w-full max-w-xs font-medium'>
              <label className='label'>
                <span className='label-text'>Please enter the amount you want to deposit</span>
                {/* <span className='label-text-alt'>Top Right label</span> */}
              </label>
              <input
                type='number'
                placeholder='Amount here...'
                className='input input-bordered w-full max-w-xs'
                value={depositAmount}
                onChange={handleDepositAmount}
              />
              <label className='label'>
                <span className='label-text-alt'>
                  Min: {minimumBalance} {tokenName}
                </span>
                <span className='label-text-alt'>
                  Max: {allowanceValue} {tokenName}
                </span>
              </label>
              <label className={`label pt-0 ${isValidationErrorPresent ? '' : 'invisible'}`}>
                <span className='label-text-alt text-primary'>
                  {isValidationErrorPresent ? validationError : '-'}
                </span>
              </label>
            </div>
          )}
        </div>
        {isAllowanceApprovalRequired ? (
          <button className='btn brn-wide mt-4 justify-center' onClick={handleApprove}>
            Approve
          </button>
        ) : (
          <button className='btn mt-4 justify-center' onClick={handleDeposit} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Deposit'}
          </button>
        )}
      </div>
    )
  } else if (activeTabType === 'withdraw') {
    withdrawContent = (
      <div className='flex flex-col items-center justify-center'>
        <h4 className='text-md font-bold mt-2 self-start'>Withdraw</h4>
        <p className='mt-2 text-left'>
          This is an upcoming feature. Meanwhile you can consider withdrawing from Etherscan. Please
          click on the button below to be redirected.
        </p>
        <a
          className='btn btn-wide mt-4 justify-center'
          href='https://sepolia.etherscan.io/address/0xa69bd215ab75bdf55d4dab9734c74fea212d7f4c#writeContract'
          target='_black'
          rel='noopener noreferrer'
        >
          Withdraw
        </a>
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
          <div className='stat-desc mt-1'>
            Min balance: {minimumBalance} {tokenName}
          </div>
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

import gameWalletABI from './gameWalletABI.json'
import erc20ABI from './erc20ABI.json'
import rpsGameABI from './rpsGameABI.json'
const UI = {
  HeaderHeightInPx: 125,
  tokenName: 'TST',
  MINIMUM_BALANCE:10,
  WAGER_AMOUNT:1
}

const RONIN_GAMBIT = {
  START_HEALTH: 5,
  MATCH_MAKER_URL: 'https://simple-mm.cyclic.app/',
}

const CONTRACTS = {
  rpsGameAddress: '0xBf0E4084b81e5788A0d1DB94A2B97A91b82B4f78',
  rpsGameABI: rpsGameABI,
  gameWalletAddress: '39bc12763882A3959E8BFf8A41c24f0381BCBF52',
  gameWalletABI: gameWalletABI,
  erc20Address: 'a69bD215aB75BDf55d4DAB9734c74fea212D7f4C', //TODO: get from gameWallet contract
  erc20ABI: erc20ABI,
}



export { UI, RONIN_GAMBIT, CONTRACTS }

import gameWalletABI from './gameWalletABI.json'
import erc20ABI from './erc20ABI.json'

const UI = {
  HeaderHeightInPx: 125,
}

const RONIN_GAMBIT = {
  START_HEALTH: 5,
  MATCH_MAKER_URL: 'http://simple-mm.cyclic.app/',
}

const CONTRACTS = {
  gameWalletAddress: '39bc12763882A3959E8BFf8A41c24f0381BCBF52',
  gameWalletABI: gameWalletABI,
  erc20Address: 'a69bD215aB75BDf55d4DAB9734c74fea212D7f4C',
  erc20ABI: erc20ABI,
}

export { UI, RONIN_GAMBIT, CONTRACTS }

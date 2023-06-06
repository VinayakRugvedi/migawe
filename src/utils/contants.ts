import gameWalletABI from "./gameWalletABI.json";
import erc20ABI from "./erc20ABI.json";

const UI = {
  HeaderHeightInPx: 125,
}

const START_HEALTH = 5
const MatchMakerUrl = 'http://simple-mm.cyclic.app/'

const CONTRACTS={
  gameWalletAddress: "39bc12763882A3959E8BFf8A41c24f0381BCBF52",
  gameWalletABI:gameWalletABI,
  //TODO: get from gameWallet contract
  erc20Address: "a69bD215aB75BDf55d4DAB9734c74fea212D7f4C",
  erc20ABI:erc20ABI
}
export { UI, START_HEALTH, MatchMakerUrl,CONTRACTS }

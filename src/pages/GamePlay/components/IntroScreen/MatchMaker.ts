import { Signer, ethers } from 'ethers'
import Peer, { DataConnection } from 'peerjs'
import { RONIN_GAMBIT } from 'utils/constants'

class MatchMaker {
  peer: Peer
  proxyWallet: ethers.Wallet
  constructor(debug: 0 | 1 | 2 | 3 = 0) {
    this.proxyWallet = ethers.Wallet.createRandom()
    this.peer = new Peer(this.proxyWallet.address, {
      host: 'peerjs.92k.de', // TODO: use own peerjs server,
      secure: true,
      debug: debug,
    })
    this.peer.on('error', (err) => {
      console.error('peer connection error: ' + err)
    })
  }
  /**
   *
   * @param wager amount to wager
   * @param validUntil the time until the game request is valid
   */
  findMatch(
    wager: number,
    signer: Signer,
    validUntil: number,
  ): Promise<{ conn: DataConnection; playerId: 0 | 1 }> {
    return new Promise((resolve, reject) => {
      let connected = false
      // call match making server
      this.getMatchMackerServerResponse(wager, signer, validUntil).then(async (response) => {
        console.log('response', response)
        if (response.wait) {
          console.log('waiting for opponent')
          this.peer.on('connection', (connection) => {
            if (connected) {
              // this can happen when a 3rd player tries to connect
              console.warn('Already connected to an opponent')
              return
            }
            // TODO verifiy onChain that opponent is the one we want to play with
            connected = true
            console.log('Connected to opponent ID', connection.peer)
            resolve({ conn: connection, playerId: 0 })
          })
          // TODO:
        } else {
          const opponentAddr = response.opponent.addr
          const opponentProxyAddr = response.opponent.proxyAddr
          const opponentValidUntil = response.opponent.validUntil
          const opponentSign = response.opponent.sign
          // TODO: call startGame onChain before connecting to opponent

          const connection = this.peer.connect(opponentProxyAddr, { reliable: true })
          connection.on('open', () => {
            connected = true
            console.log('connected with:', opponentProxyAddr)
            resolve({ conn: connection, playerId: 1 })
          })
          connection.on('error', (err) => {
            reject(err)
            console.error('peer connection error: ' + err)
          })
        }
      })
    })
  }

  private async getMatchMackerServerResponse(
    wager: number,
    signer: Signer,
    validUntil: number,
  ): Promise<{ wait: boolean; opponent?: any }> {
    const playerAddress = await signer.getAddress()
    const gameRequestHash = ethers.utils.solidityKeccak256(
      ['address', 'address', 'uint256', 'uint256'],
      [playerAddress, this.proxyWallet.address, wager.toString(), validUntil.toString()],
    )
    console.log('gameRequestHash', gameRequestHash)
    const sign = await signer.signMessage(ethers.utils.arrayify(gameRequestHash))
    console.log('sign', sign)
    const param = JSON.stringify({
      addr: playerAddress,
      proxyAddr: this.proxyWallet.address,
      wager: wager,
      validUntil: validUntil,
      sign: sign,
    })
    console.log('param', param)
    return await fetch(RONIN_GAMBIT.MATCH_MAKER_URL + 'friendly/' + param)
      .then((res) => res.json())
      .catch((error) => {
        console.log(error, 'ERROR in getMatchMackerServerResponse')
      })
  }
}
export default MatchMaker

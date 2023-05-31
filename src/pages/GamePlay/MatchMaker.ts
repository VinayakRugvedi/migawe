
import { ethers } from "ethers";
import Peer,{DataConnection} from "peerjs";

class MatchMaker{
  peer: Peer;
  wallet: ethers.Wallet;
  peerId: string;
  connected: boolean=false;
  conn: DataConnection;
  firstMover: "player" | "opponent";
  findOpponent: Promise<DataConnection>;
  constructor(){
    this.wallet = ethers.Wallet.createRandom();
    this.peer = new Peer(this.wallet.address.toLowerCase().substring(2, 5), {
      host: "peerjs.92k.de", // TODO: use own peerjs server,
      secure: true,
      debug: 2,
    });
    this.peer.on("error", (err) => {
      console.error("Network: Network/peer error: " + err);
    });
    this.findOpponent=new Promise((resolve,reject)=>{
      this.peer.on("connection", (connection) => {
        if (this.connected) {
          // this can happen when a 3rd player tries to connect
          console.warn("Network: Already connected to an opponent");
          return;
        }
        this.conn = connection;
        this.connected = true;
        this.firstMover = "player"; // TODO implement random firstMover
        console.log("Network: Connected to opponent ID", connection.peer);
        resolve(connection);
      });
      //on join
      let peerId="";//TODO: match making server
      let connection = this.peer.connect(peerId, { reliable: true });
      connection.on("open", () => {
        this.connected = true;
        this.conn = connection;
        console.log("connected with:", peerId);
        this.firstMover = "opponent"; // TODO implement random firstMover
        resolve(connection);
      });
      connection.on("error", (err) => {
        console.error("Network/peerConn, not innitiator error: " + err);
      });
    });
   
  }
}
export default MatchMaker;
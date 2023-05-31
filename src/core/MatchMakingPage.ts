
  import type { DataConnection } from "peerjs";
  import Peer from "peerjs";
  import { ethers } from "ethers";
  
  let wallet = ethers.Wallet.createRandom();
  console.log("Your Hot wallet", { wallet });
  const pvtkey = wallet.privateKey;

  let peer = new Peer(wallet.address.toLowerCase().substring(2, 5), {
    host: "peerjs.92k.de", // TODO: use own peerjs server, https://github.com/Raunaque97/peerjs-server#running-in-google-app-engine
    secure: true,
    debug: 2,
  });
  let conn: DataConnection = undefined;
  let connected = false;
  let opponentId = "";
  let firstMover: "player" | "opponent";

  peer.on("error", (err) => {
    console.error("Network: Network/peer error: " + err);
  });
  peer.on("connection", (connection) => {
    if (connected) {
      // this can happen when a 3rd player tries to connect
      console.warn("Network: Already connected to an opponent");
      return;
    }
    conn = connection;
    connected = true;
    firstMover = "player"; // TODO implement random firstMover
    console.log("Network: Connected to opponent ID", connection.peer);
  });

  function onJoin(peerId: string) {
    // console.log("onJoin", peerId);
    let connection = peer.connect(peerId, { reliable: true });
    connection.on("open", () => {
      connected = true;
      conn = connection;
      console.log("connected with:", peerId);
      firstMover = "opponent"; // TODO implement random firstMover
    });
    connection.on("error", (err) => {
      console.error("Network/peerConn, not innitiator error: " + err);
    });
  }

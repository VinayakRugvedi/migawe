<script lang="ts">
  import type { DataConnection } from "peerjs";
  import Peer from "peerjs";
  import Web3 from "web3";
  import GamePage from "./GamePage.svelte";
  import Player from "../core/agents/Player";
  import NetworkedAgent from "../core/agents/NetworkedAgent";

  export let onExit: () => void;

  const web3 = new Web3();
  // generate a new wallet, TODO read from local storage if exists
  let wallet = web3.eth.accounts.create();
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
</script>

{#if connected}
  <GamePage
    player={new Player()}
    opponent={new NetworkedAgent(conn)}
    {firstMover}
    onExit={() => {
      // close connection
      conn.close();
      connected = false;
    }}
  />
{:else}
  <h3>share your ID with others to connect, or join using other's ID</h3>
  <p>Your ID: {peer.id}</p>
  <div style="display:flex">
    <input type="text" bind:value={opponentId} />
    <button on:click={() => onJoin(opponentId)}>join</button>
  </div>
  <button on:click={onExit}>Back</button>
{/if}

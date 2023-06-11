# Migawe

> Migawe uniquely combines games, rewards, branding, and engagement enhancement for dApps to drive web3 adoption, unite brands and users, and create a thriving ecosystem

The current stable version of the product is [live here!](https://www.migawe.xyz/)

**NOTE: The complete stable production code is present at the develop branch. [Switch to develop branch if you haven't](https://github.com/VinayakRugvedi/migawe/tree/develop)**

_We are in the process of sorting a few stuff and merging the code from develop to master_

## Introduction

**This repository contains the frontend code of https://www.migawe.xyz/**

If you are specifically interested in checking out how smart contracts are being integrated, you can checkout the following sections of code:

1. [Game Wallet Implementation](https://github.com/VinayakRugvedi/migawe/tree/develop/src/components/ui/Header/components/GameWallet)
2. [Wallet Actions Implementation](https://github.com/VinayakRugvedi/migawe/tree/develop/src/pages/RoninsGambit/components/ActionsModal)

We are using [ThirdWeb React SDK](https://portal.thirdweb.com/react)

### Other resources

The following are the resources which make this product complete and functional:

1. [Game Contract Development](https://github.com/Raunaque97/RPS_Game_Contracts)
2. [Game Logic & zk circuits Development] (https://github.com/Raunaque97/RPS_svelte)
3. [Match Making Server](https://github.com/Raunaque97/SimpleMatchMaker)


## Running it locally

Follow the steps mentioned below:

1. Clone this repository

2. Checkout to develop branch
   `git checkout develop`

3. Install dependencies
   `npm install`

4. Start the application
   `npm run start`

5. Open `localhost:3000` on your browser

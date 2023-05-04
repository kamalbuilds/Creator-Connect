require("@nomicfoundation/hardhat-toolbox");


require("dotenv").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY


module.exports = {
    solidity: "0.8.4",
    networks: {
        hyperspace: {
        // url: "https://filecoin-hyperspace.chainstacklabs.com/rpc/v1",
        url: "https://rpc.ankr.com/filecoin_testnet",
        accounts: [PRIVATE_KEY],
      },
    },
  };
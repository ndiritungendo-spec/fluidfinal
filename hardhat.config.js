require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { ALCHEMY_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.28",
  networks: {
    polygon: {
      url: ALCHEMY_URL || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    amoy: {
      url: "https://polygon-amoy.g.alchemy.com/v2/YOUR_API_KEY",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_API_KEY || "",
    },
  },
};
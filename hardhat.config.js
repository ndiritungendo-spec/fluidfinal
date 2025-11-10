require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

module.exports = {
  solidity: "0.8.20",
  networks: {
    polygon: {
      url: process.env.ALCHEMY_URL || "https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_API_KEY || "YOUR_POLYGONSCAN_API_KEY",
    },
  },
};
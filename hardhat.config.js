require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const ALCHEMY_URL = process.env.ALCHEMY_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "";

module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "polygon",
  networks: {
    polygon: {
      url: ALCHEMY_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
  },
};
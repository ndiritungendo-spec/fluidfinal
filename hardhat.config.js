require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { ALCHEMY_URL, PRIVATE_KEY, POLYGONSCAN_API_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  networks: {
    hardhat: {},
    polygon: {
      url: ALCHEMY_URL || "",
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
      chainId: 137,
    },
    polygonMumbai: {
      url: ALCHEMY_URL || "",
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
      chainId: 80001,
    },
  },
  etherscan: {
    apiKey: {
      polygon: POLYGONSCAN_API_KEY || "",
      polygonMumbai: POLYGONSCAN_API_KEY || "",
    },
  },
};
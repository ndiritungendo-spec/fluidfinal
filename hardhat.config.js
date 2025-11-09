require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { ALCHEMY_URL, PRIVATE_KEY, POLYGONSCAN_API_KEY } = process.env;

if (!ALCHEMY_URL || !PRIVATE_KEY) {
  console.warn(
    "Warning: ALCHEMY_URL or PRIVATE_KEY is not set in .env. Deployment will fail."
  );
}

module.exports = {
  solidity: "0.8.28",
  networks: {
    polygon: {
      url: ALCHEMY_URL || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    // Example custom network – make sure to replace YOUR_API_KEY with a valid key
    amoy: {
      url: process.env.AMOY_URL || "", // safer to define in .env
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      polygon: POLYGONSCAN_API_KEY || "",
    },
  },
};
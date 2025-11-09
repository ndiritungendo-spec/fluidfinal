require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { ALCHEMY_URL, PRIVATE_KEY, POLYGONSCAN_API_KEY, AMOY_URL } = process.env;

if (!ALCHEMY_URL || !PRIVATE_KEY) {
  throw new Error(
    "ALCHEMY_URL or PRIVATE_KEY is not set. Please define them in .env or GitHub secrets."
  );
}

module.exports = {
  solidity: "0.8.28",
  networks: {
    polygon: {
      url: ALCHEMY_URL,
      accounts: [PRIVATE_KEY] // Hardhat requires exactly 32-byte hex string
    },
    amoy: {
      url: AMOY_URL || "",
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      polygon: POLYGONSCAN_API_KEY || ""
    }
  }
};
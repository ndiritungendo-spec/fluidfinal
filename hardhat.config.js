require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.28" },  // Add this compiler
      { version: "0.8.20" }   // Optional: keep other versions
    ]
  },
  networks: {
    polygon: {
      url: process.env.ALCHEMY_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
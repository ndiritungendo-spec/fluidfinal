require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.20" } // matches your FluidToken.sol pragma
    ]
  },
  networks: {
    polygon: {
      url: process.env.ALCHEMY_URL,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};
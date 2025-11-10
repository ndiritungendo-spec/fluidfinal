const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const foundationWallet = process.env.FOUNDATION_WALLET;
  const relayerWallet = process.env.RELAYER_WALLET;
  const signers = process.env.SIGNERS.split(",");
  const requiredApprovals = parseInt(process.env.REQUIRED_APPROVALS);

  const FluidToken = await hre.ethers.getContractFactory("FluidToken");
  const token = await FluidToken.deploy(foundationWallet, relayerWallet, signers, requiredApprovals);

  await token.deployed();
  console.log("FluidToken deployed at:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
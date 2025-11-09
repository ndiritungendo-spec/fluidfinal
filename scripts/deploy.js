const { ethers } = require("hardhat");

async function main() {
  const FOUNDATION_WALLET = process.env.FOUNDATION_WALLET;
  const RELAYER_WALLET = process.env.RELAYER_WALLET;
  const REQUIRED_APPROVALS = parseInt(process.env.REQUIRED_APPROVALS);

  let INITIAL_SIGNERS;
  try {
    INITIAL_SIGNERS = JSON.parse(process.env.INITIAL_SIGNERS);
    if (!Array.isArray(INITIAL_SIGNERS) || INITIAL_SIGNERS.length === 0) {
      throw new Error("INITIAL_SIGNERS must be a non-empty array");
    }
  } catch (err) {
    throw new Error("Failed to parse INITIAL_SIGNERS: " + err.message);
  }

  console.log("Deploying FluidToken...");
  console.log("Foundation:", FOUNDATION_WALLET);
  console.log("Relayer:", RELAYER_WALLET);
  console.log("Signers:", INITIAL_SIGNERS);
  console.log("Required approvals:", REQUIRED_APPROVALS);

  const FluidToken = await ethers.getContractFactory("FluidToken");
  const token = await FluidToken.deploy(
    FOUNDATION_WALLET,
    RELAYER_WALLET,
    INITIAL_SIGNERS,
    REQUIRED_APPROVALS
  );

  await token.deployed();
  console.log("FluidToken deployed to:", token.address);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
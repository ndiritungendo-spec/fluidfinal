const { ethers } = require("hardhat");

async function main() {
  // Read constructor arguments from environment variables
  const FOUNDATION_WALLET = process.env.FOUNDATION_WALLET;
  const RELAYER_WALLET = process.env.RELAYER_WALLET;
  const REQUIRED_APPROVALS = parseInt(process.env.REQUIRED_APPROVALS);

  if (!FOUNDATION_WALLET || !RELAYER_WALLET || !REQUIRED_APPROVALS) {
    throw new Error("Missing FOUNDATION_WALLET, RELAYER_WALLET, or REQUIRED_APPROVALS in environment");
  }

  // Parse initial signers JSON array
  let INITIAL_SIGNERS;
  try {
    INITIAL_SIGNERS = JSON.parse(process.env.INITIAL_SIGNERS);
    if (!Array.isArray(INITIAL_SIGNERS) || INITIAL_SIGNERS.length === 0) {
      throw new Error("INITIAL_SIGNERS must be a non-empty array");
    }
  } catch (err) {
    throw new Error("Failed to parse INITIAL_SIGNERS environment variable: " + err.message);
  }

  console.log("Deploying FluidToken with:");
  console.log("Foundation Wallet:", FOUNDATION_WALLET);
  console.log("Relayer Wallet:", RELAYER_WALLET);
  console.log("Initial Signers:", INITIAL_SIGNERS);
  console.log("Required Approvals:", REQUIRED_APPROVALS);

  // Get the contract factory
  const FluidToken = await ethers.getContractFactory("FluidToken");

  // Deploy the contract with constructor arguments
  const token = await FluidToken.deploy(
    FOUNDATION_WALLET,
    RELAYER_WALLET,
    INITIAL_SIGNERS,
    REQUIRED_APPROVALS
  );

  // Wait for deployment to finish
  await token.deployed();

  console.log("FluidToken deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
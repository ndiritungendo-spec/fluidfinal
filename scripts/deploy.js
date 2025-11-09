require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const FOUNDATION_WALLET = process.env.FOUNDATION_WALLET;
  const RELAYER_WALLET = process.env.RELAYER_WALLET;
  const INITIAL_SIGNERS = JSON.parse(process.env.INITIAL_SIGNERS || "[]");
  const REQUIRED_APPROVALS = parseInt(process.env.REQUIRED_APPROVALS || "0");

  if (!FOUNDATION_WALLET || !RELAYER_WALLET || INITIAL_SIGNERS.length === 0 || REQUIRED_APPROVALS <= 0) {
    throw new Error("Missing FOUNDATION_WALLET, RELAYER_WALLET, INITIAL_SIGNERS, or REQUIRED_APPROVALS in environment");
  }

  console.log("🚀 Starting Fluid Token (FLD) deployment...");

  const FluidToken = await ethers.getContractFactory("FluidToken");
  const token = await FluidToken.deploy(
    FOUNDATION_WALLET,
    RELAYER_WALLET,
    INITIAL_SIGNERS,
    REQUIRED_APPROVALS
  );

  await token.deployed();

  console.log("✅ FluidToken deployed to:", token.address);

  const totalSupply = await token.totalSupply();
  console.log("💧 Total supply:", ethers.formatEther(totalSupply), "FLD");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
const fs = require("fs");
const hre = require("hardhat");
require("dotenv").config();

async function main() {
  console.log("🚀 Starting FluidToken deployment...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("👤 Deployer:", deployer.address);

  const foundationWallet = process.env.FOUNDATION_WALLET;
  const relayerWallet = process.env.RELAYER_WALLET;
  const signers = [process.env.SIGNER1, process.env.SIGNER2];
  const requiredApprovals = Number(process.env.REQUIRED_APPROVALS) || 2;

  console.log("📦 Constructor arguments:");
  console.log({ foundationWallet, relayerWallet, signers, requiredApprovals });

  const FluidToken = await hre.ethers.getContractFactory("FluidToken");
  const token = await FluidToken.deploy(
    foundationWallet,
    relayerWallet,
    signers,
    requiredApprovals
  );
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log(`✅ FluidToken deployed at: ${address}`);

  fs.writeFileSync("deploy.log", address, { encoding: "utf8" });

  console.log("⏳ Waiting 5 blocks for Polygonscan...");
  await token.deploymentTransaction().wait(5);

  console.log("🔍 Verifying contract...");
  try {
    await hre.run("verify:verify", {
      address,
      constructorArguments: [foundationWallet, relayerWallet, signers, requiredApprovals],
    });
    console.log("✅ Verification successful!");
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log("ℹ️ Contract already verified on Polygonscan.");
    } else {
      console.error("❌ Verification failed:", error.message);
    }
  }
}

main().catch((err) => {
  console.error("❌ Deployment failed:", err);
  process.exit(1);
});

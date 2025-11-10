const fs = require("fs");
const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting FluidToken deployment...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("👤 Deploying with account:", deployer.address);
  console.log("💰 Balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  const foundationWallet = "0x1111111111111111111111111111111111111111";
  const relayerWallet = "0x2222222222222222222222222222222222222222";
  const initialSigners = [
    "0x3333333333333333333333333333333333333333",
    "0x4444444444444444444444444444444444444444"
  ];
  const requiredApprovals = 2;

  const FluidToken = await hre.ethers.getContractFactory("FluidToken");
  const token = await FluidToken.deploy(foundationWallet, relayerWallet, initialSigners, requiredApprovals);
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log(`✅ FluidToken deployed at: ${address}`);

  fs.writeFileSync("deploy.log", address, { encoding: "utf8" });
  console.log("📝 Saved deployed address to deploy.log");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
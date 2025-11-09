const hre = require("hardhat");
const fs = require("fs");
require("dotenv").config();

async function main() {
  console.log("🚀 Starting Fluid Token (FLD) deployment...");

  const foundation = process.env.FOUNDATION_WALLET;
  const relayer = process.env.RELAYER_WALLET;
  const signer1 = process.env.SIGNER1;
  const signer2 = process.env.SIGNER2;

  if (!foundation || !relayer || !signer1 || !signer2) {
    throw new Error("❌ Missing environment variables in .env or GitHub Secrets");
  }

  const FluidToken = await hre.ethers.getContractFactory("FluidToken");

  console.log("📦 Deploying contract...");
  const fluid = await FluidToken.deploy(
    foundation,
    relayer,
    [signer1, signer2],
    2 // required approvals
  );

  await fluid.waitForDeployment();
  const address = await fluid.getAddress();

  console.log(`✅ Fluid Token deployed to: ${address}`);

  fs.writeFileSync(
    "deployment-log.txt",
    `Fluid Token deployed to: ${address}\nNetwork: ${hre.network.name}\nTimestamp: ${new Date().toISOString()}\n`
  );

  console.log("📝 Deployment info saved to deployment-log.txt");
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
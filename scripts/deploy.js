const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const foundation = "0x51b88d94a23e91770b2ccc1d24ac6804551e12d2";
  const relayer = "0x96f3d6c8e43518f1f62ff530ebf8ef8faf5b8063";
  const signers = [
    "0x51b88d94a23e91770b2ccc1d24ac6804551e12d2",
    "0x22a978289a5864be1890dac00154a7d343273342",
  ];
  const requiredApprovals = 2;

  const Token = await hre.ethers.getContractFactory("FluidToken");
  const token = await Token.deploy(foundation, relayer, signers, requiredApprovals);

  await token.waitForDeployment();
  console.log("✅ Fluid Token deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;

  const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const contractABI = require("../artifacts/contracts/SelfieToken.sol/SelfieToken.json").abi;
  const contractBytecode = require("../artifacts/contracts/SelfieToken.sol/SelfieToken.json").bytecode;

  const factory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);
  console.log("Deploying SelfieToken...");
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  console.log("Contract deployed at:", contract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

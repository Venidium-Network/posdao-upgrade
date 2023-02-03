require("dotenv").config();
const fs = require('fs');

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require('@openzeppelin/hardhat-upgrades');


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("copy-upgradeable-artifacts", "Copy artificats")
  .addPositionalParam("targetDir")
  .setAction(async (taskArgs, hre) => {
    upgradeableContracts = [
      "ValidatorSetAuRa", 
      "BlockRewardAuRa", 
      "RandomAuRa", 
      "StakingAuRa", 
      "TxPermission", 
      "Certifier", 
      "Governance"
    ]

    for (const contractName of upgradeableContracts) {
      fs.copyFile(
          'artifacts/posdao-contracts/contracts/' + contractName + '.sol/' + contractName + '.json',
          taskArgs.targetDir + '/' + contractName + '.json', (err) => {
        if (err) throw err;
        console.log(contractName + ' copied');
      });
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.5.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      outputSelection: {
        "*": {
          "*": [
            "abi",
            "evm.bytecode",
            "evm.deployedBytecode",
            "evm.methodIdentifiers",
            "metadata",
          ],
          "": ["ast"],
        },
      },
      evmVersion: "constantinople"
    }
  },
  networks: {
    venidiumMainnet: {
      url: "https://rpc.venidium.io:8545",
      accounts: [key1, key2],
      gasPrice: 50000000000,
      chainId: 4919
    }
  },
  paths: {
    sources: process.env.POSDAO_CONTRACTS !== undefined ? process.env.POSDAO_CONTRACTS + "/contracts" : "./contracts",
  }
};

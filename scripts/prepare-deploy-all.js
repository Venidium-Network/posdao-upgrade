const hre = require("hardhat");
const { ethers, upgrades, network } = require("hardhat");
const { getAdminAddress } = require('@openzeppelin/upgrades-core');
var fs = require('fs')


async function main() {
    console.log(`
    Be sure you are running this script on test environment with all in genesis block contracts deployed
    `)

    const ValidatorSetAuRa = await ethers.getContractFactory("ValidatorSetAuRa");
    const Governance = await ethers.getContractFactory("Governance");
    const StakingAuRa = await ethers.getContractFactory("StakingAuRa");
    const BlockRewardAuRa = await ethers.getContractFactory("BlockRewardAuRa");
    const RandomAuRa = await ethers.getContractFactory("RandomAuRa");
    const TxPermission = await ethers.getContractFactory("TxPermission");
    const Certifier = await ethers.getContractFactory("Certifier");
    const Registry = await ethers.getContractFactory("Registry");

    const accounts = await hre.ethers.getSigners();

    specAddresses = {
        ValidatorSetAuRa: "0x1000000000000000000000000000000000000001",
        Governance: "0x6100000000000000000000000000000000000001",
        StakingAuRa: "0x1100000000000000000000000000000000000001",
        BlockRewardAuRa: "0x2000000000000000000000000000000000000001",
        RandomAuRa: "0x3000000000000000000000000000000000000001",
        TxPermission: "0x4000000000000000000000000000000000000001",
        Certifier: "0x5000000000000000000000000000000000000001",
    }

    proxyAddressMappings = {}
    implAddressMappings = {}

    for (const [key, value] of Object.entries(specAddresses)) {
        console.log(`${key}: ${value}`);
        Contract = await ethers.getContractFactory(key);
        console.log("Deploying " + key)
        contract = await upgrades.deployProxy(Contract, [], { initializer: false })
        await contract.deployed()
        proxyAddressMappings[contract.address] = value
        implAddress = await upgrades.erc1967.getImplementationAddress(contract.address);
        implAddressMappings[implAddress] = value.slice(0, -1) + "0"
        // impl = await web3.eth.getStorageAt(randomAuRa.address, '0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103')
    }

    const filename = ".openzeppelin/unknown-4919.json"
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        var result = data

        for (const [key, value] of Object.entries({ ...proxyAddressMappings, ...implAddressMappings })) {
            var re = new RegExp(key, "g");
            result = result.replace(re, value);
        }

        fs.writeFile(filename, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});



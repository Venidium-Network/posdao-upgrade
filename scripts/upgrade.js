const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");

async function main() {
    randomProxyAuRaAddress = "0x3000000000000000000000000000000000000001";
    const RandomAuRaV2 = await ethers.getContractFactory("RandomAuRaV2");

    const accounts = await hre.ethers.getSigners();
    owner = accounts[0];

    console.log(await ethers.provider.getBalance(owner.address))

    proxy = await upgrades.upgradeProxy(
        randomProxyAuRaAddress,
        RandomAuRaV2,
        [
            38,
            "0x1000000000000000000000000000000000000001",
            true
        ],
        {
            initializer: 'initialize'
        }
    );
    await proxy.deployed()

    console.log(await proxy.address);
    console.log(await proxy.extraStuff());
    tx = await proxy.setExtraStuff(1337);
    await tx.wait();
    console.log(await proxy.extraStuff());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});



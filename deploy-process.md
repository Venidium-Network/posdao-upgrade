# 

* Compile `posdao-upgrade`
  * `npx hardhat compile`
* Create `upgradeable-artifacts` directory in `posdao-testnet-prepare`
* Copy artifacts from `posdao-upgrade` to `posdao-testnet-prepare`
  * `npx hardhat copy-upgradeable-artifacts $POSDAO_TESTNET_PREPARE_DIR`
* Run `posdao-testnet-prepare` (which will run `make_spec.js`)
  * update artifact paths




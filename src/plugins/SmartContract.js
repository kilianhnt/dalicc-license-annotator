import Web3 from 'web3';

let web3;

export default class EthereumLicense {


    constructor(address) {
        // Modern dapp browsers...
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            window.ethereum.readOnly = false;
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
            window.ethereum = {
                enable: async () => {
                    return true;
                }
            };
            window.ethereum.readOnly = false;
        }
        // Non-dapp browsers...
        else {
            web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/d242a2dd5c1245c8b022d977c556d7c3'));
            try {
                window.ethereum.readOnly = true;
            } catch (err) {
                // eslint-disable-next-line
                console.log(err);
            }
        }
        this.coreLicenseContract = new web3.eth.Contract([{
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "internalType": "uint256",
                "name": "hashValue",
                "type": "uint256"
            }, {"indexed": false, "internalType": "string", "name": "licenseUri", "type": "string"}],
            "name": "LicenseChanged",
            "type": "event"
        }, {
            "constant": false,
            "inputs": [{"internalType": "uint256", "name": "hashValue", "type": "uint256"}, {
                "internalType": "string",
                "name": "licenseUri",
                "type": "string"
            }],
            "name": "licenseData",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{"internalType": "uint256", "name": "hashValue", "type": "uint256"}],
            "name": "getLicenseInformation",
            "outputs": [{"internalType": "bool", "name": "", "type": "bool"}, {
                "internalType": "string",
                "name": "",
                "type": "string"
            }, {"internalType": "address", "name": "", "type": "address"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }], address);
    }

    async license(data, licenseUri, address, f) {
        try {
            await window.ethereum.enable();
        } catch (err) {
            return false;
        }
        const SHA3 = require("crypto-js/sha3");
        return this.coreLicenseContract.methods.licenseData('0x'+SHA3(data, { outputLength: 256 }).toString(), licenseUri)
            .send({from: address}, f);
    }

    getLicenseInformation(data, address, f) {
        const SHA3 = require("crypto-js/sha3");
        return this.coreLicenseContract.methods.getLicenseInformation('0x'+SHA3(data, { outputLength: 256 }).toString())
            .call({from: address}, f);
    }

    getSelectedAddress() {
        return web3.currentProvider.selectedAddress;
    }

    getAllLicenses(hashValue) {
        let getBlockTimestamp = (blockNumber) => {
            return new Promise(
                (resolve, reject) => {
                    web3.eth.getBlock(blockNumber, (error, block) => {
                        if (error) reject(error);
                        resolve(block.timestamp);
                    })
                }
            );
        };
        return new Promise(
            (resolve, reject) => {
                this.coreLicenseContract.events.LicenseChanged({hashValue: hashValue}, {
                    fromBlock: 0,
                    toBlock: 'latest'
                }).get(async (error, result) => {
                    if (error)
                        reject(error);
                    else {
                        var mappedResult = await result.map((logEntry) => {
                            var tmp = {"timestamp": undefined, "licenseUri": logEntry.args.licenseUri};
                            getBlockTimestamp(logEntry.blockNumber).then((ts) => {
                                tmp.timestamp = new Date(ts * 1000);
                            });
                            return tmp;
                        });
                        resolve(mappedResult);
                    }
                });
            }
        );
    }
}

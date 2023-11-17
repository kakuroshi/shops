import Web3 from 'web3';
import abi from "./abi"

const contractAddress = "0x81d14f30B6A0b41DE23F1395a0e0b8E61671877B"
const port = 'http://localhost:8545'

export let myContract, web3;

web3 = new Web3(new Web3.providers.HttpProvider(port));
myContract = new web3.eth.Contract(abi, contractAddress);

export async function getUsers() {
    try {
        const accounts = await myContract.methods.getUsers().call({
            gas: 1000000
        });

        return accounts
    } catch (err) {
        throw err;
    }
}

export async function getStores() {
    try {
        const accounts = await myContract.methods.getStores().call({
            gas: 1000000
        });

        return accounts
    } catch (err) {
        throw err;
    }
}

export async function getUserInfo(address) {
    try {
        const result = await myContract.methods.getUserInfo(address).call({
            gas: 1000000
        });

        const userInfo = {
            login: result.login,
            password: result.password,
            role: result.role,
            shop: result.shop
        };

        return userInfo;
    } catch (err) {
        throw err;
    }
}

export async function registerUser(login, password, address) {
    try {
        const shaPassword = web3.utils.sha3(password);
        const result = await myContract.methods.registerUser(login, shaPassword).send({
            from: address,
            to: contractAddress,
            gas: 1000000
        });
        console.log(result);
    } catch (err) {
        throw err;
    }
}

export async function changeRole(address, addressToChange, role, shopAddress) {
    try {
        if (role === 2) {
            console.log("Прод");
            const result = await myContract.methods.changeRole(addressToChange, role, shopAddress).send({
                from: address,
                gas: 1000000
            });
            console.log(result);
        } else {
            console.log("Чел");
            const result = await myContract.methods.changeRole(addressToChange, role, shopAddress).send({
                from: address,
                gas: 1000000
            });
            console.log(result);
        }
    } catch (err) {
        throw err;
    }
}

export async function answerRequest(address, id) {
    try {
        const result = await myContract.methods.answerRequest(id).send({
            from: address,
            to: contractAddress,
            gas: 1000000
        })
        console.log(result);
    } catch (err) {
        throw err;
    }
}

export async function createStore(address, addressStore, name, town) {
    try {
        const result = await myContract.methods.createStore(addressStore, name, town).send({
            from: address,
            to: contractAddress,
            gas: 1000000
        })
        console.log(result);
    } catch (err) {
        throw err;
    }
}

export async function deleteStore(address, addressStore) {
    try {
        const result = await myContract.methods.deleteStore(addressStore).send({
            from: address,
            to: contractAddress,
            gas: 1000000
        })
        console.log(result);
    } catch (err) {
        throw err;
    }
}

export async function registerAdmin(address, name, addressUser, password) {
    try {
        const newPassword = web3.utils.sha3(password);
        const result = await myContract.methods.registerAdmin(name, addressUser, newPassword).send({
            from: address,
            to: contractAddress,
            gas: 1000000
        })
        console.log(result);
    } catch (err) {
        throw err;
    }
}

export async function requestToSeller(address, addressShop) {
    try {
        const result = await myContract.methods.requestToSeller(addressShop).send({
            from: address,
            to: contractAddress,
            gas: 1000000
        })
        console.log(result);
    } catch (err) {
        throw err;
    }
}

export async function requestToUser(address) {
    try {
        const result = await myContract.methods.requestToUser().send({
            from: address,
            to: contractAddress,
            gas: 1000000
        })
        console.log(result);
    } catch (err) {
        throw err;
    }
}

export async function rateTheStore(address, comment, rating, shop) {
    try {
        const result = await myContract.methods.rateTheStore(comment, rating, shop).send({
            from: address,
            to: contractAddress,
            gas: 1000000
        })
        console.log(result);
    } catch (err) {
        throw err;
    }
}
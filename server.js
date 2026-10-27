const express = require('express');
const Web3 = require('web3');
const cors = require('cors');
const bodyParser = require('body-parser');
const abi = require('./contractABI.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

const web3 = new Web3('http://127.0.0.1:7545');

// 🔴 Replace with your deployed contract address
const contractAddress = "0xee1ea9bde41Ed08AeA6029B16D33dDe8926BeDc2";

const contract = new web3.eth.Contract(abi, contractAddress);

// Add Certificate
app.post('/add', async (req, res) => {
    try {
        const { id, name, course } = req.body;

        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];   // ✅ FIX HERE

        console.log("Using account:", account);

        await contract.methods.addCertificate(id, name, course)
            .send({
                from: account,
                gas: 3000000
            });

        res.send("Certificate Added");
    } catch (error) {
        console.error("ADD ERROR:", error);
        res.status(500).send("Error adding certificate");
    }
});

// Verify Certificate
app.post('/verify', async (req, res) => {
    try {
        const { id } = req.body;

        const cert = await contract.methods.verifyCertificate(id).call();

        res.json({
            name: cert[0],
            course: cert[1],
            exists: cert[2]
        });
    } catch (error) {
        console.error("VERIFY ERROR:", error);
        res.status(500).send("Error verifying certificate");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
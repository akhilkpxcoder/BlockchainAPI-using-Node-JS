const Web3 = require("web3"); //used for connect with etherum network
const sha = require("sha256"); //encrpyt the base64 value
const fs = require("fs"); //read and write files
const env = require("../config/env");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const private_keys = ["6c870445e62c5be45ef6f91b5d37e4888f39033e5948a543b9ccb65ccf34e2f5"];
const provider = () => new HDWalletProvider({
  privateKeys: private_keys,
  providerOrUrl: `${env.host}`,
  numberOfAddresses: 1
});
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
var account = env.address; //address of etherum wallet
var proofofexistence;
const ContractAddress = require("../../blockChainconfig.json").address;
//getting json data of smart contract 
let content = JSON.parse(
  fs.readFileSync("./build/contracts/ProofOfExistence.json", "utf8")
);
//connecting to web3
async function web3Setup() {
    //console.log(content,"content");
  const web3 = createAlchemyWeb3(`${env.host}`, { writeProvider: provider() });
  proofofexistence = await new web3.eth.Contract(content.abi, ContractAddress);
  console.log("Web3 Connected");
  console.log(ContractAddress);
}
//add document to blockchain
const add = (req, res, next) => {
  //console.log(req.body);
  if (req.body.string == null || req.body.string == "undefined") {
    res.status(400).send({
      error: "Could not get expected keyvalues in the JSON Request Payload",
    });
  } else {
    let inp = req.body.string;
    let inpHash = sha(inp);
    proofofexistence.methods
      .doesProofExist("0x" + inpHash)
      .call({ from: account })
      .then((result) => {
        if (result) {
          res.status(400).send({
            error: "hash already exists,try something else",
            status: "Failure",
          });
        } else {
          proofofexistence.methods
            .notarizeHash("0x" + inpHash)
            .send({ from: account })
            .then((result) => {
              const tnx = result;
              if(tnx)
              {
                proofofexistence.methods
                .returnData("0x" + inpHash)
                .call({ from: account })
                .then((result) => {
                  if(result)
                  {
                    let date = new Date(result[0] * 1000);
                    tnx["timestamp"] = date.toString();
                    const response = {
                        transaction: tnx,
                        documentHash: inpHash,
                      };
                      res.status(200).send({ data: response, status: "Success" });
                  }
                });
              }
              
            })
            .catch((err) => {
                res.status(400).send({
                    status: "Failed",
                  });
            });
        }
      });
  }
};
//verify added document
const verify = (req, res, next) => {
  if (req.body.string == null || req.body.string == "undefined") {
    res.status(400).send({
      error: "Could not get expected keyvalues in the JSON Request Payload",
    });
  } else {
    let inp = req.body.string;
    let inpHash = sha(inp);
    proofofexistence.methods
      .doesProofExist("0x" + inpHash)
      .call({ from: account })
      .then((result) => {
        //console.log(result);
        if (result) {
          proofofexistence.methods
            .returnData("0x" + inpHash)
            .call({ from: account })
            .then((result) => {
              //console.log(result[0]);
              const date = new Date(result[0] * 1000);
              res.status(200).send({
                status: "Success",
                timestamp: date.toString(),
                blocknumber: result[1],
              });
            });
        } else {
          res.status(400).send({
            status: "Failed",
            timestamp: 0,
            blocknumber: 0,
          });
        }
      });
  }
};

module.exports = { add, verify, web3Setup };
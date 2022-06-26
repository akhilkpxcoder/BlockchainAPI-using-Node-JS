//import
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const blockChainRouter = require("./src/routes/blockChain");
const { web3Setup } = require("./src/controllers/blockChain");
const { add, verify } = require("./blockChain");
//assign
const app = express();
web3Setup();
const PORT = process.env.PORT || 5000;

//use
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", blockChainRouter);

//route
app.get("/", (req, res) => res.send("Welcome to the Users API!"));
app.post("/add", add);
app.post("/verify", verify);
//host
app.listen(PORT, () => {
  console.log(`Api running on port : http://localhost:${PORT}`);
});

//import
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { add, verify, web3Setup } = require("./blockChain");

//assign
const app = express();
const PORT = process.env.PORT || 5000;

//use
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
web3Setup();

//route
app.get("/", (req, res) => res.send("Welcome to the Users API!"));
app.post("/add", add);
app.post("/verify", verify);
//host
app.listen(PORT, () => {
  console.log(`Api running on port : http://localhost:${PORT}`);
});

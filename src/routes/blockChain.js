const express = require("express");
const { add, verify } = require("../controllers/blockChain");
const router = express.Router();

router.post("/add", add);
router.post("/verify", verify);
module.exports = router;

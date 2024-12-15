const express = require("express");
const router = express.Router();
const authenticate = require("../security/auth");
const path = require("path");
const { readFileSync } = require("fs");

const paymasterPath = path.resolve('./data/paymaster.json');

router.get("/", authenticate, (req, res) => {
  try {
    const paymasterData = JSON.parse(
      readFileSync(paymasterPath, "utf-8")
    ).Paymaster;

    res.json({
      name: paymasterData.name,
      address: paymasterData.address
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error reading paymaster" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { readFileSync } = require("fs");
const path = require("path");
const authenticate = require("../security/auth");

const tokensPath = path.resolve('./data/tokens.json');

router.get("/:tokenId", authenticate, (req, res) => {
  const { tokenId } = req.params;

  try {
    const tokens = JSON.parse(
      readFileSync(tokensPath, "utf-8")
    ).tokens;

    if (!tokens[tokenId]) {
      return res.status(404).json({ error: `Token ${tokenId} not found.` });
    }

    res.json(tokens[tokenId]);
  } catch (error) {
    console.error("Error reading tokens:", error);
    res.status(500).json({ error: "Failed to fetch token." });
  }
});

module.exports = router;
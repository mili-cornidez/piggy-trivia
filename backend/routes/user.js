const express = require("express");
const router = express.Router();
const authenticate = require("../security/auth");
const { readData, writeData } = require("../utils/fileUtils");
const path = require("path");
const { readFileSync } = require("fs");

const tokensPath = path.resolve('./data/tokens.json');

router.get("/", authenticate, (req, res) => {
  const { wallet } = req.user;
  const data = readData();
  
  const user = data.users.find(u => u.wallet === wallet);
  
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  
  res.json({
    wallet: user.wallet,
    level: user.level,
    unmintedTokens: user.unmintedTokens,
    mintedTokens: user.mintedTokens,
  });
});

router.put("/level/:levelId", authenticate, (req, res) => {
  const { wallet } = req.user;
  const { levelId } = req.params;
  const data = readData();

  const user = data.users.find(u => u.wallet === wallet);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const level = parseInt(levelId, 10);
  if (isNaN(level) || level < 1 || level > 3) {
    return res.status(400).json({ error: "Invalid level. Level must be between 1 and 3." });
  }

  if (level === user.level) {
    return res.json({
      wallet: user.wallet,
      level: user.level,
      unmintedTokens: user.unmintedTokens,
      mintedTokens: user.mintedTokens,
    });
  }

  if (user.level + 1 !== level) {
    return res.status(400).json({
      error: `You must complete the previous level first. Current level: ${user.level}.`
    });
  }

  user.level = level;

  let tokens;
  try {
    tokens = JSON.parse(readFileSync(tokensPath, "utf-8")).tokens;
  } catch (error) {
    console.error("Error reading tokens file:", error);
    return res.status(500).json({ error: "Failed to load tokens data." });
  }

  const tokenData = tokens[level];
  if (!tokenData) {
    return res.status(404).json({ error: `Token for level ${level} not found.` });
  }

  const alreadyHasToken = user.unmintedTokens.some(t => t.id === tokenData.id);
  if (!alreadyHasToken) {
    user.unmintedTokens.push({
      id: tokenData.id,
      description: tokenData.name,
      address: tokenData.address,
    });
  }

  writeData(data);

  res.json({
    message: "Level updated and token added successfully",
    wallet: user.wallet,
    level: user.level,
    unmintedTokens: user.unmintedTokens,
    mintedTokens: user.mintedTokens,
  });
});

module.exports = router;
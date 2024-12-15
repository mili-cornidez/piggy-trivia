const jwt = require("jsonwebtoken");
const { readData, writeData } = require("../utils/fileUtils");

const SECRET_KEY = process.env.SECRET_KEY;

const loginUser = (req, res) => {
  const { wallet } = req.body;

  if (!wallet) {
    return res.status(400).json({ error: "Wallet is required." });
  }

  const data = readData();

  let user = data.users.find((u) => u.wallet === wallet);

  if (!user) {
    user = { 
      wallet, 
      level: 0, 
      unmintedTokens: [], 
      mintedTokens: [] 
    };
    data.users.push(user);
    writeData(data);
  } else {
    if (!user.unmintedTokens) user.unmintedTokens = [];
    if (!user.mintedTokens) user.mintedTokens = [];
  }

  const token = jwt.sign({ wallet: user.wallet }, SECRET_KEY, { expiresIn: "1h" });

  res.json({
    message: "Login successful",
    user,
    token,
  });
};

module.exports = { loginUser };

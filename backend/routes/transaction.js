const express = require("express");
const router = express.Router();
const { utils } = require("zksync-web3");
const { ethers, Contract, BigNumber, parseUnits } = require("ethers");
const LevelBadgeNFT = require("../data/abi/LevelBadgeNFT.json");

const app = express();
app.use(express.json());

router.post("/", async (req, res) => {
  const { recipientAddress } = req.body;

  const paymasterAddress = "0xDe6F1e5C07930AA9A65C9781A4885E6Bc76F9C52";
  const tokenAddress = "0x000000000000000000000000000000000000800A";

  const paymasterParams = utils.getPaymasterParams(paymasterAddress, {
    type: "ApprovalBased",
    token: tokenAddress,
    minimalAllowance: parseUnits("0.01",18),
    innerInput: new Uint8Array(),
  });

  try {
    const provider = new ethers.JsonRpcProvider("https://sepolia.era.zksync.dev", 300)
    console.log("ABI cargado:", LevelBadgeNFT.abi);
    const levelBadgesContract = new Contract("0x796C9291a0A0f806151D3c6C631A2d5F9cff06B4", LevelBadgeNFT.abi, provider)
    const txResponse = await levelBadgesContract.mint(recipientAddress,
        {customData: {
            paymasterParams: paymasterParams,
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          },
        }
    );
    const receipt = await txResponse.wait();
    res.json({ success: true, receipt });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

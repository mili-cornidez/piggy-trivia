import { deployContract, getWallet } from "./utils";

export default async function () {
  const wallet = getWallet();
  
  const level1Badge = await deployContract("LevelBadgeNFT", [
    "PiggyEdu Level 1",
    "LEVEL1"
  ]);

  const level2Badge = await deployContract("LevelBadgeNFT", [
    "PiggyEdu Level 2",
    "LEVEL2"
  ]);

  const level3Badge = await deployContract("LevelBadgeNFT", [
    "PiggyEdu Level 3",
    "LEVEL3"
  ]);

  const level1Address = await level1Badge.getAddress();
  const level2Address = await level2Badge.getAddress();
  const level3Address = await level3Badge.getAddress();

  console.log(`Level Badge NFTs deployed:
    Level 1: ${level1Address}
    Level 2: ${level2Address}
    Level 3: ${level3Address}
  `);

  const addresses = {
    level1NFT: level1Address,
    level2NFT: level2Address,
    level3NFT: level3Address,
    timestamp: new Date().toISOString()
  };

  console.log('Contract addresses:', addresses);
}
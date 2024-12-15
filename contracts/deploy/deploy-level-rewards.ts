import { deployContract, getWallet } from "./utils";

export default async function () {
  const wallet = getWallet();

  const rewardTokenAddress = "0xB77eD5C64844c9f1EF1E7A3BdC0bDC410A2Bd87d"; 
  const level1NFTAddress = "0x47620b634308611F0556a0014c34927B77c7aeC3";
  const level2NFTAddress = "0xE7d2746440c9C0EAa047e2b7Dbbc6d449aF5aE31";
  const level3NFTAddress = "0x406325C46cAF98b809b66FC8a91Fc8dDCD2B2526";

  const levelRewardsClaim = await deployContract("LevelRewardsClaim", [
    rewardTokenAddress,
    level1NFTAddress,
    level2NFTAddress,
    level3NFTAddress,
  ]);

  const levelRewardsAddress = await levelRewardsClaim.getAddress();
  console.log("LevelRewardsClaim deployed at:", levelRewardsAddress);
}

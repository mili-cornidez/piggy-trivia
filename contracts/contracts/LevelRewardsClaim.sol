// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LevelRewardsClaim is Ownable {
    IERC20 public rewardToken;

    IERC721 public level1NFT;
    IERC721 public level2NFT;
    IERC721 public level3NFT;

    uint256 public rewardLevel1 = 100 * 10**18;
    uint256 public rewardLevel2 = 200 * 10**18;
    uint256 public rewardLevel3 = 300 * 10**18;

    mapping(address => bool) public hasClaimed;

    constructor(
        address _rewardToken,
        address _level1NFT,
        address _level2NFT,
        address _level3NFT
    ) {
        rewardToken = IERC20(_rewardToken);
        level1NFT = IERC721(_level1NFT);
        level2NFT = IERC721(_level2NFT);
        level3NFT = IERC721(_level3NFT);
    }

    function claim() external {
        require(!hasClaimed[msg.sender], "Already claimed");

        uint256 userReward = 0;

        if (level3NFT.balanceOf(msg.sender) > 0) {
            userReward = rewardLevel3;
        } else if (level2NFT.balanceOf(msg.sender) > 0) {
            userReward = rewardLevel2;
        } else if (level1NFT.balanceOf(msg.sender) > 0) {
            userReward = rewardLevel1;
        }

        require(userReward > 0, "No NFT level found");

        hasClaimed[msg.sender] = true;

        bool success = rewardToken.transfer(msg.sender, userReward);
        require(success, "Token transfer failed");
    }
}

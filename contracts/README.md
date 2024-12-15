# Piggy-Trivia - Tiered Rewards with Paymaster on zkSync Era

## Project Description

* **MyERC20**: A custom ERC20 contract used to distribute rewards to users.
* **LevelBadgeNFT (Level 1, Level 2, Level 3)**: Each NFT represents the level achieved by the user. Higher-level NFTs grant more tokens.
* **LevelRewards**: A contract that releases ERC20 tokens to users based on the level of the NFT they own.
   * Level 1: 100 tokens
   * Level 2: 200 tokens
   * Level 3: 300 tokens
* **MyPaymaster**: A Paymaster that sponsors transactions, removing the need for users to pay gas fees, enhancing UX.

### Example Flow:

1. The user completes a lesson and receives an NFT of a certain level.
2. Calls `claim()` on the `LevelRewards` contract.
3. Depending on the NFT owned, they receive the corresponding amount of ERC20 tokens.
4. The Paymaster can cover the gas cost, allowing the user to claim rewards without using ETH.

## Technologies Used

* **Solidity**: Smart contract language.
* **zkSync Era**: L2 solution with zkRollups offering Account Abstraction.
* **Hardhat**: Development, compilation, and testing framework.
* **OpenZeppelin**: Standard libraries for ERC20, ERC721, and utilities.

## Repository Structure

* `contracts/`
   * `MyERC20.sol`: Custom ERC20 contract.
   * `LevelBadgeNFT.sol`: Contracts for level-based NFTs.
   * `LevelRewards.sol`: Logic for reward distribution based on NFT ownership.
   * `MyPaymaster.sol`: Paymaster logic for sponsoring transactions.
* `deploy/`
   * `deploy-level-badges.ts`: Script to deploy the NFTs.
   * `deploy-paymaster.ts`: Script to deploy and fund the Paymaster.
   * `deploy-level-rewards.ts`: Script to deploy the rewards contract using existing addresses.

## Deployment Steps

1. **Install dependencies:**

   ```bash
   yarn install
   ```

2. **Compile contracts:**

    ```bash
   yarn compile
   ```

3. **Deploy level NFTs:**

    ```bash
   yarn deploy-level-badges
   ```
    This will output the addresses for Level 1, Level 2, and Level 3 NFTs.

4. **Deploy Paymaster:**

    ```bash
   yarn deploy-paymaster
   ```
    This script will deploy the Paymaster and fund it with ETH and tokens.

5. **Deploy LevelRewards:** Adjust the addresses for ERC20 and NFTs in `deploy-level-rewards.ts`, then:

    ```bash
   yarn deploy-level-rewards
   ```

## Usage

1. **Claim Rewards:** A user with an NFT calls `claim()` on `LevelRewards`.
    - If they own Level 1: They receive 100 tokens.
    - If they own Level 2: They receive 200 tokens.
    - If they own Level 3: They receive 300 tokens.

2. **Paymaster:** If the Paymaster is set up, user transactions can be sponsored. This means no ETH is needed, improving the experience.

## Environment Variables
Copy `.env.example` to `.env` and add your private key:

    ```bash
    WALLET_PRIVATE_KEY=your_private_key
    ```

This ensures that keys are never directly exposed in the code.

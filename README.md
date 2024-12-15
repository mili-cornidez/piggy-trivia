# PiggyTrivia

## Project Description

**PiggyTrivia** is a gamified educational platform designed to teach personal finance to children and teenagers (ages 5–18). It combines interactive learning, tokenized rewards, and frictionless transactions powered by ZKSync Era technologies, including Account Abstraction (AA) and Paymasters.

---

## Key Technologies

- **Frontend**: Next.js
- **Backend**: Node.js + Express
- **Smart Contracts**: Solidity, Hardhat
- **Blockchain**: ZKSync Era
- **Authentication**: ZKSync SSO

---

## Core Features

1. **Keyless Login (ZKSync SSO)**:
   - Secure and seamless authentication with wallets powered by Account Abstraction.

2. **Gamification**:
   - Users progress through educational levels by completing financial quizzes.
   - Each level unlocks a **reward chest** (ERC-20 tokens deposited by parents).

3. **Tokenized Rewards**:
   - Smart contracts verify users' progress and mint an ERC-721 NFT as proof of achievement.
   - Upon claiming rewards, the contract releases ERC-20 tokens.

4. **Gasless User Experience**:
   - Transactions are sponsored by Paymasters, eliminating the need for native ETH.

---

## Repository Structure

### Repositories
   > These repositories were developed separately but have been consolidated for clarity and organization in the final delivery.
> 
- [Backend Repository](https://github.com/mili-cornidez/piggy-edu)
- [Smart Contracts Repository](https://github.com/mili-cornidez/piggy-contracts)
- [Frontend Repository](https://github.com/manuelbenitez/piggy-app)

```
/
|-- frontend/        # User interface (Next.js)
|-- backend/         # REST API for quizzes and tokens (Node.js)
|-- contracts/       # Smart contracts (Solidity)
|-- README.md        # General documentation
```

---

## Setup

### Frontend

1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   npm install
   npm start
   ```
2. The API will be available at [http://localhost:3001](http://localhost:3001).

### Contracts

1. Navigate to the `contracts/` directory:
   ```bash
   cd contracts
   npm install
   ```
2. Compile and deploy the contracts:
   ```bash
   npx hardhat compile
   npx hardhat deploy-zksync --script deploy-paymaster.ts
   npx hardhat deploy-zksync --script deploy-level-rewards.ts
   npx hardhat deploy-zksync --script deploy-level-badges.ts
   ```
---

## Architecture

### Workflow Diagram

1. User logs in via ZKSync SSO → Keyless wallet session is established.
2. User completes a quiz and levels up → A smart contract event is triggered.
3. The smart contract mints an ERC-721 NFT for the user.
4. User claims rewards in ERC-20 tokens → Gasless transaction is processed.

---

## Features Not Fully Integrated (Future Improvements)

1. **Full Paymaster Integration**:
    - Currently, a signer is required to mint NFTs.
    - We created and deployed the necessary smart contracts, but the transaction could not be completed as a signature was required for approval.
2. **Sub-accounts**:
   - We intended to use subaccounts from the main address to split rewards between multiple saving goals. However, this feature is not supported for accounts created using ZKSync SSO.

---

## Backend API Endpoints

For detailed API documentation, refer to the [Swagger Documentation](https://piggy-edu-production.up.railway.app/api-docs).

## Pages of the application

**Login pages integrated with ZkSync SSO**

- Click on Let's Play button and follow the steps on the ZkSync SSO Modal
![image](https://github.com/user-attachments/assets/33b98c5f-3896-442d-8554-1bca161cb069)

- Click connect and sign in using your device or scan the QR Code with your phone
![image](https://github.com/user-attachments/assets/b9c5256c-a02a-42b9-8e95-610b84ae0116)

- Select the correct answer and hit the Submit button to advance to the new level and start collecting rewards!
![image](https://github.com/user-attachments/assets/899b2a6f-d727-4375-9108-5fc7102d8f7e)

- Use the bottom navigation bar to go to your profile, and see your savings
![image](https://github.com/user-attachments/assets/ebd1f858-f5da-420a-a405-97fc6c2ba329)


---

## Resources and References

- [ZKSync Era Documentation](https://zksync.io/docs)
- [Next.js Documentation](https://nextjs.org)
- [Hardhat Documentation](https://hardhat.org)
- [Custom Paymaster](https://github.com/matter-labs/tutorials/tree/main/custom-paymaster)



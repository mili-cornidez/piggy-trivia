import { deployContract, getWallet, getProvider } from "./utils";
import * as ethers from "ethers";

export default async function () {  
  const erc20 = await deployContract("MyERC20", ["MyToken", "MyToken", 18]);
  const erc20Address = await erc20.getAddress();
  console.log(`ERC20 deployed at ${erc20Address}`);

  //const paymaster = await deployContract("MyPaymaster", [erc20Address]);
  //const paymasterAddress = await paymaster.getAddress();
  //console.log(`Paymaster deployed at ${paymasterAddress}`);

  // Supplying paymaster with ETH
  /*console.log("Funding paymaster with ETH...");
  const wallet = getWallet();
  await (
    await wallet.sendTransaction({
      to: paymasterAddress,
      value: ethers.parseEther("0.001"),
    })
  ).wait();
  */

  //const provider = getProvider();
  //const paymasterBalance = await provider.getBalance(paymasterAddress);
  //console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`);

  // Supplying the ERC20 tokens to the wallet:
  // We will give the wallet 1000000 units of the token
  const wallet = getWallet();
  console.log("Minting tokens for the wallet...");
  await (await erc20.mint(wallet.address, 1000000)).wait();
  console.log("Minted 1000000 tokens for the wallet");
  /*
  console.log(`Deployment completed!
    ERC20 address: ${erc20Address}
    Paymaster address: ${paymasterAddress}
  `);
  */
  console.log(`Deployment completed!
    ERC20 address: ${erc20Address}
  `);
}
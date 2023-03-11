import react from 'react';
import './App.css';
import toBankABI from './toBankABI.json';
import toCharityABI from './toCharityABI.json';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum);
await provider.send('eth_requestAccounts', []);

function App() {
  const [contract, setContract] = useState(null);
  const [charity, setCharity] = useState(null);
  const toBankAddr = '0x8d36e246347eDA866597530d8C6e76edE345F999';

  useEffect(() => {
    // connect to MetaMask provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // await provider.send('eth_requestAccounts', []);

    // create a new instance of the contract
    const contract = new ethers.Contract(
      toBankAddr,
      toBankABI,
      provider.getSigner()
    );

    // save the contract instance to state
    setContract(contract);

    // call the `getCampaign` function to get the current campaign details
    async function getCharity() {
      const charity = await contract.getCampaign();
      setCharity(charity);
    }

    getCharity();
  }, []);

  async function donate() {
    // call the `donateToCampaign` function to donate to the campaign
    await contract.donateToCampaign({
      value: ethers.utils.parseEther('1'), // donate 1 ETH
    });

    // refresh the campaign details
    const updatedCharity = await contract.getCampaign();
    setCharity(updatedCharity);
  }

  async function withdraw() {
    // call the `withdrawCampaignFunds` function to withdraw the campaign funds
    await contract.withdrawCampaignFunds();

    // refresh the campaign details
    const updatedCharity = await contract.getCampaign();
    setCharity(updatedCharity);
  }

  if (!charity) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{charity.title}</h1>
      <p>Deadline: {new Date(charity.deadline * 1000).toString()}</p>
      <p>Balance: {ethers.utils.formatEther(charity.balance)} ETH</p>
      <button onClick={donate}>Donate</button>
      <button onClick={withdraw}>Withdraw</button>
    </div>
  );
}

export default App;

// const provider = new ethers.providers.Web3Provider(window.ethereum);
// // await provider.send('eth_requestAccounts', []);
// const signer = provider.getSigner();

// const toCharityAddr = '0x26c1fe42873201e7b05757493108fefc04032c8f';
// const toBankAddr = '0x8d36e246347eDA866597530d8C6e76edE345F999';

// const toBankContract = new ethers.Contract(toBankAddr, toBankABI, provider);

// const connectWallet = async () => {
//   try {
//     await window.ethereum.request({ method: 'eth_requestAccounts' });
//   } catch (error) {
//     console.error(error);
//   }
// };

// const startCampaign = async (title, deadline) => {
//   const tx = await toBankContract.startCampaign(title, deadline);
//   await tx.wait();
// };

// const endCampaign = async () => {
//   const tx = await toBankContract.endCampaign();
//   await tx.wait();
// };

// const donateToCampaign = async () => {
//   const tx = await toBankContract.donateToCampaign({
//     value: ethers.utils.parseEther('1'),
//   });
//   await tx.wait();
// };

// const withdrawCampaignFunds = async () => {
//   const tx = await toBankContract.withdrawCampaignFunds();
//   await tx.wait();
// };

// const getCampaignDetails = async () => {
//   const campaign = await toBankContract.getCampaign();
//   console.log(campaign);
// };

// // const toCharityContract = new ethers.Contract(
// //   toCharityAddr,
// //   toCharityABI,
// //   provider
// // );

// // const startCampaignByAdmin = async () => {
// //   const provider = new ethers.providers.Web3Provider(window.ethereum);
// //   await provider.send('eth_requestAccounts', []);
// //   const signer = provider.getSigner();
// //   const admin = toBankContract.connect(signer);
// //   const toBankContract = new ethers.Contract(toBankAddr, toBankABI, provider);
// //   await toBankContract.startCampaign('asd', 3600);
// // };

// function App() {
//   return (
//     <div>
//       <button onClick={() => startCampaign('New campaign', 3600)}>
//         Start Campaign
//       </button>
//       <button onClick={() => endCampaign()}>End Campaign</button>
//       <button onClick={() => donateToCampaign()}>Donate</button>
//       <button onClick={() => withdrawCampaignFunds()}>Withdraw Funds</button>
//       <button onClick={() => getCampaignDetails()}>Get Campaign Details</button>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import toBankABI from './toBankABI.json';
import toCharityABI from './toCharityABI.json';
// import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum);
await provider.send('eth_requestAccounts', []);
const signer = provider.getSigner();

const toCharityAddr = '0x394aadD9da31cce50eDda2c9b35d25Ff697698A9';
const toBankAddr = '0x4C8bC7093e6eB20636e74fdC7887eff80Da75fAa';

const toBankContract = new ethers.Contract(toBankAddr, toBankABI, signer);
const toCharityContract = new ethers.Contract(
  toCharityAddr,
  toCharityABI,
  signer
);

const startCampaign = async (title, deadline) => {
  if (
    (await signer.getAddress()) !== '0xbCAde681fAACfb75C6A7caBf92241a5BD44406f6'
  ) {
    alert('Only admin can use this function');
  }
  const tx = await toBankContract.startCampaign(title, deadline);
  await tx.wait();
  console.log('campaign started');
};

const endCampaign = async () => {
  if (
    (await signer.getAddress()) !== '0xbCAde681fAACfb75C6A7caBf92241a5BD44406f6'
  ) {
    alert('Only admin can use this function');
  }
  const tx = await toBankContract.endCampaign();
  await tx.wait();
  console.log('campaign ended');
};

const getCampaignDetails = async () => {
  const campaign = await toBankContract.getCampaign();
  // console.log(parseInt(campaign.balance, 10));
  // setBalance(parseInt(campaign.balance, 10));
  // console.log(campaign);
  // console.log(campaign);
  return campaign;
};

const displayCampaignDetails = async () => {
  if (
    (await signer.getAddress()) !== '0xbCAde681fAACfb75C6A7caBf92241a5BD44406f6'
  ) {
    alert('Only admin can use this function');
  }
  const campaign = await toBankContract.getCampaign();
  // console.log(parseInt(campaign.balance, 10));
  // setBalance(parseInt(campaign.balance, 10));
  // console.log(campaign);
  console.log(campaign);
  // return campaign;
};

// const temp = toBankContract.getCampaign();
// console.log(temp);
// const bal = parseInt(toBankContract.getCampaign().balance, 10);
function App() {
  const [amt, setAmt] = React.useState('');
  const [balance, setBalance] = React.useState(0);
  const [flag, setFlag] = React.useState(false);
  React.useEffect(() => {
    getCampaignDetails().then((data) => {
      setBalance(parseInt(data.balance, 10));
      // console.log(data.balance);
      // parseInt(data.TBalance, 10)
    });
  }, [flag]);

  const donateToCampaign = async (amt) => {
    const tx = await toBankContract.donateToCampaign({
      value: ethers.utils.parseUnits(amt, 'gwei'),
    });
    await tx.wait();
    setAmt(amt);
    setFlag(!flag);
  };

  const withdrawCampaignFunds = async () => {
    if (
      (await signer.getAddress()) !==
      '0xbCAde681fAACfb75C6A7caBf92241a5BD44406f6'
    ) {
      alert('Only admin can use this function');
    }
    const tx = await toBankContract.withdrawCampaignFunds();
    await tx.wait();
    setAmt('');
    // setFlag(!flag);
  };

  const transferToCharity = async (bal) => {
    if (
      (await signer.getAddress()) !==
      '0xbCAde681fAACfb75C6A7caBf92241a5BD44406f6'
    ) {
      alert('Only admin can use this function');
    }
    console.log(bal);
    const tx = await toCharityContract.donateToCharity({
      value: ethers.utils.parseUnits(String(bal / 1000000000), 'gwei'),
    });
    await tx.wait();
    setFlag(!flag);
  };

  return (
    <div>
      <h1>For Bank</h1>
      <br />
      <button onClick={() => startCampaign('New campaign', 3600)}>
        Start Campaign
      </button>
      <button onClick={() => endCampaign()}>End Campaign</button>
      <button onClick={() => withdrawCampaignFunds()}>Withdraw Funds</button>
      <button onClick={() => displayCampaignDetails()}>
        Get Campaign Details
      </button>
      <button onClick={() => transferToCharity(balance)}>
        Transfer To Charity
      </button>
      <br />
      <br />
      <h1>For Donor</h1>
      <input
        id="amount"
        type="number"
        name="amount"
        value={amt}
        onChange={(event) => {
          setAmt(event.target.value);
          // console.log(typeof amt);
        }}
      />
      <button onClick={() => donateToCampaign(amt)}>Donate</button>
      <h1>Total amt - {balance / 1000000000000000000} eth</h1>
      {/* <h1>
        {
          
        }
      </h1>
      <h1></h1> */}
    </div>
  );
}

export default App;

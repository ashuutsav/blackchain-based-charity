// const provider = new ethers.providers.Web3Provider(window.ethereum);
// await provider.send('eth_requestAccounts', []);

// function App() {
//   const [contract, setContract] = useState(null);
//   const [charity, setCharity] = useState(null);
//   const toBankAddr = '0x8d36e246347eDA866597530d8C6e76edE345F999';

//   useEffect(() => {
//     // connect to MetaMask provider
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     // await provider.send('eth_requestAccounts', []);

//     // create a new instance of the contract
//     const contract = new ethers.Contract(
//       toBankAddr,
//       toBankABI,
//       provider.getSigner()
//     );

//     // save the contract instance to state
//     setContract(contract);

//     // call the `getCampaign` function to get the current campaign details
//     async function getCharity() {
//       const charity = await contract.getCampaign();
//       setCharity(charity);
//     }

//     async function startCampaignByAdmin(title, deadline) {
//       await contract.startCampaign(title, deadline);
//       getCharity();
//     }
//     startCampaignByAdmin('asd', 3600);
//   }, []);

//   async function donate() {
//     // call the `donateToCampaign` function to donate to the campaign
//     await contract.donateToCampaign({
//       value: ethers.utils.parseEther('1'), // donate 1 ETH
//     });

//     // refresh the campaign details
//     const updatedCharity = await contract.getCampaign();
//     setCharity(updatedCharity);
//   }

//   async function withdraw() {
//     // call the `withdrawCampaignFunds` function to withdraw the campaign funds
//     await contract.withdrawCampaignFunds();

//     // refresh the campaign details
//     const updatedCharity = await contract.getCampaign();
//     setCharity(updatedCharity);
//   }

//   if (!charity) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{charity.title}</h1>
//       <p>Deadline: {new Date(charity.deadline * 1000).toString()}</p>
//       <p>Balance: {ethers.utils.formatEther(charity.balance)} ETH</p>
//       <button onClick={donate}>Donate</button>
//       <button onClick={withdraw}>Withdraw</button>
//     </div>
//   );
// }

// export default App;

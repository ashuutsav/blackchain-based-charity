 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ToBank {
 event CampaignStarted(uint256 deadline, address initiator);
    event WithdrawFunds(address initiator, uint256 amount,bytes32 amountHash);
    event FundsDonated(address donor, uint256 amount);
    event CampaignEnded(address initiator);

    // uint8  private _campaignCount;

    struct Charity {
        string title;
        bool isLive; 
        address initiator;
        uint256 deadline;
        uint256 balance;
        uint256 TBalance;
        bytes32 amtHash;
    }

    Charity public charity;

    // mapping(uint256 => bytes32) public _campaignsList;
    // mapping(bytes32 => Campaign) public _campaigns;
    mapping(address => uint256)
        public userCampaignDonations;

    constructor() {}

    // function getCampaignCount() public view returns (uint8) {
    //     return _campaignCount;
    // }

    // function generateCampaignId(
    //     address initiator,
    //     string calldata title,
    //     string calldata description
    // ) public pure returns (bytes32) {
    //     bytes32 campaignId = keccak256(
    //         abi.encodePacked(title, description, initiator)
    //     );
    //     return campaignId;
    // }

    function startCampaign(
        string calldata title,
        uint256 deadline
    ) public {
        // generate a campaignID
        // using the title, description and the address of the initiator
        // bytes32 campaignId = generateCampaignId(msg.sender, title, description);

        // get a reference to the campaign with the generated Id
        // Campaign storage campaign = _campaigns[campaignId];
        // require that the campaign is not live yet.
        require(!charity.isLive, "Campaign exists");
        // require the current time to be less than the campaign deadline
        // require(block.timestamp < deadline, "Campaign ended");
        address admin = 0xbCAde681fAACfb75C6A7caBf92241a5BD44406f6;
require(msg.sender==admin,"only admin allowed to start campaign");
        charity.title = title;
        // campaign.description = description;
        charity.initiator = msg.sender;
        // campaign.imgUrl = imgUrl;
        charity.deadline = block.timestamp+deadline;
        charity.isLive = true;

        // _campaignsList[_campaignCount] = campaignId;

        // increment the total number of charity campaigns created
        // _campaignCount = _campaignCount + 1;

        // emit an event to the blockchain
        emit CampaignStarted(deadline, msg.sender);
    }

    function endCampaign() public {
        // Campaign storage campaign = _campaigns[campaignId];

        // require the msg.sender is the creator of the campaign
        require(msg.sender == charity.initiator, "Not campaign initiator");
        // require the campaign is alive
        require(charity.isLive, "campaign is not active");

        charity.isLive = false;
        charity.deadline = block.timestamp;

        emit CampaignEnded(msg.sender);
    }

    // function getCampaignsInBatch(uint256 _batchNumber) public view returns(bytes32[] memory) {
    //     bytes32[] memory campaignsToReturn = new bytes32[](5);

    //     uint256 index = 5 *_batchNumber;

    //     for (uint i = 0; i < 5; i++)
    //         campaignsToReturn[i] = _campaignsList[index + i];

    //     return campaignsToReturn;
    // }

    // allows users to donate to a charity campaign of their choice
    function donateToCampaign() public payable {
        // get campaign details with the given campaign
        // Campaign storage campaign = _campaigns[campaignId];

        // end the campaign if the deadline is exceeded
        if (block.timestamp > charity.deadline) {
            charity.isLive = false;
        }
        // require the campaign has not ended
        require(block.timestamp < charity.deadline, "Campaign has ended");

        uint256 amountToDonate = msg.value;
        require(amountToDonate > 0, "Wrong ETH value");

        // increase the campaign balance by the amount donated;
        charity.balance += amountToDonate;
        charity.TBalance+=amountToDonate;

        // keep track of users donation history
        userCampaignDonations[msg.sender] += amountToDonate;

        // emit FundsDonated event
        emit FundsDonated(msg.sender, amountToDonate);
    }

    // returns the details of a campaign given the campaignId
    function getCampaign()
        public
        view
        returns (Charity memory)
    {
        return charity;
    }

    function setZero() public{
        charity.TBalance = 0;
    }

    function withdrawCampaignFunds() public {
        // Campaign storage campaign = _campaigns[campaignId];

        // require the msg.sender is the creator of the campaign
        require(msg.sender == charity.initiator, "Not campaign initiator");
        // require the campaign has ended
        require(!charity.isLive, "campaign is still active");
        // require(
        //     block.timestamp > charity.deadline,
        //     "Campaign is still active"
        // );
        // require the campaign has funds to be withdrawn
        require(charity.balance > 0, "No funds to withdraw");

        uint256 amountToWithdraw = charity.balance;

        // zero the campaign balance
        charity.balance = 0;
        charity.amtHash = keccak256(
             abi.encodePacked(amountToWithdraw)
         );

        // transfer the balance to the initiator address;
        payable(charity.initiator).transfer(amountToWithdraw);

        // emit an event to the blockchain
        // emit WithdrawFunds(charity.initiator, amountToWithdraw, amtHash);
    }
}
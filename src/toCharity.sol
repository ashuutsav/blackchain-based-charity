// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract toCharity{

    event FundsDonated(bytes32 amountHash);
    bytes32 recAmtHash;

    function donateToCharity() public payable{
    address org = 0xc5595b99197B57c1840dC726Bf47c7687710EBa6;
    uint256 amountToDonate = msg.value;
    require(amountToDonate > 0, "Wrong ETH value");
    require(msg.sender==0xbCAde681fAACfb75C6A7caBf92241a5BD44406f6,"Only admin can transfer funds");
    payable(org).transfer(amountToDonate);
    recAmtHash = keccak256(
             abi.encodePacked(amountToDonate)
         );
    // emit FundsDonated(amountHash);
    }

}
// 0xc8d53c3598efefb7559b0d4b8c31f39c661d4d19232923680542465339d94a38
// 0xc8d53c3598efefb7559b0d4b8c31f39c661d4d19232923680542465339d94a38
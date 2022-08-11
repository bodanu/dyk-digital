pragma solidity >=0.7.0 <0.9.0;
// SPDX-License-Identifier: MIT

contract DykDigital {


    struct AllDyks {
        uint id;
        string title;
        string body;
        address owner;
        uint likes;
    }

    AllDyks [] public dyks;
    uint public dyksCount = 0;

    function addDyk(string memory title, string memory body) public {
        dyks.push(AllDyks(
            dyksCount,
            title, 
            body, 
            msg.sender, 
            0
        ));
        dyksCount ++;
    }

    function likeDyk(uint id, address payable pay_to) public payable {
        dyks[id].likes++;
        pay_to.transfer(msg.value);
    } 

    function getDyks() public view returns (AllDyks[] memory){
        return dyks;
    }

}
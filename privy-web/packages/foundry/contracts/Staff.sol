//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {BaseERC721} from "./BaseERC721.sol";

// Useful for debugging. Remove when deploying to a live network.
import "forge-std/console.sol";

contract Staff is BaseERC721("Staff", "STF") {
    function tokenURI(uint256) public pure override returns (string memory) {
        return
            "ipfs://bafkreieqqoztnduknoe2httmob34dfnesnjfyuafqc6vgmoc6hhrkejzvq";
    }
}

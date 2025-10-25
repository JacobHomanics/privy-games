//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {BaseERC721} from "./BaseERC721.sol";

// Useful for debugging. Remove when deploying to a live network.
import "forge-std/console.sol";

contract Sword is BaseERC721("Sword", "SWD") {
    function tokenURI(uint256) public pure override returns (string memory) {
        return
            "ipfs://bafkreidvjcd7nkukaipj3fykymd4glonrseqvhvqx4hav5de3otrpkn7yq";
    }
}

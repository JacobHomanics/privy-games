//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

// Useful for debugging. Remove when deploying to a live network.
import "forge-std/console.sol";

contract BaseERC721 is ERC721Enumerable {
    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    function mint(address to) public {
        _mint(to, totalSupply());
    }
}

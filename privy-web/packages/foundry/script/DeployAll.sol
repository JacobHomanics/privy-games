// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import "../contracts/Sword.sol";
import "../contracts/Staff.sol";
import "../contracts/Bow.sol";
import "forge-std/console.sol";

contract DeployAll is ScaffoldETHDeploy {
    function run() external ScaffoldEthDeployerRunner {
        new Sword();
        new Staff();
        new Bow();
    }
}

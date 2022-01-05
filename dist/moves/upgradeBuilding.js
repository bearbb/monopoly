"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upgradePrice = exports.upgradeBuilding = exports.isUpgradeAble = void 0;
const utilities_1 = require("../utils/utilities");
const priceMultiplier_1 = require("../data/priceMultiplier");
const core_1 = require("boardgame.io/core");
const isUpgradeAble = (G, ctx) => {
    //find current block
    const currentPos = (0, utilities_1.findCurrentBlock)(G.playerPositions, ctx.currentPlayer);
    // console.log(
    //   `%cCurrent pos is: ${currentPos}`,
    //   "background: #292d3e; color: #f07178; font-weight: bold"
    // );
    //check if this block is this player's asset
    // console.log(G.blocksData[currentPos].type);
    if (currentPos !== -1 &&
        G.blocksData[currentPos].type === "CITY" &&
        G.blocksData[currentPos].buildingLevel < 4) {
        // console.log(G.blockOwners);
        if (G.blockOwners[currentPos] === ctx.currentPlayer) {
            let priceToUpgrade = G.blocksData[currentPos].basePrice * priceMultiplier_1.priceMultiplier.upgradeBuilding;
            //check if player have enough money
            if (G.playerMoney[ctx.currentPlayer] >= priceToUpgrade) {
                return true;
            }
            else {
                // console.log(
                //   `%cNot enough money to upgrade`,
                //   "background: #292d3e; color: #f07178; font-weight: bold"
                // );
                return false;
            }
        }
        else {
            // console.log(
            //   `%cNot owned this block`,
            //   "background: #292d3e; color: #f07178; font-weight: bold"
            // );
            return false;
        }
    }
    else {
        // console.log(
        //   `%cThis block not avail to upgrade`,
        //   "background: #292d3e; color: #f07178; font-weight: bold"
        // );
        return false;
    }
};
exports.isUpgradeAble = isUpgradeAble;
const upgradeBuilding = (G, ctx) => {
    //find current block
    const currentPos = (0, utilities_1.findCurrentBlock)(G.playerPositions, ctx.currentPlayer);
    //check if this block is this player's asset
    if (G.blockOwners[currentPos] === ctx.currentPlayer) {
        let priceToUpgrade = G.blocksData[currentPos].basePrice * priceMultiplier_1.priceMultiplier.upgradeBuilding;
        //check if player have enough money
        if (G.playerMoney[ctx.currentPlayer] >= priceToUpgrade) {
            //Take out corresponding amount of money
            G.playerMoney[ctx.currentPlayer] -= priceToUpgrade;
            //Update building level
            G.blocksData[currentPos].buildingLevel += 1;
            // console.log(
            //   `%cPlayer ${ctx.currentPlayer} have upgrade block ${currentPos} to level ${G.blocksData[currentPos].buildingLevel}`,
            //   "background: #292d3e; color: #f07178; font-weight: bold"
            // );
        }
        else {
            return core_1.INVALID_MOVE;
        }
    }
    else {
        return core_1.INVALID_MOVE;
    }
};
exports.upgradeBuilding = upgradeBuilding;
const upgradePrice = (G, ctx) => {
    let priceToUpgrade = -1;
    //find current block
    const currentPos = (0, utilities_1.findCurrentBlock)(G.playerPositions, ctx.currentPlayer);
    //check if this block is this player's asset
    if (G.blockOwners[currentPos] === ctx.currentPlayer) {
        priceToUpgrade =
            G.blocksData[currentPos].basePrice * priceMultiplier_1.priceMultiplier.upgradeBuilding;
    }
    else {
    }
    return priceToUpgrade;
};
exports.upgradePrice = upgradePrice;

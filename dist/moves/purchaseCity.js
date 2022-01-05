"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEnoughMoneyToPurchase = exports.isAlreadyOwnedCity = exports.isOwnedLevel4Building = exports.isOwnedResort = exports.purchaseCity = void 0;
const utilities_1 = require("../utils/utilities");
const core_1 = require("boardgame.io/core");
const purchaseCity = (G, ctx) => {
    //check if current pos is CITY or RESORT
    const playerCurrentBlock = (0, utilities_1.findCurrentBlock)(G.playerPositions, ctx.currentPlayer);
    let blockPriceData = (0, utilities_1.getBlockPrice)(G.blocksData, G.blockOwners, playerCurrentBlock);
    //check if block is purchasable
    //Purchasable
    if (blockPriceData.blockPrice !== -1) {
        //check if current player have enough money
        if (G.playerMoney[ctx.currentPlayer] >= blockPriceData.blockPrice) {
            //check if there is pre owner
            if (blockPriceData.playerIdToReturnMoney !== -1) {
                //check if current player is this block owner
                if (blockPriceData.playerIdToReturnMoney === ctx.currentPlayer) {
                    //cant purchase ur owned blocks
                    return core_1.INVALID_MOVE;
                }
                else {
                    //Take out and return money to pre owner
                    G.playerMoney[ctx.currentPlayer] -= blockPriceData.blockPrice;
                    G.playerMoney[blockPriceData.playerIdToReturnMoney] +=
                        blockPriceData.blockPrice;
                    //update blockOwners
                    G.blockOwners[playerCurrentBlock] = ctx.currentPlayer;
                    // console.log(
                    //   `%cPlayer ${ctx.currentPlayer} have buy block ${playerCurrentBlock} with price ${blockPriceData.blockPrice} and pay to player ${blockPriceData.playerIdToReturnMoney}`,
                    //   "background: #292d3e; color: #f07178; font-weight: bold"
                    // );
                }
            }
            //not owned by any one
            else {
                //Charge player money
                G.playerMoney[ctx.currentPlayer] -= blockPriceData.blockPrice;
                //update blockOwners
                G.blockOwners[playerCurrentBlock] = ctx.currentPlayer;
                //update owned status
                G.blocksData[playerCurrentBlock].isOwned = true;
                //update building level to 0
                G.blocksData[playerCurrentBlock].buildingLevel = 1;
                // console.log(
                //   `%cPlayer ${ctx.currentPlayer} have bought block ${playerCurrentBlock} with price ${blockPriceData.blockPrice}`,
                //   "background: #292d3e; color: #f07178; font-weight: bold"
                // );
            }
        }
        else {
            return core_1.INVALID_MOVE;
        }
    }
    else {
        return core_1.INVALID_MOVE;
    }
};
exports.purchaseCity = purchaseCity;
const isOwnedResort = (G, ctx) => {
    const playerCurrentBlock = (0, utilities_1.findCurrentBlock)(G.playerPositions, ctx.currentPlayer);
    // console.log(
    //   `%c---------------------`,
    //   "background: #292d3e; color: #f07178; font-weight: bold"
    // );
    // console.log(G.blocksData[playerCurrentBlock].type === "RESORT");
    // console.log(
    //   `%c---------------------`,
    //   "background: #292d3e; color: #f07178; font-weight: bold"
    // );
    if (G.blocksData[playerCurrentBlock].type === "RESORT" &&
        G.blocksData[playerCurrentBlock].isOwned) {
        // console.log(
        //   `%cIs owned resort`,
        //   "background: #292d3e; color: #f07178; font-weight: bold"
        // );
        return true;
    }
    else
        return false;
};
exports.isOwnedResort = isOwnedResort;
const isOwnedLevel4Building = (G, ctx) => {
    const playerCurrentBlock = (0, utilities_1.findCurrentBlock)(G.playerPositions, ctx.currentPlayer);
    if (playerCurrentBlock !== -1) {
        if (G.blocksData[playerCurrentBlock].type === "CITY" &&
            G.blocksData[playerCurrentBlock].buildingLevel === 4) {
            // console.log(
            //   `%cIs owned lv 4 building`,
            //   "background: #292d3e; color: #f07178; font-weight: bold"
            // );
            return true;
        }
        else
            return false;
    }
    else
        return false;
};
exports.isOwnedLevel4Building = isOwnedLevel4Building;
const isAlreadyOwnedCity = (G, ctx) => {
    const playerCurrentBlock = (0, utilities_1.findCurrentBlock)(G.playerPositions, ctx.currentPlayer);
    if (playerCurrentBlock !== -1) {
        //check if current block owner is the same as the current player
        return G.blockOwners[playerCurrentBlock] === ctx.currentPlayer;
    }
    else {
        return false;
    }
};
exports.isAlreadyOwnedCity = isAlreadyOwnedCity;
const isEnoughMoneyToPurchase = (G, ctx) => {
    const playerCurrentBlock = (0, utilities_1.findCurrentBlock)(G.playerPositions, ctx.currentPlayer);
    console.log(G.playerMoney[parseInt(ctx.currentPlayer)] >=
        (0, utilities_1.getBlockPrice)(G.blocksData, G.blockOwners, playerCurrentBlock).blockPrice);
    if (playerCurrentBlock !== -1) {
        // return (
        //   G.playerMoney[parseInt(ctx.currentPlayer)] >=
        //   G.blocksData[playerCurrentBlock].basePrice *
        //     (G.blocksData[playerCurrentBlock].buildingLevel > 0
        //       ? G.blocksData[playerCurrentBlock].buildingLevel
        //       : 1)
        // );
        return (G.playerMoney[parseInt(ctx.currentPlayer)] >=
            (0, utilities_1.getBlockPrice)(G.blocksData, G.blockOwners, playerCurrentBlock).blockPrice);
    }
    else {
        return false;
    }
};
exports.isEnoughMoneyToPurchase = isEnoughMoneyToPurchase;

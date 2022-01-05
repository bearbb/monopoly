"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repurchaseCity = void 0;
const utilities_1 = require("../utils/utilities");
const priceMultiplier_1 = require("../data/priceMultiplier");
const core_1 = require("boardgame.io/core");
const repurchaseCity = (G, ctx) => {
    //find current block
    const currentPos = (0, utilities_1.findCurrentBlock)(G.playerPositions, ctx.currentPlayer);
    const blockData = G.blocksData[currentPos];
    //check if this block is owned
    if (blockData.isOwned) {
        //check if this block type is CITY
        if (blockData.type === "CITY" && blockData.buildingLevel < 4) {
            const blockOwner = G.blockOwners[currentPos];
            const repurchasePrice = blockData.basePrice *
                blockData.buildingLevel *
                priceMultiplier_1.priceMultiplier.repurchase;
            //current player pay a corresponding amount to this block owner
            G.playerMoney[ctx.currentPlayer] -= repurchasePrice;
            //add money to the owner
            G.playerMoney[blockOwner] += repurchasePrice;
            //update owner
            G.blockOwners[currentPos] = ctx.currentPlayer;
            console.log(`%cPlayer ${ctx.currentPlayer} have paid ${repurchasePrice} to player ${blockOwner} to repurchase city ${blockData.cityName}`, "background: #292d3e; color: #f07178; font-weight: bold");
        }
        else {
            return core_1.INVALID_MOVE;
        }
    }
    else {
        return core_1.INVALID_MOVE;
    }
};
exports.repurchaseCity = repurchaseCity;

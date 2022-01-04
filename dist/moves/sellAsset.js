"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAssetPrice = exports.listAsset = exports.sellAssets = exports.sellAsset = void 0;
const priceMultiplier_1 = require("src/data/priceMultiplier");
const core_1 = require("boardgame.io/core");
const sellAsset = (G, ctx, blockId) => {
    let assetsList = (0, exports.listAssetPrice)(G, ctx);
    //check if block is exist in asset list
    let assetId = assetsList.findIndex((asset) => asset.blockId === blockId);
    if (assetId !== -1) {
        //add money to owner which is current player
        G.playerMoney[ctx.currentPlayer] += assetsList[assetId].price;
        //update block owner and building level
        G.blockOwners[blockId] = null;
        G.blocksData[blockId].buildingLevel = -1;
    }
    else {
        return core_1.INVALID_MOVE;
    }
};
exports.sellAsset = sellAsset;
const sellAssets = (G, ctx, blockIdList) => {
    blockIdList.forEach((blockId) => {
        (0, exports.sellAsset)(G, ctx, blockId);
    });
};
exports.sellAssets = sellAssets;
const listAsset = (G, ctx) => {
    //find all asset own by this player
    let blocks = [];
    for (let i = 0; i < G.blockOwners.length; i++) {
        if (G.blockOwners[i] === ctx.currentPlayer) {
            blocks.push(i);
        }
    }
    return blocks;
};
exports.listAsset = listAsset;
const listAssetPrice = (G, ctx) => {
    let blocks = (0, exports.listAsset)(G, ctx);
    let assetsPrice = [];
    assetsPrice = blocks.map((id) => {
        return {
            blockId: id,
            cityName: G.blocksData[id].cityName,
            price: G.blocksData[id].basePrice *
                G.blocksData[id].buildingLevel *
                priceMultiplier_1.priceMultiplier.sell,
        };
    });
    return assetsPrice;
};
exports.listAssetPrice = listAssetPrice;

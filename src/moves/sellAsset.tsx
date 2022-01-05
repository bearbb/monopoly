import { priceMultiplier } from "../data/priceMultiplier";
import { INVALID_MOVE } from "boardgame.io/core";
export const sellAsset = (G: any, ctx: any, blockId: number) => {
  let assetsList = listAssetPrice(G, ctx);
  //check if block is exist in asset list
  let assetId = assetsList.findIndex((asset) => asset.blockId === blockId);
  if (assetId !== -1) {
    //add money to owner which is current player
    G.playerMoney[ctx.currentPlayer] += assetsList[assetId].price;
    //update block owner and building level
    G.blockOwners[blockId] = null;
    G.blocksData[blockId].buildingLevel = -1;
  } else {
    return INVALID_MOVE;
  }
};

export const sellAssets = (G: any, ctx: any, blockIdList: number[]) => {
  blockIdList.forEach((blockId) => {
    sellAsset(G, ctx, blockId);
  });
};

export const listAsset = (G: any, ctx: any): number[] => {
  //find all asset own by this player
  let blocks: number[] = [];
  for (let i = 0; i < G.blockOwners.length; i++) {
    if (G.blockOwners[i] === ctx.currentPlayer) {
      blocks.push(i);
    }
  }
  return blocks;
};

interface assetPriceData {
  blockId: number;
  cityName: String;
  price: number;
}
export const listAssetPrice = (G: any, ctx: any) => {
  let blocks = listAsset(G, ctx);
  let assetsPrice: assetPriceData[] = [];
  assetsPrice = blocks.map((id) => {
    return {
      blockId: id,
      cityName: G.blocksData[id].cityName,
      price:
        G.blocksData[id].basePrice *
        G.blocksData[id].buildingLevel *
        priceMultiplier.sell,
    };
  });
  return assetsPrice;
};

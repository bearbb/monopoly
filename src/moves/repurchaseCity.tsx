import { findCurrentBlock } from "../utils/utilities";
import { priceMultiplier } from "../data/priceMultiplier";
import { INVALID_MOVE } from "boardgame.io/core";
export const repurchaseCity = (G: any, ctx: any) => {
  //find current block
  const currentPos = findCurrentBlock(G.playerPositions, ctx.currentPlayer);
  const blockData = G.blocksData[currentPos];
  //check if this block is owned
  if (blockData.isOwned) {
    //check if this block type is CITY
    if (blockData.type === "CITY" && blockData.buildingLevel < 4) {
      const blockOwner = G.blockOwners[currentPos];
      const repurchasePrice =
        blockData.basePrice *
        blockData.buildingLevel *
        priceMultiplier.repurchase;
      //current player pay a corresponding amount to this block owner
      G.playerMoney[ctx.currentPlayer] -= repurchasePrice;
      //add money to the owner
      G.playerMoney[blockOwner] += repurchasePrice;
      //update owner
      G.blockOwners[currentPos] = ctx.currentPlayer;
      console.log(
        `%cPlayer ${ctx.currentPlayer} have paid ${repurchasePrice} to player ${blockOwner} to repurchase city ${blockData.cityName}`,
        "background: #292d3e; color: #f07178; font-weight: bold"
      );
    } else {
      return INVALID_MOVE;
    }
  } else {
    return INVALID_MOVE;
  }
};

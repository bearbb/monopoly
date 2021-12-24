import { findCurrentBlock } from "src/utils/utilities";
import { priceMultiplier } from "src/data/priceMultiplier";
export const isHaveToPayRent = (G: any, ctx: any) => {
  //find current block
  const currentPos = findCurrentBlock(G.playerPositions, ctx.currentPlayer);
  const blockData = G.blocksData[currentPos];
  //check if on current block is own by other player
  let blockOwnerId = G.blockOwners[currentPos];
  if (blockOwnerId !== null && blockOwnerId !== ctx.currentPlayer) {
    console.log(
      `%cThis block is own by someone, u have to pay rent`,
      "background: #292d3e; color: #f07178; font-weight: bold"
    );
    return true;
  } else {
    return false;
  }
};
export const payRent = (G: any, ctx: any) => {
  //find current block
  const currentPos = findCurrentBlock(G.playerPositions, ctx.currentPlayer);
  const blockData = G.blocksData[currentPos];
  //check if current pos block is owned and own by other player
  if (
    G.blockOwners[currentPos] !== null &&
    G.blockOwners[currentPos] !== ctx.currentPlayer
  ) {
    let rentPrice = Math.round(
      blockData.basePrice * blockData.buildingLevel * priceMultiplier.rent
    );
    //check if current player have enough money to pay rent
    if (G.playerMoney[ctx.currentPlayer] >= rentPrice) {
      //take out corresponding amount of money
      G.playerMoney[ctx.currentPlayer] -= rentPrice;
      //add that money to block owner
      let blockOwnerId = G.blockOwners[currentPos];
      G.playerMoney[blockOwnerId] += rentPrice;
      console.log(
        `%cPlayer ${ctx.currentPlayer} have pay rent: ${rentPrice} to player ${blockOwnerId}`,
        "background: #292d3e; color: #f07178; font-weight: bold"
      );
    } else {
      console.log(
        `%cPlayer don't have enough money to pay rent`,
        "background: #292d3e; color: #f07178; font-weight: bold"
      );
      //TODO: player not enough money have to sell their assets which enough money
      //to pay rent, if sell all asset and not enough then that player bankrupt
    }
  }
};

import { findCurrentBlock } from "../utils/utilities";
import { priceMultiplier } from "../data/priceMultiplier";
import { INVALID_MOVE } from "boardgame.io/core";
export const isUpgradeAble = (G: any, ctx: any): boolean => {
  //find current block
  const currentPos = findCurrentBlock(G.playerPositions, ctx.currentPlayer);
  // console.log(
  //   `%cCurrent pos is: ${currentPos}`,
  //   "background: #292d3e; color: #f07178; font-weight: bold"
  // );
  //check if this block is this player's asset
  // console.log(G.blocksData[currentPos].type);
  if (
    currentPos !== -1 &&
    G.blocksData[currentPos].type === "CITY" &&
    G.blocksData[currentPos].buildingLevel < 4
  ) {
    // console.log(G.blockOwners);
    if (G.blockOwners[currentPos] === ctx.currentPlayer) {
      let priceToUpgrade =
        G.blocksData[currentPos].basePrice * priceMultiplier.upgradeBuilding;
      //check if player have enough money
      if (G.playerMoney[ctx.currentPlayer] >= priceToUpgrade) {
        return true;
      } else {
        // console.log(
        //   `%cNot enough money to upgrade`,
        //   "background: #292d3e; color: #f07178; font-weight: bold"
        // );
        return false;
      }
    } else {
      // console.log(
      //   `%cNot owned this block`,
      //   "background: #292d3e; color: #f07178; font-weight: bold"
      // );
      return false;
    }
  } else {
    // console.log(
    //   `%cThis block not avail to upgrade`,
    //   "background: #292d3e; color: #f07178; font-weight: bold"
    // );
    return false;
  }
};
export const upgradeBuilding = (G: any, ctx: any) => {
  //find current block
  const currentPos = findCurrentBlock(G.playerPositions, ctx.currentPlayer);
  //check if this block is this player's asset
  if (G.blockOwners[currentPos] === ctx.currentPlayer) {
    let priceToUpgrade =
      G.blocksData[currentPos].basePrice * priceMultiplier.upgradeBuilding;
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
    } else {
      return INVALID_MOVE;
    }
  } else {
    return INVALID_MOVE;
  }
};

export const upgradePrice = (G: any, ctx: any): number => {
  let priceToUpgrade = -1;
  //find current block
  const currentPos = findCurrentBlock(G.playerPositions, ctx.currentPlayer);
  //check if this block is this player's asset
  if (G.blockOwners[currentPos] === ctx.currentPlayer) {
    priceToUpgrade =
      G.blocksData[currentPos].basePrice * priceMultiplier.upgradeBuilding;
  } else {
  }
  return priceToUpgrade;
};

import { findCurrentBlock } from "src/utils/utilities";
import { priceMultiplier } from "src/data/priceMultiplier";
import { INVALID_MOVE } from "boardgame.io/core";
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
      console.log(
        `%cPlayer ${ctx.currentPlayer} have upgrade block ${currentPos} to level ${G.blocksData[currentPos].buildingLevel}`,
        "background: #292d3e; color: #f07178; font-weight: bold"
      );
    } else {
      return INVALID_MOVE;
    }
  } else {
    return INVALID_MOVE;
  }
};

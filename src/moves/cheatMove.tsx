import { isHaveToPayRent, payRent } from "../moves/payRent";
import { findCurrentBlock } from "../utils/utilities";
export const cheatMove = (G: any, ctx: any, blockIdToTeleTo: number) => {
  const userId = ctx.currentPlayer;
  //find the current block first
  const currentPos = findCurrentBlock(G.playerPositions, userId);
  let incomingPos: number;
  if (currentPos !== -1) {
    incomingPos = blockIdToTeleTo;
    //remove userId from current block
    G.playerPositions[currentPos] = G.playerPositions[currentPos].filter(
      (id: number) => id !== userId
    );
  } else {
    incomingPos = blockIdToTeleTo;
  }
  //add userId to new block pos
  G.playerPositions[incomingPos].push(userId);
  console.log(
    `Current position is in ${G.blocksData[incomingPos].cityName} in block ${incomingPos}`
  );
  if (isHaveToPayRent(G, ctx)) {
    // payRent(G, ctx);
  } else {
    //this block could be not owned or owned by this player
  }
};

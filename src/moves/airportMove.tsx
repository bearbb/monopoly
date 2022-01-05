import { INVALID_MOVE } from "boardgame.io/core";
import { findCurrentBlock } from "../utils/utilities";

//player can move any block that not owned or that player assets (cant move to special, feature block)
export const airportMove = (G: any, ctx: any, blockIdToMoveTo: number) => {
  //find current block
  const currentPos = findCurrentBlock(G.playerPositions, ctx.currentPlayer);
  //check if current pos is in airport
  if (currentPos === 24) {
    let availBlockIndex = availAirportMove(G, ctx);
    //check if blockIdToMove is avail
    if (availBlockIndex.includes(blockIdToMoveTo)) {
      //update playerPositions
      //remove playerId from current block
      G.playerPositions[24] = G.playerPositions[24].filter(
        (id: number) => id !== ctx.currentPlayer
      );
      //add userId to new block pos
      G.playerPositions[blockIdToMoveTo].push(ctx.currentPlayer);
      console.log(
        `Current position is in ${G.blocksData[blockIdToMoveTo].cityName}`
      );
    } else {
      return INVALID_MOVE;
    }
  } else {
    return INVALID_MOVE;
  }
};

export const availAirportMove = (G: any, ctx: any): number[] => {
  let availBlockIndex = [];
  for (let i = 0; i < G.blocksData.length; i++) {
    //check block type
    if (G.blocksData[i].type === "CITY" || G.blocksData[i].type === "RESORT") {
      //check owned status
      if (!G.blocksData[i].isOwned) {
        availBlockIndex.push(i);
      }
    }
  }
  for (let i = 0; i < G.blockOwners.length; i++) {
    if (G.blockOwners[i] === ctx.currentPlayer) {
      availBlockIndex.push(i);
    }
  }
  console.log(
    `%cAvailable block index to make an airport move is: `,
    "background: #292d3e; color: #f07178; font-weight: bold"
  );
  availBlockIndex = availBlockIndex.sort((a, b) => a - b);
  console.log(availBlockIndex);
  return availBlockIndex;
};

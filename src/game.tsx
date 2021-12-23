import { blocksData } from "src/data/blocksData";
import { priceMultiplier } from "src/data/priceMultiplier";
import { INVALID_MOVE } from "boardgame.io/core";
import { findCurrentBlock, getBlockPrice } from "src/utils/utilities";
import { purchaseCity } from "src/moves/purchaseCity";
import { repurchaseCity } from "src/moves/repurchaseCity";
import { upgradeBuilding } from "src/moves/upgradeBuilding";
import { diceMove } from "src/moves/diceMove";
import { cheatMove } from "src/moves/cheatMove";
import { payRent } from "src/moves/payRent";
export const monopoly = {
  // create a board with 31 blocks
  setup: () => ({
    playerPositions: Array(31).fill([]),
    playerMoney: Array(4).fill(800000),
    blocksData,
    blockOwners: Array(31).fill(null),
  }),

  moves: {
    diceMove,
    cheatMove,
    purchaseCity,
    repurchaseCity,
    upgradeBuilding,
    payRent,
    airportMove: (G: any, ctx: any) => {
      //player can move to any city that not owned by other player
    },
  },
};

import { blocksData } from "src/data/blocksData";
import { purchaseCity } from "src/moves/purchaseCity";
import { repurchaseCity } from "src/moves/repurchaseCity";
import { upgradeBuilding } from "src/moves/upgradeBuilding";
import { diceMove } from "src/moves/diceMove";
import { cheatMove } from "src/moves/cheatMove";
import { payRent } from "src/moves/payRent";
import { sellAsset } from "src/moves/sellAsset";
import { availAirportMove, airportMove } from "src/moves/airportMove";
import { isMonopoly, bankruptList } from "src/utils/utilities";
import { isDouble } from "src/utils/rollRules";
import { Game } from "boardgame.io";
import { blockData } from "src/data/blocksData";

export interface MonopolyState {
  playerPositions: any[][];
  playerMoney: number[];
  blocksData: blockData[];
  blockOwners: (number | null)[];
  playerId: number[];
  rollCount: number[];
  diceRolled: number[][];
}
export const monopoly: Game<MonopolyState> = {
  // create a board with 31 blocks
  setup: () => ({
    playerPositions: Array(31).fill([]),
    playerMoney: Array(4).fill(8000000),
    blocksData,
    blockOwners: Array(31).fill(null),
    playerId: [0, 1, 2, 3],
    rollCount: Array(4).fill(0),
    diceRolled: Array(4).fill([0, 0]),
  }),

  turn: {
    minMoves: 1,
    maxMoves: 3,
    onEnd: (G: any, ctx: any) => {
      G.diceRolled[ctx.currentPlayer] = [0, 0];
    },
    onBegin: (G: any, ctx: any) => {
      ctx.events.setActivePlayers({
        currentPlayer: "diceMove",
        maxMoves: 1,
        minMoves: 0,
      });
    },
    //TODO: auto end turn if there is no more move can make
    //end turn if there is no state
    stages: {
      diceMove: {
        // start: true,
        moves: {
          diceMove,
        },
        // next: "sell",
      },
      specialMove: {
        moves: {
          airportMove,
          cheatMove,
        },
        // next: "sell",
      },
      sell: {
        moves: {
          sellAsset,
        },
        // next: "purchase",
      },
      purchase: {
        moves: {
          purchaseCity,
          repurchaseCity,
          upgradeBuilding,
        },
        // next: "specialMove",
      },
    },
  },

  phases: {},
  moves: {
    diceMove,
    cheatMove,
    purchaseCity,
    repurchaseCity,
    upgradeBuilding,
    airportMove,
    sellAsset,
    setPlayerMoney: (G: any, ctx: any) => {
      G.playerMoney[ctx.currentPlayer] = 0;
    },
  },
  endIf: (G: any, ctx: any) => {
    if (isMonopoly(G.blockOwners)) {
      return { winner: ctx.currentPlayer };
    }
    let bankruptPlayerList = bankruptList(G.playerMoney, G.blockOwners);
    if (bankruptPlayerList.length == 3) {
      let winnerId = G.playerId.filter(
        (id: number) => !bankruptPlayerList.includes(id)
      );
      return { winner: winnerId };
    }
  },
};

import { blocksData } from "src/data/blocksData";
import { purchaseCity } from "src/moves/purchaseCity";
import { repurchaseCity } from "src/moves/repurchaseCity";
import { upgradeBuilding } from "src/moves/upgradeBuilding";
import { diceMove, toPrison, incRollCount } from "src/moves/diceMove";
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
  rentPrice: number[];
}
export const monopoly: Game<MonopolyState> = {
  // create a board with 31 blocks
  setup: (ctx: any) => ({
    playerPositions: Array(32).fill([]),
    playerMoney: Array(ctx.playOrder.length).fill(8000000),
    blocksData,
    blockOwners: Array(32).fill(null),
    playerId: [0, 1, 2, 3],
    rollCount: Array(4).fill(0),
    diceRolled: Array(4).fill([0, 0]),
    rentPrice: Array(32).fill(null),
  }),

  turn: {
    minMoves: 1,
    onEnd: (G: any, ctx: any) => {
      G.diceRolled[ctx.currentPlayer] = [0, 0];
    },
  },
  moves: {
    endTurn: (G: any, ctx: any) => {
      //reset roll count
      G.rollCount[parseInt(ctx.currentPlayer)] = 0;
      ctx.events.endTurn();
    },
    diceMove,
    cheatMove,
    purchaseCity,
    repurchaseCity,
    upgradeBuilding,
    airportMove,
    sellAsset,
    payRent,
    setPlayerMoney: (G: any, ctx: any) => {
      G.playerMoney[ctx.currentPlayer] = 0;
    },
    toPrison,
    incRollCount,
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

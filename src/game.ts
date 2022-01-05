import { blocksData } from "./data/blocksData";
import { purchaseCity } from "./moves/purchaseCity";
import { repurchaseCity } from "./moves/repurchaseCity";
import { upgradeBuilding } from "./moves/upgradeBuilding";
import { diceMove, toPrison, incRollCount } from "./moves/diceMove";
import { cheatMove } from "./moves/cheatMove";
import { payRent } from "./moves/payRent";
import { sellAsset, sellAssets } from "./moves/sellAsset";
import { availAirportMove, airportMove } from "./moves/airportMove";
import { isMonopoly, bankruptList } from "./utils/utilities";
import { isDouble } from "./utils/rollRules";
import { Game } from "boardgame.io";
import { blockData } from "./data/blocksData";
import { addMoneyToCurrentPlayer } from "./moves/updateMoney";

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
    playerMoney: Array(ctx.playOrder.length).fill(300000),
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
    sellAssets,
    payRent,
    setPlayerMoney: (G: any, ctx: any) => {
      G.playerMoney[ctx.currentPlayer] = 0;
    },
    toPrison,
    incRollCount,
    addMoneyToCurrentPlayer,
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

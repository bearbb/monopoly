"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monopoly = void 0;
const blocksData_1 = require("src/data/blocksData");
const purchaseCity_1 = require("src/moves/purchaseCity");
const repurchaseCity_1 = require("src/moves/repurchaseCity");
const upgradeBuilding_1 = require("src/moves/upgradeBuilding");
const diceMove_1 = require("src/moves/diceMove");
const cheatMove_1 = require("src/moves/cheatMove");
const payRent_1 = require("src/moves/payRent");
const sellAsset_1 = require("src/moves/sellAsset");
const airportMove_1 = require("src/moves/airportMove");
const utilities_1 = require("src/utils/utilities");
const updateMoney_1 = require("src/moves/updateMoney");
exports.monopoly = {
    // create a board with 31 blocks
    setup: (ctx) => ({
        playerPositions: Array(32).fill([]),
        playerMoney: Array(ctx.playOrder.length).fill(300000),
        blocksData: blocksData_1.blocksData,
        blockOwners: Array(32).fill(null),
        playerId: [0, 1, 2, 3],
        rollCount: Array(4).fill(0),
        diceRolled: Array(4).fill([0, 0]),
        rentPrice: Array(32).fill(null),
    }),
    turn: {
        minMoves: 1,
        onEnd: (G, ctx) => {
            G.diceRolled[ctx.currentPlayer] = [0, 0];
        },
    },
    moves: {
        endTurn: (G, ctx) => {
            //reset roll count
            G.rollCount[parseInt(ctx.currentPlayer)] = 0;
            ctx.events.endTurn();
        },
        diceMove: diceMove_1.diceMove,
        cheatMove: cheatMove_1.cheatMove,
        purchaseCity: purchaseCity_1.purchaseCity,
        repurchaseCity: repurchaseCity_1.repurchaseCity,
        upgradeBuilding: upgradeBuilding_1.upgradeBuilding,
        airportMove: airportMove_1.airportMove,
        sellAsset: sellAsset_1.sellAsset,
        sellAssets: sellAsset_1.sellAssets,
        payRent: payRent_1.payRent,
        setPlayerMoney: (G, ctx) => {
            G.playerMoney[ctx.currentPlayer] = 0;
        },
        toPrison: diceMove_1.toPrison,
        incRollCount: diceMove_1.incRollCount,
        addMoneyToCurrentPlayer: updateMoney_1.addMoneyToCurrentPlayer,
    },
    endIf: (G, ctx) => {
        if ((0, utilities_1.isMonopoly)(G.blockOwners)) {
            return { winner: ctx.currentPlayer };
        }
        let bankruptPlayerList = (0, utilities_1.bankruptList)(G.playerMoney, G.blockOwners);
        if (bankruptPlayerList.length == 3) {
            let winnerId = G.playerId.filter((id) => !bankruptPlayerList.includes(id));
            return { winner: winnerId };
        }
    },
};

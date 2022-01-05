"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incRollCount = exports.toPrison = exports.diceMove = void 0;
const utilities_1 = require("../utils/utilities");
const updateMoney_1 = require("../moves/updateMoney");
const priceMultiplier_1 = require("../data/priceMultiplier");
//roll dices
const rollDices = () => {
    let firstDice = Math.floor(Math.random() * 6) + 1;
    let secondDice = Math.floor(Math.random() * 6) + 1;
    return { firstDice, secondDice };
};
//normal moves: move after roll dices
//make current position became null and increase position by dices rolled number
const diceMove = (G, ctx, d1, d2) => {
    const userId = ctx.currentPlayer;
    //roll dices
    const diceValue = { firstDice: d1, secondDice: d2 };
    // console.log(diceValue);
    G.diceRolled[ctx.currentPlayer] = [diceValue.firstDice, diceValue.secondDice];
    // console.log(
    //   "Dice value rolled is: " +
    //     diceValue.firstDice +
    //     " and " +
    //     diceValue.secondDice
    // );
    //clear the user id from current block
    //find the current block first
    const currentPos = (0, utilities_1.findCurrentBlock)(G.playerPositions, userId);
    //if currentPos = -1 mean that user haven't made a move so no need to clear userId from current block
    let incomingPos;
    if (currentPos !== -1) {
        incomingPos = currentPos + diceValue.firstDice + diceValue.secondDice;
        //remove userId from current block
        G.playerPositions[currentPos] = G.playerPositions[currentPos].filter((id) => id !== userId);
    }
    else {
        incomingPos = diceValue.firstDice + diceValue.secondDice;
    }
    if (incomingPos > 31) {
        incomingPos = incomingPos - 32;
        //add money to current player bcs go through GO block
        (0, updateMoney_1.addMoneyToCurrentPlayer)(G, ctx, priceMultiplier_1.moneyAmount.throughGoBlock);
    }
    //add userId to new block pos
    G.playerPositions[incomingPos].push(userId);
    // console.log(`Current position is in ${G.blocksData[incomingPos].cityName}`);
    //check if current pos have to pay rent or not?
    // if (isHaveToPayRent(G, ctx)) {
    //   payRent(G, ctx);
    // } else {
    //   //this block could be not owned or owned by this player
    // }
    //TODO: If player rolled double mean 2 dices with the same number => one more turn
    //TODO: If player have rolled 3 time continuously, that player go to prison which block index is 8
    //Move to next stage
    // ctx.events.setActivePlayers({ currentPlayer: "sell", maxMoves: 1 });
};
exports.diceMove = diceMove;
const toPrison = (G, ctx) => {
    const userId = ctx.currentPlayer;
    let incomingPos = 8;
    //clear the user id from current block
    //find the current block first
    const currentPos = (0, utilities_1.findCurrentBlock)(G.playerPositions, userId);
    if (currentPos !== -1) {
        //remove userId from current block
        G.playerPositions[currentPos] = G.playerPositions[currentPos].filter((id) => id !== userId);
    }
    //add userId to new block pos
    G.playerPositions[incomingPos].push(userId);
    // console.log(
    //   `Current position is in ${G.blocksData[incomingPos].specialName}`
    // );
};
exports.toPrison = toPrison;
const incRollCount = (G, ctx) => {
    //incRollCount of current player
    let temp = G.rollCount[parseInt(ctx.currentPlayer)];
    G.rollCount[parseInt(ctx.currentPlayer)] = temp + 1;
};
exports.incRollCount = incRollCount;

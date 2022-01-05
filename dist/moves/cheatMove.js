"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cheatMove = void 0;
const payRent_1 = require("../moves/payRent");
const utilities_1 = require("../utils/utilities");
const cheatMove = (G, ctx, blockIdToTeleTo) => {
    const userId = ctx.currentPlayer;
    //find the current block first
    const currentPos = (0, utilities_1.findCurrentBlock)(G.playerPositions, userId);
    let incomingPos;
    if (currentPos !== -1) {
        incomingPos = blockIdToTeleTo;
        //remove userId from current block
        G.playerPositions[currentPos] = G.playerPositions[currentPos].filter((id) => id !== userId);
    }
    else {
        incomingPos = blockIdToTeleTo;
    }
    //add userId to new block pos
    G.playerPositions[incomingPos].push(userId);
    console.log(`Current position is in ${G.blocksData[incomingPos].cityName} in block ${incomingPos}`);
    if ((0, payRent_1.isHaveToPayRent)(G, ctx)) {
        // payRent(G, ctx);
    }
    else {
        //this block could be not owned or owned by this player
    }
};
exports.cheatMove = cheatMove;

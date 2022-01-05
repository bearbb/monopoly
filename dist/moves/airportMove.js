"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availAirportMove = exports.airportMove = void 0;
const core_1 = require("boardgame.io/core");
const utilities_1 = require("../utils/utilities");
//player can move any block that not owned or that player assets (cant move to special, feature block)
const airportMove = (G, ctx, blockIdToMoveTo) => {
    //find current block
    const currentPos = (0, utilities_1.findCurrentBlock)(G.playerPositions, ctx.currentPlayer);
    //check if current pos is in airport
    if (currentPos === 24) {
        let availBlockIndex = (0, exports.availAirportMove)(G, ctx);
        //check if blockIdToMove is avail
        if (availBlockIndex.includes(blockIdToMoveTo)) {
            //update playerPositions
            //remove playerId from current block
            G.playerPositions[24] = G.playerPositions[24].filter((id) => id !== ctx.currentPlayer);
            //add userId to new block pos
            G.playerPositions[blockIdToMoveTo].push(ctx.currentPlayer);
            console.log(`Current position is in ${G.blocksData[blockIdToMoveTo].cityName}`);
        }
        else {
            return core_1.INVALID_MOVE;
        }
    }
    else {
        return core_1.INVALID_MOVE;
    }
};
exports.airportMove = airportMove;
const availAirportMove = (G, ctx) => {
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
    console.log(`%cAvailable block index to make an airport move is: `, "background: #292d3e; color: #f07178; font-weight: bold");
    availBlockIndex = availBlockIndex.sort((a, b) => a - b);
    console.log(availBlockIndex);
    return availBlockIndex;
};
exports.availAirportMove = availAirportMove;

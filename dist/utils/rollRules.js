"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDouble = void 0;
const isDouble = (G, ctx) => {
    if (G.diceRolled[ctx.currentPlayer][0] == G.diceRolled[ctx.currentPlayer][1]) {
        return true;
    }
    else {
        return false;
    }
};
exports.isDouble = isDouble;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMoneyToCurrentPlayer = void 0;
const addMoneyToCurrentPlayer = (G, ctx, moneyAmount) => {
    const currentPlayer = parseInt(ctx.currentPlayer);
    const currentMoney = G.playerMoney[currentPlayer];
    const updatedMoney = currentMoney + moneyAmount;
    G.playerMoney[currentPlayer] = updatedMoney;
    console.log(`Player ${currentPlayer} is updated from ${currentMoney} to ${updatedMoney}`);
};
exports.addMoneyToCurrentPlayer = addMoneyToCurrentPlayer;

export const addMoneyToCurrentPlayer = (
  G: any,
  ctx: any,
  moneyAmount: number
) => {
  const currentPlayer = parseInt(ctx.currentPlayer);
  const currentMoney = G.playerMoney[currentPlayer];
  const updatedMoney = currentMoney + moneyAmount;
  G.playerMoney[currentPlayer] = updatedMoney;
  console.log(
    `Player ${currentPlayer} is updated from ${currentMoney} to ${updatedMoney}`
  );
};

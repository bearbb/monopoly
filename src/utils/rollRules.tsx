export const isDouble = (G: any, ctx: any) => {
  if (
    G.diceRolled[ctx.currentPlayer][0] == G.diceRolled[ctx.currentPlayer][1]
  ) {
    return true;
  } else {
    return false;
  }
};

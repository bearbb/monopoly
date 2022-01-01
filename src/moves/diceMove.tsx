import { findCurrentBlock } from "src/utils/utilities";
import { isHaveToPayRent, payRent } from "src/moves/payRent";
//roll dices
const rollDices = (): { firstDice: number; secondDice: number } => {
  let firstDice = Math.floor(Math.random() * 6) + 1;
  let secondDice = Math.floor(Math.random() * 6) + 1;
  return { firstDice, secondDice };
};
//normal moves: move after roll dices
//make current position became null and increase position by dices rolled number
export const diceMove = (G: any, ctx: any, d1: number, d2: number) => {
  const userId = ctx.currentPlayer;
  //roll dices
  const diceValue = { firstDice: d1, secondDice: d2 };
  console.log(diceValue);
  G.diceRolled[ctx.currentPlayer] = [diceValue.firstDice, diceValue.secondDice];
  console.log(
    "Dice value rolled is: " +
      diceValue.firstDice +
      " and " +
      diceValue.secondDice
  );
  //clear the user id from current block
  //find the current block first
  const currentPos = findCurrentBlock(G.playerPositions, userId);
  //if currentPos = -1 mean that user haven't made a move so no need to clear userId from current block
  let incomingPos: number;
  if (currentPos !== -1) {
    incomingPos = currentPos + diceValue.firstDice + diceValue.secondDice;
    //remove userId from current block
    G.playerPositions[currentPos] = G.playerPositions[currentPos].filter(
      (id: number) => id !== userId
    );
  } else {
    incomingPos = diceValue.firstDice + diceValue.secondDice;
  }
  if (incomingPos > 31) {
    incomingPos = incomingPos - 31;
  }
  //add userId to new block pos
  G.playerPositions[incomingPos].push(userId);
  console.log(`Current position is in ${G.blocksData[incomingPos].cityName}`);
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

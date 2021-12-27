import React, { Component } from "react";
import type { blockData } from "src/data/blocksData";
import type { BoardProps } from "boardgame.io/react";
import type { MonopolyState } from "src/game";

// interface MyGameProps extends BoardProps {
//   playerPositions: number[][];
//   playerMoney: number[];
//   blocksData: blockData[];
//   blockOwners: number[] | null[];
//   playerId: number[];
//   rollCount: number[];
//   diceRolled: number[][];
// }

export const Board = ({ G, ctx, moves }: BoardProps<MonopolyState>) => {
  return <div></div>;
};

import React, { Component, useContext, useEffect, useState } from "react";
import { blockData } from "src/data/blocksData";
import { BoardProps } from "boardgame.io/react";
import { MonopolyState } from "src/game";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export const Board = ({ G, ctx, moves }: BoardProps<MonopolyState>) => {
  return <div className="Board"></div>;
};

import React, { Component } from "react";
import { blockData } from "src/data/blocksData";
import { BoardProps } from "boardgame.io/react";
import { MonopolyState } from "src/game";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CreatePlayer } from "src/components/CreatePlayer";
import { Menu } from "src/components/Menu";
import { CreateLobby } from "src/components/CreateLobby";
import { JoinLobby } from "src/components/JoinLobby";
import { Lobby } from "src/components/Lobby";

const theme = extendTheme({
  fonts: {
    // body: "Indie Flower",
    // heading: "Indie Flower",
    body: "Amatic SC",
    heading: "Amatic SC",
  },
});

export const Board = ({ G, ctx, moves }: BoardProps<MonopolyState>) => {
  return (
    <ChakraProvider theme={theme}>
      {/* <CreatePlayer /> */}
      {/* <Menu></Menu> */}
      {/* <CreateLobby></CreateLobby> */}
      {/* <JoinLobby></JoinLobby> */}
      {/* <Lobby></Lobby> */}
    </ChakraProvider>
  );
};

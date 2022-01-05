import React, { useState } from "react";
import { Client as BoardGameClient } from "boardgame.io/react";
import { Board } from "src/Board";
import { monopoly } from "src/game";
import "src/App.css";

//server
import { SocketIO } from "boardgame.io/multiplayer";

const { protocol, hostname, port } = window.location;
const server = `${protocol}//${hostname}:${port}`;
export const Client = BoardGameClient({
  game: monopoly,
  numPlayers: 4,
  board: Board,
  // multiplayer: SocketIO({ server: "https://gameapi.swanoogie.me" }),
  multiplayer: SocketIO({ server }),
  debug: false,
});

export default Client;

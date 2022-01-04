import React, { useState } from "react";
import { Client as BoardGameClient } from "boardgame.io/react";
import { Board } from "src/Board";
import { monopoly } from "src/game";
import "src/App.css";

//server
import { SocketIO } from "boardgame.io/multiplayer";

export const Client = BoardGameClient({
  game: monopoly,
  numPlayers: 4,
  board: Board,
  multiplayer: SocketIO({ server: "localhost:6969" }),
  debug: false,
});

export default Client;

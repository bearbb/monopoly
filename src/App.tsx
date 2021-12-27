import React, { useState } from "react";
import { Client } from "boardgame.io/react";
import { Board } from "src/Board";
import { monopoly } from "src/game";
import "./App.css";

const App = Client({
  game: monopoly,
  numPlayers: 4,
  board: Board,
});

export default App;

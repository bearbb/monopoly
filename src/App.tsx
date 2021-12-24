import React, { useState } from "react";
import logo from "./logo.svg";
import { Client } from "boardgame.io/react";
import { monopoly } from "src/game";
import "./App.css";

const App = Client({
  game: monopoly,
  numPlayers: 4,
});

export default App;

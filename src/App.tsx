import React, { useState } from "react";
import logo from "./logo.svg";
import { Client } from "boardgame.io/react";
import { monopoly } from "./game";
import "./App.css";

const App = Client({
  game: monopoly,
});

export default App;

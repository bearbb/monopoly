import React, { useState, useEffect } from "react";
import { Client } from "src/Client";
import "./App.css";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

//Components
import { CreatePlayer } from "src/components/CreatePlayer";
import { Menu } from "src/components/Menu";
import { CreateLobby } from "src/components/CreateLobby";
import { JoinLobby } from "src/components/JoinLobby";
import { Lobby } from "src/components/Lobby";
import { RollDice } from "src/components/RollDice";
//Route
import { Routes, Route, useNavigate } from "react-router-dom";

//User context
import {
  UserContext,
  useUserContext,
  UserContextData,
} from "src/contexts/UserContext";

const theme = extendTheme({
  fonts: {
    // body: "Indie Flower",
    // heading: "Indie Flower",
    // body: "Amatic SC",
    // heading: "Amatic SC",
    body: "Varela Round",
    heading: "Varela Round",
  },
});

const getInitUserData = (): { username: string; lobbyId: string } => {
  let username = localStorage.getItem("username");
  let lobbyId = localStorage.getItem("lobbyId");
  let userData = {
    username: "",
    lobbyId: "",
  };
  if (username !== null) {
    userData.username = username;
  }
  if (lobbyId !== null) {
    userData.lobbyId = lobbyId;
  }
  return userData;
};

export const App = () => {
  const [userData, setUserData] = useState<UserContextData["userData"]>({
    username: getInitUserData().username,
    lobbyId: getInitUserData().lobbyId,
  });
  useEffect(() => {
    return () => {};
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(userData);
    return () => {};
  }, [userData]);
  useEffect(() => {
    if (userData.username === "") {
      navigate("/create-player");
    } else {
      if (userData.lobbyId === "") {
        navigate("/");
      }
    }
    return () => {};
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Routes>
          <Route path="create-player" element={<CreatePlayer />}></Route>
          <Route path="/" element={<Menu />}></Route>
          {/* <Route path="create-lobby" element={<CreateLobby />}></Route> */}
          <Route path="join-lobby" element={<JoinLobby />}></Route>
          <Route path="lobby" element={<Lobby />}></Route>
          <Route
            path="game"
            element={<Client matchID={`${userData.lobbyId}`} playerID="0" />}
          ></Route>
        </Routes>
      </UserContext.Provider>
    </ChakraProvider>
  );
};

export default App;

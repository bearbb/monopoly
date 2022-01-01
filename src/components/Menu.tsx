import React from "react";
import axios from "axios";
import { urlData } from "src/data/urlData";
import { FormLabel, Button, Box, Input, Flex, Heading } from "@chakra-ui/react";

//router
import { useNavigate } from "react-router-dom";

//contexts
import { UserContext, useUserContext } from "src/contexts/UserContext";

//boardgame
import { lobbyClient } from "src/utils/utilities";

const ButtonStyle = {
  w: "15%",
  size: "3xl",
  fontSize: "2xl",
  fontWeight: "extrabold",
  p: 15,
};

const createLobby = async (): Promise<string> => {
  // const data = await axios.post(`${urlData.serverURI}/games/default/create`);
  //TODO: create handler when create get error
  const { matchID } = await lobbyClient.createMatch("default", {
    numPlayers: 1,
  });
  return matchID;
};

export const Menu = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserContext();
  const createLobbyHandler = async () => {
    navigate("/create-lobby");
    // }
  };
  return (
    <Flex
      id="Menu"
      flexDirection="column"
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Heading as="h1" size="xl" mb="10vh">
        *some aesthetic background*
      </Heading>
      <Flex justifyContent="space-around" w="80%">
        <Button
          {...ButtonStyle}
          colorScheme="purple"
          onClick={() => {
            createLobbyHandler();
          }}
        >
          create lobby
        </Button>
        <Button
          {...ButtonStyle}
          colorScheme="orange"
          onClick={() => {
            navigate("/join-lobby");
          }}
        >
          join lobby
        </Button>
      </Flex>
    </Flex>
  );
};

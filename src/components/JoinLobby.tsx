import React, { useState, useEffect } from "react";
import {
  FormLabel,
  FormLabelProps,
  Button,
  Box,
  Input,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

//router
import { useNavigate } from "react-router-dom";

//lobby instance
import { lobbyClient } from "src/utils/utilities";

//context
import { useUserContext } from "src/contexts/UserContext";
import { resolve } from "path";

const inputStyle = {
  variant: "filled",
  mb: 3,
  borderWidth: 3,
  focusBorderColor: "blackAlpha.500",
  size: "lg",
  w: "50%",
};
const boldLabel = {
  fontWeight: 400,
  fontSize: "3xl",
};

const Label = (props: FormLabelProps) => (
  <FormLabel {...props} {...boldLabel}></FormLabel>
);

export const JoinLobby = () => {
  const navigate = useNavigate();
  const [lobbyId, setLobbyId] = useState<string>("");
  const [alert, setAlert] = useState<string>("");
  const [toggleLobbyButton, setToggleLobbyButton] = useState<boolean>(false);
  const { userData, setUserData } = useUserContext();
  // const [password, setPassword] = useState<String>("");

  const joinLobbyHandler = async () => {
    //check if lobbyId is empty
    if (lobbyId === "") {
      setAlert("please enter the lobby id");
    } else {
      //get player list first
      try {
        const { matchID, players, setupData } = await lobbyClient.getMatch(
          "default",
          lobbyId
        );
        let playerIndexAvail = -1;
        //check players arr if any slot left
        for (let i = 0; i < players.length; i++) {
          const element = players[i];
          if (element.name === undefined) {
            playerIndexAvail = i;
            break;
          }
        }
        //check if already joined
        let isJoined = false;
        for (let i = 0; i < players.length; i++) {
          const element = players[i];
          if (element.name === userData.username) {
            isJoined = true;
          }
        }
        if (playerIndexAvail === -1) {
          setAlert("lobby is full");
        } else if (isJoined) {
          setToggleLobbyButton(true);
          setAlert("u r already joined");
        } else {
          //join lobby with that id and username
          const playerCredential = await lobbyClient.joinMatch(
            "default",
            lobbyId,
            {
              playerID: playerIndexAvail.toString(),
              playerName: userData.username,
            }
          );
          let temp = { ...userData, lobbyId: lobbyId };
          setUserData(temp);
          localStorage.setItem("lobbyId", lobbyId);
          console.log(playerCredential);
          navigate("/lobby");
        }
      } catch (error) {
        setAlert("lobby id not found");
      }
    }
  };

  return (
    <Flex
      id="CreateLobby"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      minW={870}
      flexDirection="column"
    >
      <Heading as="h1" m="50" size="2xl">
        join lobby
      </Heading>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        w="80vw"
        ml="10vw"
        mr="10vw"
        mb="10vh"
        p="20"
        gap={50}
        flex="100%"
      >
        <Flex
          flexDirection="column"
          flexGrow="1;0"
          //   p={15}
          alignItems="center"
          justifyContent="center"
        >
          <Flex alignItems="flex-start" flexDirection="column">
            <FormLabel
              fontWeight="extrabold"
              fontSize="4xl"
              htmlFor="avatarSelector"
            >
              avatar
            </FormLabel>
            <Box
              id="avatarSelector"
              w="15vw"
              minW="220px"
              minH="220px"
              h="15vw"
              borderWidth={3}
              borderColor="blackAlpha.200"
              cursor="pointer"
            ></Box>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          flexGrow={1.5}
          w=""
          justifyContent="center"
          //   alignItems="flex-start"
        >
          <Label htmlFor="lobbyIdInput" {...boldLabel}>
            lobby id
          </Label>
          <Input
            id="lobbyIdInput"
            placeholder="input ur lobby id"
            {...inputStyle}
            onChange={(e) => {
              setLobbyId(e.target.value);
            }}
          ></Input>
          <Text color="red.400" fontWeight="bold">
            {alert}
          </Text>
          {/* <Label htmlFor="passwordInput" {...boldLabel}>
            password
          </Label>
          <Input
            id="passwordInput"
            placeholder="input ur lobby password"
            {...inputStyle}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Input> */}
          {/* <Text>(leave empty if lobby not require pass)</Text> */}
          <Flex gap={10}>
            <Button
              size="lg"
              colorScheme="orange"
              w="fit-content"
              mt={10}
              onClick={() => joinLobbyHandler()}
            >
              join
            </Button>
            {toggleLobbyButton ? (
              <Button
                size="lg"
                colorScheme="purple"
                w="fit-content"
                mt={10}
                onClick={() => navigate("/lobby")}
              >
                back to lobby
              </Button>
            ) : null}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

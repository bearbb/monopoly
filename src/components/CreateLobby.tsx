import React, { useState, useEffect } from "react";
import {
  FormLabel,
  Button,
  Box,
  Input,
  Flex,
  Heading,
  HStack,
  useNumberInput,
  Text,
} from "@chakra-ui/react";
import { CenteredFlex } from "src/Board";
import { lobbyClient } from "src/utils/utilities";
import { useUserContext } from "src/contexts/UserContext";
import { useNavigate } from "react-router";

const NumOfPlayerInput = ({
  setNumOfPlayer,
}: {
  setNumOfPlayer: (num: number) => void;
}) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 2,
      min: 1,
      max: 4,
      precision: 0,
      onChange: (value) => {
        setNumOfPlayer(parseInt(value));
      },
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW="150">
      <Button {...dec} colorScheme="purple">
        -
      </Button>
      <Input {...input} fontWeight="extrabold" />
      <Button {...inc} colorScheme="red">
        +
      </Button>
    </HStack>
  );
};

interface CreateLobbyRes {
  matchId?: string;
  error?: string;
}
const createLobby = async (numPlayers: number): Promise<CreateLobbyRes> => {
  //TODO: create handler when create get error
  try {
    const { matchID } = await lobbyClient.createMatch("default", {
      numPlayers: numPlayers,
    });
    return { matchId: matchID };
  } catch (error) {
    return { error: "Something went wrong try again" };
  }
};
export const CreateLobby = () => {
  const [isCheckedState, setIsCheckedState] = useState<Boolean>(false);
  const [displayAtt, setDisplayAtt] = useState<"none" | "block">("none");
  const { userData, setUserData } = useUserContext();
  const [numOfPlayer, setNumOfPlayer] = useState<number>(2);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const createLobbyHandler = async () => {
    const createLobbyRes = await createLobby(numOfPlayer);
    if (!createLobbyRes.error && createLobbyRes.matchId) {
      let temp = userData;
      temp.lobbyId = createLobbyRes.matchId;
      setUserData({ ...temp });
      localStorage.setItem("lobbyId", createLobbyRes.matchId);
      try {
        const { playerCredentials } = await lobbyClient.joinMatch(
          "default",
          createLobbyRes.matchId,
          { playerID: "0", playerName: userData.username }
        );
        temp.credentials = playerCredentials;
        setUserData({ ...temp });
        localStorage.setItem("credentials", playerCredentials);
        localStorage.setItem("playerId", "0");
        setError("");
        //navigate to lobby
        navigate("/lobby");
      } catch (error) {
        setError("some thing went wrong with joining the lobby, pls try again");
      }
    } else {
      setError("some thing went wrong with create new lobby, pls try again");
    }
  };

  useEffect(() => {
    if (isCheckedState) {
      setDisplayAtt("block");
    } else {
      setDisplayAtt("none");
    }
    return () => {};
  }, [isCheckedState]);
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
        create lobby
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
              //TODO: able to change avatar on click (change to some avail avatar)
              //       onClick={() => {
              //         alert("clicked");
              //       }}
            >
              <CenteredFlex>
                <Text>*coming soon*</Text>
              </CenteredFlex>
            </Box>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          flexGrow={1.5}
          w=""
          justifyContent="center"
        >
          {/* <Checkbox
            value="password"
            size="lg"
            colorScheme="orange"
            onChange={(e) => {
              setIsCheckedState(e.target.checked);
            }}
          >
            password
          </Checkbox> */}
          {/* <Input
            id="passwordInput"
            placeholder="input ur lobby password"
            variant="filled"
            mb={3}
            borderWidth={3}
            focusBorderColor="blackAlpha.500"
            size="lg"
            w="50%"
            display={displayAtt}
            //     onChange={(e) => {
            //       usernameHandler(e);
            //     }}
          ></Input> */}
          {/* <NumOfPlayerSlider /> */}
          <NumOfPlayerInput setNumOfPlayer={setNumOfPlayer} />
          <Button
            size="lg"
            colorScheme="orange"
            w="150px"
            mt={5}
            onClick={() => {
              createLobbyHandler();
            }}
          >
            create
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

//TODO: add a slider from 1 to 4 to create a game with that number of player

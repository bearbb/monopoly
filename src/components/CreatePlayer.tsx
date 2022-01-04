import React, { useState, useEffect } from "react";
import {
  FormLabel,
  Button,
  Box,
  Input,
  Flex,
  Heading,
  Center,
  Text,
} from "@chakra-ui/react";

//Context
import { useUserContext, UserContextData } from "src/contexts/UserContext";

//Router
import { useNavigate } from "react-router-dom";

export const CreatePlayer = () => {
  const { userData, setUserData } = useUserContext();
  const [username, setUsername] = useState<string>("");
  const [alert, setAlert] = useState<String>("");

  //navigator
  const navigate = useNavigate();

  const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  useEffect(() => {
    // console.log(username);
    return () => {};
  }, [username]);

  //on click create
  const createPlayerHandler = () => {
    //check if username is empty
    if (username === "") {
      setAlert("please enter ur username");
    } else {
      // setUserData((state : ) => ({ lobbyId: "", username: username }));
      const updatedData = { ...userData, username };
      setUserData(updatedData);
      localStorage.setItem("username", username);
      //navigate to menu page
      navigate("/");
    }
  };
  return (
    <Flex
      id="CreatePlayer"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      minW={870}
      flexDirection="column"
      padding={30}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          createPlayerHandler();
        }
      }}
    >
      <Heading as="h1" mb={50} size="2xl">
        create player
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
              fontWeight="bold"
              fontSize="3xl"
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
            >
              <Center w="100%" h="100%">
                <Text>*coming soon*</Text>
              </Center>
            </Box>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          flexGrow={1.5}
          w=""
          justifyContent="center"
        >
          <FormLabel htmlFor="usernameInput" fontWeight="bold" fontSize="3xl">
            username
          </FormLabel>
          <Input
            id="usernameInput"
            placeholder="input ur username"
            variant="filled"
            mb={3}
            borderWidth={3}
            focusBorderColor="blackAlpha.500"
            size="lg"
            w="50%"
            onChange={(e) => {
              usernameHandler(e);
            }}
          ></Input>
          <Button
            size="lg"
            colorScheme="orange"
            w="fit-content"
            onClick={() => {
              createPlayerHandler();
            }}
          >
            create
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

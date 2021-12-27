import React, { useState, useEffect } from "react";
import {
  FormLabel,
  Button,
  Box,
  Input,
  Flex,
  Heading,
  Checkbox,
} from "@chakra-ui/react";

export const CreateLobby = () => {
  const [isCheckedState, setIsCheckedState] = useState<Boolean>(false);
  const [displayAtt, setDisplayAtt] = useState<"none" | "block">("none");
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
            ></Box>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          flexGrow={1.5}
          w=""
          justifyContent="center"
        >
          <Checkbox
            value="password"
            size="lg"
            colorScheme="orange"
            onChange={(e) => {
              setIsCheckedState(e.target.checked);
            }}
          >
            password
          </Checkbox>
          <Input
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
          ></Input>
          <Button size="lg" colorScheme="orange" w="fit-content" mt={10}>
            create
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

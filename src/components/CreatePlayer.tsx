import React, { useState, useEffect } from "react";
import { FormLabel, Button, Box, Input, Flex, Heading } from "@chakra-ui/react";

export const CreatePlayer = () => {
  const [username, setUsername] = useState<String>("");
  const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  useEffect(() => {
    console.log(username);
    return () => {};
  }, [username]);
  return (
    <Flex
      id="CreatePlayer"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      minW={870}
      flexDirection="column"
    >
      <Heading as="h1" m="50" size="2xl">
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
          <FormLabel
            htmlFor="usernameInput"
            fontWeight="extrabold"
            fontSize="4xl"
          >
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
          <Button size="lg" colorScheme="orange" w="fit-content">
            create
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

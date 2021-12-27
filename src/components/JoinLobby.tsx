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
  const [lobbyId, setLobbyId] = useState<String | null>(null);
  const [password, setPassword] = useState<String>("");
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
          <Label htmlFor="passwordInput" {...boldLabel}>
            password
          </Label>
          <Input
            id="passwordInput"
            placeholder="input ur lobby password"
            {...inputStyle}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Input>
          <Text>(leave empty if lobby not require pass)</Text>
          <Button size="lg" colorScheme="orange" w="fit-content" mt={10}>
            join
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

import React from "react";
import { FormLabel, Button, Box, Input, Flex, Heading } from "@chakra-ui/react";
export const Menu = () => {
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
          w="15%"
          size="3xl"
          fontSize="2xl"
          fontWeight="extrabold"
          colorScheme="purple"
          p={15}
        >
          create lobby
        </Button>
        <Button
          w="15%"
          size="3xl"
          fontSize="2xl"
          fontWeight="extrabold"
          colorScheme="orange"
          p={15}
        >
          join lobby
        </Button>
      </Flex>
    </Flex>
  );
};

import React from "react";
import {
  FormLabel,
  FormLabelProps,
  Button,
  Box,
  BoxProps,
  Input,
  Flex,
  FlexProps,
  Heading,
  Badge,
  BadgeProps,
  Text,
} from "@chakra-ui/react";
const Body = (props: FlexProps) => (
  <Flex
    {...props}
    flexDirection="column"
    w="100vw"
    h="100vh"
    justifyContent="center"
    alignItems="center"
    p={15}
  ></Flex>
);
export const Lobby = () => {
  return (
    <Body id="Lobby">
      <Heading as="h1" m="50" size="2xl">
        lobby
      </Heading>
      <Flex
        id="LobbyContent"
        flexDirection="column"
        w="100%"
        h="100%"
        justifyContent="space-between"
        p="50px 200px 100px 200px"
      >
        <Heading as="h3" size="xl" mb={25}>
          lobby id:{" "}
        </Heading>
        <Flex w="100%" justifyContent="space-between" h="60%">
          <PlayerNToken avatar="" tokenId={0} isReady={true}></PlayerNToken>
          <PlayerNToken avatar="" tokenId={0} isReady={true}></PlayerNToken>
          <PlayerNToken avatar="" tokenId={0} isReady={true}></PlayerNToken>
          <PlayerNToken avatar="" tokenId={0} isReady={false}></PlayerNToken>
        </Flex>
        <Button textAlign="center">Ready</Button>
      </Flex>
    </Body>
  );
};

interface PlayerNTokenProps {
  avatar: any;
  tokenId: number;
  isReady: Boolean;
}
const PlayerNToken = ({ ...props }: PlayerNTokenProps) => {
  return (
    <Flex flexDirection="column" justifyContent="space-between">
      <AvatarCover></AvatarCover>
      <TokenCover></TokenCover>
      {props.isReady ? <ReadyBadge /> : <NotReadyBadge />}
    </Flex>
  );
};

const AvatarCover = (props: BoxProps) => (
  <Box {...props} w={100} h={100} borderWidth={2} borderColor="black"></Box>
);
const TokenCover = (props: BoxProps) => (
  <Box {...props} w={200} h={200} borderWidth={2} borderColor="black"></Box>
);
const ReadyBadge = () => (
  <Badge variant="solid" colorScheme="green">
    Ready
  </Badge>
);
const NotReadyBadge = () => (
  <Badge variant="outline" colorScheme="green">
    Not ready
  </Badge>
);

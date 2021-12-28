import { useEffect, useState } from "react";
import {
  Button,
  Box,
  BoxProps,
  Input,
  Flex,
  FlexProps,
  Heading,
  Badge,
  Text,
} from "@chakra-ui/react";

//contexts
import { UserContext, useUserContext } from "src/contexts/UserContext";

//lobby
import { lobbyClient } from "src/utils/utilities";

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

interface PlayerData {
  id: number;
  name: string | undefined;
}

export const Lobby = () => {
  const [playersData, setPlayersData] = useState<PlayerData[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const { userData, setUserData } = useUserContext();
  const [isAllReady, setIsAllReady] = useState<boolean>(false);

  //FIXME: data fetch after join lobby not going right
  const getLobbyData = async () => {
    try {
      const { players } = await lobbyClient.getMatch(
        "default",
        userData.lobbyId
      );
      let temp: PlayerData[] = players.map((p) => ({
        id: p.id,
        name: p.name,
      }));
      setPlayersData(temp);
    } catch (error) {
      setIsError(true);
    }
  };

  //function on click the button: 2 way
  //call getLobbyData if isAllReady = false
  //navigate to game else

  const twiceHandler = () => {
    if (!isAllReady) {
      getLobbyData();
    } else {
      //TODO: navigate to game
    }
  };

  useEffect(() => {
    getLobbyData();
    return () => {};
  }, []);
  useEffect(() => {
    //check if all player join
    console.log(playersData);
    if (
      playersData.every((p) => p.name !== undefined) &&
      playersData.length === 4
    ) {
      console.log("checked");
      setIsAllReady(true);
    } else {
      console.log("not ready");
    }
    return () => {};
  }, [playersData]);
  return (
    <Body id="Lobby" minH={835}>
      <Heading as="h1" m="50" size="2xl">
        lobby
      </Heading>
      <Flex
        id="LobbyContent"
        flexDirection="column"
        w="100%"
        h="100%"
        // justifyContent="space-between"
        gap={15}
        p="50px 200px 100px 200px"
      >
        <Flex>
          <Text
            fontSize="2xl"
            // mb={25}
            color="purple.500"
            fontWeight="bold"
          >
            lobby id:
          </Text>
          <Text
            fontSize="2xl"
            ml={5}
            fontWeight="bold"
            borderWidth={1}
            rounded={3}
            borderColor="purple.400"
            p="0 3px 0 3px"
            color="purple.700"
          >
            {userData.lobbyId}
          </Text>
        </Flex>
        <Flex w="100%" justifyContent="space-between" h="60%">
          {renderPlayerNToken(playersData)}
        </Flex>
        <Flex w="100%" justifyContent="center">
          <Button
            w="fit-content"
            // p="3px 5px 3px 5px"
            textAlign="center"
            colorScheme="purple"
            size="lg"
            onClick={() => twiceHandler()}
          >
            {isAllReady ? "Play" : "Check if all ready"}
          </Button>
        </Flex>
      </Flex>
    </Body>
  );
};

interface PlayerNTokenProps {
  name: string | undefined;
  avatar: any;
  tokenId: number;
  isReady: Boolean;
}
const PlayerNToken = ({ ...props }: PlayerNTokenProps) => {
  return (
    <Flex flexDirection="column" gap={4}>
      {/* <AvatarCover> */}
      <Text color="orange.300" fontWeight="bold" fontSize="2xl">
        {props.name === undefined ? "waiting..." : props.name}
      </Text>
      {/* </AvatarCover> */}
      <TokenCover>{props.tokenId}</TokenCover>
      {props.isReady ? <ReadyBadge /> : <NotReadyBadge />}
    </Flex>
  );
};

const renderPlayerNToken = (player: PlayerData[]) => {
  let render = player.map((p) => {
    return (
      <PlayerNToken
        tokenId={p.id}
        name={p.name}
        isReady={p.name === undefined ? false : true}
        avatar={null}
        key={p.id}
      ></PlayerNToken>
    );
  });
  return render;
};

const AvatarCover = (props: BoxProps) => (
  <Box {...props} w={100} h={100} borderWidth={2} borderColor="black"></Box>
);
const TokenCover = (props: BoxProps) => (
  <Box
    {...props}
    minWidth={200}
    minHeight={200}
    borderWidth={2}
    borderColor="black"
  ></Box>
);
const ReadyBadge = () => (
  <Badge variant="solid" colorScheme="green" textAlign="center">
    Ready
  </Badge>
);
const NotReadyBadge = () => (
  <Badge variant="outline" colorScheme="green" textAlign="center">
    Not ready
  </Badge>
);

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
  Image,
  Center,
  useToast,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

//contexts
import { UserContext, useUserContext } from "src/contexts/UserContext";

//player token
import token0 from "src/assets/PlayerToken/0.png";
import token1 from "src/assets/PlayerToken/1.png";
import token2 from "src/assets/PlayerToken/2.png";
import token3 from "src/assets/PlayerToken/3.png";

//lobby
import { lobbyClient } from "src/utils/utilities";
import { useNavigate } from "react-router";

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

export interface PlayerData {
  id: number;
  name: string | undefined;
}

export const Lobby = () => {
  const [playersData, setPlayersData] = useState<PlayerData[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const { userData, setUserData } = useUserContext();
  const [isAllReady, setIsAllReady] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    // console.log(
    //   `%c${userData}`,
    //   "background: #292d3e; color: #f07178; font-weight: bold"
    // );
    return () => {};
  }, []);

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
  useEffect(() => {
    // console.log(playersData);
    return () => {};
  }, [playersData]);

  //function on click the button: 2 way
  //call getLobbyData if isAllReady = false
  //navigate to game else

  const twiceHandler = () => {
    if (!isAllReady) {
      getLobbyData();
    } else {
      // TODO: navigate to game
      navigateToGame();
    }
  };

  //init function
  useEffect(() => {
    // console.log(userData.lobbyId);
    getLobbyData();
    return () => {};
  }, []);

  //check is ready status
  useEffect(() => {
    //check if all slot have join
    //by check all object have name !== undefined
    let isReady = playersData.every((player) => player.name !== undefined);
    setIsAllReady(isReady);
    return () => {};
  }, [playersData]);

  const navigateToGame = () => {
    //check if all userData meet requirements
    let allMeet = true;
    let key: keyof typeof userData;
    for (key in userData) {
      if (userData[key] === "") {
        allMeet = false;
      }
    }
    if (allMeet) {
      navigate("/game");
    }
  };
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
          <Center h="100%" ml={4}>
            <CopyIcon
              color="purple.400"
              boxSize={8}
              cursor="pointer"
              _hover={{ color: "purple.700" }}
              onClick={() => {
                navigator.clipboard.writeText(userData.lobbyId);
                toast({
                  description: "lobby id copied",
                  status: "success",
                });
              }}
            ></CopyIcon>
          </Center>
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
      <TokenCover tokenId={props.tokenId}></TokenCover>
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
const TokenCover = ({ tokenId }: { tokenId: number }) => (
  <Box
    // {...props}
    width={200}
    height={200}
    borderWidth={2}
    borderColor="black"
  >
    <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
      <Image w="70%" src={tokenSwitcher(tokenId)}></Image>
    </Flex>
  </Box>
);
const tokenSwitcher = (tokenId: number) => {
  if (tokenId === 0) {
    return token0;
  } else if (tokenId === 1) {
    return token1;
  } else if (tokenId === 2) {
    return token2;
  } else {
    return token3;
  }
};
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

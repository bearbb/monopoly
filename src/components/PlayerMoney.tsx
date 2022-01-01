import { useState, useEffect } from "react";

import { PlayerData } from "src/components/Lobby";
import { lobbyClient } from "src/utils/utilities";

import { Flex, FlexProps, Image, Text, Badge, Box } from "@chakra-ui/react";

//token
import token0 from "src/assets/PlayerToken/0.png";
import token1 from "src/assets/PlayerToken/1.png";
import token2 from "src/assets/PlayerToken/2.png";
import token3 from "src/assets/PlayerToken/3.png";
import { useUserContext } from "src/contexts/UserContext";

const tokenSelector = (tokenId: number) => {
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
interface PlayerTokenAndMoneyProps {
  tokenId: number;
  money: number;
  username: string;
  currentPlayer: string;
}
const PlayerTokenAndMoney = ({
  tokenId,
  money,
  username,
  currentPlayer,
}: PlayerTokenAndMoneyProps) => {
  const ActivePlayerStyle: FlexProps = {
    opacity: 1,
  };
  return (
    <Flex
      w={300}
      h={70}
      gap={3}
      borderWidth={2}
      borderColor="gray.500"
      rounded={5}
      bg="gray.50"
      opacity={parseInt(currentPlayer) === tokenId ? 1 : 0.3}
    >
      <Flex
        w={70}
        h="100%"
        justifyContent="center"
        alignItems="center"
        borderRight="2px solid #718096"
      >
        <Image src={tokenSelector(tokenId)} w="auto" h="60px"></Image>
      </Flex>
      <Flex flexDir="column" h="100%" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="extrabold" color="red.700">
          {username}
        </Text>
        <Text fontSize="2xl" fontWeight="extrabold">
          {money.toLocaleString()}
        </Text>
      </Flex>
    </Flex>
  );
};

const getLobbyPlayerName = async (
  lobbyId: string
): Promise<PlayerData[] | null> => {
  try {
    const { players } = await lobbyClient.getMatch("default", lobbyId);
    let temp: PlayerData[] = players.map((p) => ({
      id: p.id,
      name: p.name,
    }));
    return temp;
  } catch (error) {
    return null;
  }
};
interface PlayerMoneyProps {
  playerMoney: number[];
  currentPlayer: string;
}

export const PlayerMoney = ({
  playerMoney,
  currentPlayer,
}: PlayerMoneyProps) => {
  const { userData, setUserData } = useUserContext();
  const [playerName, setPlayerName] = useState<(string | undefined)[]>([]);

  const getNSetLobbyPlayerName = async (lobbyId: string) => {
    const players = await getLobbyPlayerName(lobbyId);
    if (players !== null) {
      let temp = players.map((p) => p.name);
      setPlayerName(temp);
    }
  };

  useEffect(() => {
    getNSetLobbyPlayerName(userData.lobbyId);
    return () => {};
  }, []);

  return (
    <Flex
      w="100vw"
      h="100vh"
      //       zIndex="99999"
      justifyContent="space-between"
      alignItems=""
      position="fixed"
      flexDir="column"
      p={10}
    >
      <Flex w="100%" justifyContent="space-between">
        <PlayerTokenAndMoney
          tokenId={0}
          money={playerMoney[0]}
          username={"bearbb"}
          currentPlayer={currentPlayer}
        />
        {playerName[1] !== undefined && (
          <PlayerTokenAndMoney
            tokenId={1}
            money={playerMoney[1]}
            username={playerName[1]}
            currentPlayer={currentPlayer}
          />
        )}
      </Flex>
      <Flex w="100%" justifyContent="space-between">
        {playerName[2] !== undefined && (
          <PlayerTokenAndMoney
            tokenId={3}
            money={playerMoney[2]}
            username={playerName[2]}
            currentPlayer={currentPlayer}
          />
        )}
        {playerName[3] !== undefined && (
          <PlayerTokenAndMoney
            tokenId={3}
            money={playerMoney[3]}
            username={playerName[3]}
            currentPlayer={currentPlayer}
          />
        )}
      </Flex>
    </Flex>
  );
};

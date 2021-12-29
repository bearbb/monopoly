import React from "react";

//token
import token0 from "src/assets/PlayerToken/0.png";
import token1 from "src/assets/PlayerToken/1.png";
import token2 from "src/assets/PlayerToken/2.png";
import token3 from "src/assets/PlayerToken/3.png";

//chakra components
import { Flex, Image } from "@chakra-ui/react";
import { CenteredFlex } from "src/Board";

interface PlayerProps {
  tokenId: any;
}

export const Player = ({ tokenId }: PlayerProps) => {
  tokenId = parseInt(tokenId);
  const tokenSelector = () => {
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
  return (
    <CenteredFlex>
      <Image src={tokenSelector()} w={25} opacity={0.9}></Image>
    </CenteredFlex>
  );
};

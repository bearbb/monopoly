import React, { Component, useContext, useEffect, useState } from "react";
import { blockData } from "src/data/blocksData";
import { BoardProps } from "boardgame.io/react";
import { MonopolyState } from "src/game";
import {
  ChakraProvider,
  extendTheme,
  Grid,
  GridItem,
  GridItemProps,
  Flex,
  FlexProps,
  Image,
  Text,
  Button,
} from "@chakra-ui/react";

//components
import { Player } from "src/components/Player";
import { Die } from "src/components/Die";

//board data
import { blocksData } from "src/data/blocksData";

//board img
import goImg from "src/assets/BoardImg/go.png";
import prisonImg from "src/assets/BoardImg/prison.png";
import fifaImg from "src/assets/BoardImg/fifa.png";
import de_airportImg from "src/assets/BoardImg/de_airport.png";
import chancesImg from "src/assets/BoardImg/drawCard.png";
import { Rolling } from "./components/Rolling";

const MoneyBGColor = "gray.50";
const MonopolyColorTheme = {
  mono0: "red.200",
  mono1: "red.300",
  mono2: "orange.200",
  mono3: "orange.300",
  mono4: "yellow.300",
  mono5: "yellow.200",
  mono6: "green.200",
  mono7: "green.300",
  resort: "blue.100",
  chances: "purple.200",
};

const BlockStyle: GridItemProps = {
  borderWidth: 1.5,
  borderColor: "gray.500",
  position: "relative",
  bg: MoneyBGColor,
};
const blockContentContainerStyle: FlexProps = {
  flexDirection: "column",
  w: "100%",
  h: "100%",
};
const firstHalfBlockStyle: FlexProps = {
  h: "70%",
  justifyContent: "center",
  alignItems: "center",
  // p: 2,
};
const secondHalfBlockStyle: FlexProps = {
  h: "30%",
  borderTop: "1px solid gray",
  justifyContent: "center",
  alignItems: "center",
};

export const CenteredFlex = (props: FlexProps) => (
  <Flex
    {...props}
    w="100%"
    h="100%"
    justifyContent="center"
    alignItems="center"
  ></Flex>
);
const FirstHalfBlock = (blockId: number, monoThemeColor: string) => {
  let cityName = blocksData[blockId].cityName;
  return (
    <Flex {...firstHalfBlockStyle} bg={monoThemeColor}>
      <Text fontSize="xs" fontWeight="bold" color="gray.700" textAlign="center">
        {cityName}
      </Text>
    </Flex>
  );
};
function kFormatter(num: number) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000) + "K"
    : Math.sign(num) * Math.abs(num);
}
const SecondHalfBlock = (blockId: number) => {
  let rentPrice = blocksData[blockId].basePrice;
  if (rentPrice !== undefined) {
    let rentPriceInK = kFormatter(rentPrice);
    return (
      <Flex {...secondHalfBlockStyle}>
        <Text fontSize="sm" fontWeight="extrabold" color="gray.800">
          {rentPriceInK}
        </Text>
      </Flex>
    );
  }
};

const OverlayBlock = (blockId: number, playerPos: any[][]) => {
  //check if this block have player or not and which tokenId is it
  // console.log(playerPos);
  if (playerPos !== undefined) {
    let tokenIdList: number[] = [];
    let isExist = false;
    if (playerPos[blockId] !== undefined && playerPos[blockId].length > 0) {
      tokenIdList = playerPos[blockId];
      isExist = true;
    }
    // console.log(tokenIdList[0]);
    return (
      <Flex
        id={`ovlBlock${blockId}`}
        position="absolute"
        w="100%"
        h="100%"
        top="0"
        bottom="0"
        left="0"
        right="0"
        justifyContent="center"
        alignItems="center"
      >
        {isExist ? <Player tokenId={tokenIdList[0]}></Player> : null}
      </Flex>
    );
  }
};

const GridItemStyle: GridItemProps = {};
export const Board = ({ G, ctx, moves }: BoardProps<MonopolyState>) => {
  const BlockFull = (
    blockId: number,
    monoThemeColor: string,
    playerPos: number[][] = G.playerPositions
  ) => {
    return (
      <Flex {...blockContentContainerStyle}>
        {FirstHalfBlock(blockId, monoThemeColor)}
        {SecondHalfBlock(blockId)}
        {OverlayBlock(blockId, playerPos)}
      </Flex>
    );
  };
  const [playerPos, setPlayerPos] = useState<number[][]>(Array(32).fill([]));
  useEffect(() => {
    console.log(G.playerPositions);
    return () => {};
  }, [G.playerPositions]);
  return (
    <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <Grid
        templateColumns="repeat(9, minmax(0, 1fr))"
        templateRows="repeat(9, minmax(0, 1fr))"
        height={750}
        w={750}
        gap={1}
        borderWidth={2}
        borderColor="gray.400"
        rounded={5}
        p={1.5}
      >
        {/* GO block */}
        <GridItem {...BlockStyle} id="block0" gridArea="9/9">
          <CenteredFlex>
            <Image src={goImg} w="50%"></Image>
          </CenteredFlex>
        </GridItem>
        {/* GO block */}

        {/* blocks from 1 to 7 */}
        <GridItem {...BlockStyle} id="block1" gridArea="9/8" bg={MoneyBGColor}>
          {BlockFull(1, MonopolyColorTheme.mono0, G.playerPositions)}
        </GridItem>
        <GridItem {...BlockStyle} id="block2" gridArea="9/7" bg={MoneyBGColor}>
          {BlockFull(2, MonopolyColorTheme.mono0, G.playerPositions)}
        </GridItem>
        <GridItem {...BlockStyle} id="block3" gridArea="9/6" bg={MoneyBGColor}>
          {BlockFull(3, MonopolyColorTheme.mono0, G.playerPositions)}
        </GridItem>
        {/* Resort */}
        <GridItem {...BlockStyle} id="block4" gridArea="9/5" bg={MoneyBGColor}>
          {BlockFull(4, MonopolyColorTheme.resort, G.playerPositions)}
        </GridItem>
        {/* Resort */}
        <GridItem {...BlockStyle} id="block5" gridArea="9/4" bg={MoneyBGColor}>
          {BlockFull(5, MonopolyColorTheme.mono1)}
        </GridItem>
        <GridItem {...BlockStyle} id="block6" gridArea="9/3" bg={MoneyBGColor}>
          {BlockFull(6, MonopolyColorTheme.mono1)}
        </GridItem>
        <GridItem {...BlockStyle} id="block7" gridArea="9/2" bg={MoneyBGColor}>
          {BlockFull(7, MonopolyColorTheme.mono1)}
        </GridItem>
        {/* blocks from 1 to 7 */}

        {/* Prison block */}
        <GridItem {...BlockStyle} id="block8" gridArea="9/1" bg="gray.100">
          <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
            <Image src={prisonImg} w="50%"></Image>
          </Flex>
        </GridItem>
        {/* Prison block */}

        {/* block from 9 to 15 */}
        <GridItem {...BlockStyle} id="block9" gridArea="8/1" bg={MoneyBGColor}>
          {BlockFull(9, MonopolyColorTheme.mono2)}
        </GridItem>
        <GridItem {...BlockStyle} id="block10" gridArea="7/1" bg={MoneyBGColor}>
          {BlockFull(10, MonopolyColorTheme.mono2)}
        </GridItem>
        <GridItem {...BlockStyle} id="block11" gridArea="6/1" bg={MoneyBGColor}>
          {BlockFull(11, MonopolyColorTheme.mono2)}
        </GridItem>
        <GridItem
          {...BlockStyle}
          id="block12"
          gridArea="5/1"
          bg={MonopolyColorTheme.chances}
        >
          <CenteredFlex>
            <Image src={chancesImg} w="50%"></Image>
          </CenteredFlex>
        </GridItem>
        <GridItem {...BlockStyle} id="block13" gridArea="4/1" bg={MoneyBGColor}>
          {BlockFull(13, MonopolyColorTheme.mono3)}
        </GridItem>
        {/* resort */}
        <GridItem {...BlockStyle} id="block14" gridArea="3/1" bg={MoneyBGColor}>
          {BlockFull(14, MonopolyColorTheme.resort)}
        </GridItem>
        {/* resort */}
        <GridItem {...BlockStyle} id="block15" gridArea="2/1" bg={MoneyBGColor}>
          {BlockFull(15, MonopolyColorTheme.mono3)}
        </GridItem>
        {/* block from 9 to 15 */}

        {/* Fifa block  */}
        <GridItem {...BlockStyle} id="block16" gridArea="1/1" bg="gray.100">
          <CenteredFlex>
            <Image src={fifaImg} w="50%"></Image>
          </CenteredFlex>
        </GridItem>
        {/* Fifa block  */}

        {/* block from 17 to 23 */}
        <GridItem {...BlockStyle} id="block17" gridArea="1/2" bg={MoneyBGColor}>
          {BlockFull(17, MonopolyColorTheme.mono4)}
        </GridItem>
        {/* resort */}
        <GridItem {...BlockStyle} id="block18" gridArea="1/3" bg={MoneyBGColor}>
          {BlockFull(18, MonopolyColorTheme.resort)}
        </GridItem>
        {/* resort */}
        <GridItem {...BlockStyle} id="block19" gridArea="1/4" bg={MoneyBGColor}>
          {BlockFull(19, MonopolyColorTheme.mono4)}
        </GridItem>
        <GridItem
          {...BlockStyle}
          id="block20"
          gridArea="1/5"
          bg={MonopolyColorTheme.chances}
        >
          <CenteredFlex>
            <Image src={chancesImg} w="50%"></Image>
          </CenteredFlex>
        </GridItem>
        <GridItem {...BlockStyle} id="block21" gridArea="1/6" bg={MoneyBGColor}>
          {BlockFull(21, MonopolyColorTheme.mono4)}
        </GridItem>
        <GridItem {...BlockStyle} id="block22" gridArea="1/7" bg={MoneyBGColor}>
          {BlockFull(22, MonopolyColorTheme.mono5)}
        </GridItem>
        <GridItem {...BlockStyle} id="block23" gridArea="1/8" bg={MoneyBGColor}>
          {BlockFull(23, MonopolyColorTheme.mono5)}
        </GridItem>
        {/* block from 17 to 23 */}

        {/* de_airport block */}
        <GridItem {...BlockStyle} id="block24" gridArea="1/9" bg="gray.100">
          <CenteredFlex>
            <Image w="50%" src={de_airportImg}></Image>
          </CenteredFlex>
        </GridItem>
        {/* de_airport block */}

        {/* block from 25 to 31 */}
        <GridItem {...BlockStyle} id="block25" gridArea="2/9" bg={MoneyBGColor}>
          {BlockFull(25, MonopolyColorTheme.mono6)}
        </GridItem>
        <GridItem {...BlockStyle} id="block26" gridArea="3/9" bg={MoneyBGColor}>
          {BlockFull(26, MonopolyColorTheme.mono6)}
        </GridItem>
        <GridItem {...BlockStyle} id="block27" gridArea="4/9" bg={MoneyBGColor}>
          {BlockFull(27, MonopolyColorTheme.resort)}
        </GridItem>
        <GridItem
          {...BlockStyle}
          id="block28"
          gridArea="5/9"
          bg={MonopolyColorTheme.chances}
        >
          <CenteredFlex>
            <Image src={chancesImg} w="50%"></Image>
          </CenteredFlex>
        </GridItem>
        <GridItem {...BlockStyle} id="block29" gridArea="6/9" bg={MoneyBGColor}>
          {BlockFull(29, MonopolyColorTheme.mono7)}
        </GridItem>
        <GridItem {...BlockStyle} id="block30" gridArea="7/9" bg={MoneyBGColor}>
          {BlockFull(30, MonopolyColorTheme.mono7)}
        </GridItem>
        <GridItem {...BlockStyle} id="block31" gridArea="8/9" bg={MoneyBGColor}>
          {BlockFull(31, MonopolyColorTheme.mono7)}
        </GridItem>
        {/* block from 25 to 31 */}

        {/* middle board */}
        <GridItem
          gridArea="2/2/9/9"
          bg="purple.200"
          borderWidth={7}
          rounded={5}
          borderColor="gray.300"
        >
          {/* <RollDice G={G} ctx={ctx} moves={moves}></RollDice> */}
          <CenteredFlex id="diceRollContainer" gap={10}>
            <Rolling G={G} ctx={ctx} moves={moves}></Rolling>
          </CenteredFlex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

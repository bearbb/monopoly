import { useEffect, useState } from "react";
import { blockData } from "src/data/blocksData";
import { BoardProps } from "boardgame.io/react";
import { MonopolyState } from "src/game";
import { isUpgradeAble as isUpAble } from "src/moves/upgradeBuilding";
import { kFormatter } from "src/utils/utilities";
import {
  useToast,
  Grid,
  GridItem,
  GridItemProps,
  Flex,
  FlexProps,
  Image,
  Text,
  Popover,
  PopoverTrigger,
  Button,
} from "@chakra-ui/react";

//components
import { Player } from "src/components/Player";
import { Purchase } from "src/components/Purchase";
import { Upgrade } from "src/components/Upgrade";
import { Selling } from "src/components/Selling";

//board data
import { blocksData } from "src/data/blocksData";

//board img
import goImg from "src/assets/BoardImg/go.png";
import prisonImg from "src/assets/BoardImg/prison.png";
import fifaImg from "src/assets/BoardImg/fifa.png";
import de_airportImg from "src/assets/BoardImg/de_airport.png";
import chancesImg from "src/assets/BoardImg/drawCard.png";
import { Rolling } from "src/components/Rolling";
import { useUserContext } from "src/contexts/UserContext";
import { priceMultiplier } from "src/data/priceMultiplier";
import { PlayerMoney } from "src/components/PlayerMoney";
import {
  isAlreadyOwnedCity,
  isEnoughMoneyToPurchase,
  isOwnedLevel4Building,
  isOwnedResort,
} from "./moves/purchaseCity";
import { Building } from "src/components/Building";

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
const FirstHalfBlock = (
  blockId: number,
  monoThemeColor: string,
  gBlocksData: any[],
  buildingLevel: number[],
  blockOwners: (number | null)[]
) => {
  let cityName = blocksData[blockId].cityName;
  return (
    <Flex {...firstHalfBlockStyle} bg={monoThemeColor} flexDir="column" gap={2}>
      <Text
        fontSize="xs"
        fontWeight="bold"
        color="gray.700"
        textAlign="center"
        flexGrow={2}
      >
        {cityName}
      </Text>
      <Building
        blockId={blockId}
        blocksData={gBlocksData}
        buildingLevel={buildingLevel}
        blockOwners={blockOwners}
      />
    </Flex>
  );
};
// function kFormatter(num: number) {
//   return Math.abs(num) > 999
//     ? (Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1) + "K"
//     : Math.sign(num) * Math.abs(num);
// }
const SecondHalfBlock = (blockId: number, rentPriceList: number[]) => {
  let rentPrice = rentPriceList[blockId];
  if (rentPrice !== undefined) {
    let rentPriceInK = kFormatter(rentPrice);
    return (
      <Flex {...secondHalfBlockStyle}>
        <Text fontSize="sm" fontWeight="extrabold" color="gray.800">
          {rentPriceInK !== 0 ? rentPriceInK : null}
        </Text>
      </Flex>
    );
  }
};

const OverlayBlock = (blockId: number, playerPos: string[][]) => {
  //check if this block have player or not and which tokenId is it
  // console.log(playerPos);
  if (playerPos !== undefined) {
    let tokenIdList: number[] = [];
    let isExist = false;
    if (playerPos[blockId] !== undefined && playerPos[blockId].length > 0) {
      tokenIdList = playerPos[blockId].map((p) => parseInt(p));
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
        {isExist ? <Player tokenId={tokenIdList}></Player> : null}
      </Flex>
    );
  }
};

const GridItemStyle: GridItemProps = {};

const Stages = ["diceMove", "sell", "purchase", "upgrade", "chances"];

const getRentPrice = (
  blockOwners: (number | null)[],
  blocksData: blockData[]
): number[] => {
  //loop through blockOwners arr and check which one is owned
  let temp: number[] = Array(32).fill(null);
  for (let i = 0; i < blockOwners.length; i++) {
    const element = blockOwners[i];
    if (element !== null) {
      let price =
        blocksData[i].basePrice *
        blocksData[i].buildingLevel *
        priceMultiplier.rent;
      temp[i] = price;
    }
  }
  return temp;
};

const getBuildingLevel = (
  blocksData: MonopolyState["blocksData"]
): number[] => {
  let temp = Array(32).fill(null);
  //loop through blocksData and get its building level
  temp = blocksData.map((bdt) => bdt.buildingLevel);
  return temp;
};

export const Board = ({ G, ctx, moves }: BoardProps<MonopolyState>) => {
  const { userData, setUserData } = useUserContext();
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [isRollAble, setIsRollAble] = useState<boolean>(false);
  const [isPurchaseAble, setIsPurchaseAble] = useState<boolean>(false);
  const [isUpgradeAble, setIsUpgradeAble] = useState<boolean>(false);
  const [isSellAble, setIsSellAble] = useState<boolean>(false);
  const [rentPrice, setRentPrice] = useState<number[]>(Array(32).fill(null));
  const [buildingLevel, setBuildingLevel] = useState<number[]>(
    Array(32).fill(null)
  );
  // const [rollCount, setRollCount] = useState(0);
  const [isCurrentPlayer, setIsCurrentPlayer] = useState<boolean>(false);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [assetToSell, setAssetToSell] = useState<number[]>([]);
  const toast = useToast();
  const incMoveCount = () => {
    let temp = moveCount + 1;
    setMoveCount(temp);
  };
  const incRollCount = () => {
    moves.incRollCount();
  };
  const toPrison = () => {
    moves.toPrison();
  };

  const endTurn = () => {
    moves.endTurn();
  };
  const sellAssets = (assets: number[]) => {
    moves.sellAssets(assets);
  };

  const setStage = (stageId: number) => {
    setCurrentStage(stageId);
  };
  const nextStage = () => {
    let currentS = currentStage;
    currentS++;
    setCurrentStage(currentS);
  };
  //check if this player is the current turn
  useEffect(() => {
    if (ctx.currentPlayer === userData.playerId) {
      setIsCurrentPlayer(true);
    } else {
      setIsCurrentPlayer(false);
    }
    return () => {};
  }, [ctx.currentPlayer]);

  //update rentPrice and building level each move
  useEffect(() => {
    let temp = getRentPrice(G.blockOwners, G.blocksData);
    setRentPrice(temp);
    let temp1 = getBuildingLevel(G.blocksData);
    setBuildingLevel(temp1);
    return () => {};
  }, [G.playerPositions, G.blockOwners, G.blocksData]);

  useEffect(() => {
    // console.log(G.rollCount[parseInt(ctx.currentPlayer)]);
    if (
      G.rollCount[parseInt(ctx.currentPlayer)] >= 3 &&
      G.diceRolled[parseInt(ctx.currentPlayer)][0] ===
        G.diceRolled[parseInt(ctx.currentPlayer)][1]
    ) {
      console.log(
        `%cToo much double`,
        "background: #292d3e; color: #f07178; font-weight: bold"
      );
      toast({
        title: "too lucky to continue",
        description:
          "ur have rolled 3 double continuously, u go to prison now !!!",
        isClosable: true,
        duration: 4000,
      });
      toPrison();
      endTurn();
      setStage(0);
    }
    return () => {};
  }, [G.rollCount]);

  useEffect(() => {
    console.log(Stages[currentStage]);
    switch (currentStage) {
      case 0:
        //check if diceRolled is double or not
        let currentPlayerInInt = parseInt(ctx.currentPlayer);
        if (
          G.diceRolled[currentPlayerInInt][0] ===
            G.diceRolled[currentPlayerInInt][1] &&
          G.diceRolled[currentPlayerInInt] !== [0, 0]
        ) {
          //do something i dun know
        }
        //else end turn
        else {
          endTurn();
        }
        //dice move => enable roll button
        setIsRollAble(true);
        //disable other
        setIsUpgradeAble(false);
        setIsPurchaseAble(false);
        break;
      case 1:
        //sell => enable sell
        setIsSellAble(true);
        //disable other
        setIsRollAble(false);
        setIsPurchaseAble(false);
        setIsUpgradeAble(false);
        break;
      case 2:
        //check if purchase able
        if (
          isOwnedResort(G, ctx) ||
          isOwnedLevel4Building(G, ctx) ||
          isAlreadyOwnedCity(G, ctx) ||
          !isEnoughMoneyToPurchase(G, ctx)
        ) {
          console.log("Not purchase able bcs -------");
          setStage(0);
        } else {
          //purchase => enable purchase
          setIsPurchaseAble(true);
          //disable other
          setIsRollAble(false);
          setIsSellAble(false);
          setIsUpgradeAble(false);
        }
        break;
      case 3:
        //upgrade => enable upgrade
        setIsUpgradeAble(true);
        //disable other
        setIsRollAble(false);
        setIsSellAble(false);
        setIsPurchaseAble(false);
        break;
      default:
        break;
    }
    return () => {};
  }, [currentStage]);

  const BlockFull = (
    blockId: number,
    monoThemeColor: string,
    playerPos: string[][] = G.playerPositions
  ) => {
    return (
      <Flex {...blockContentContainerStyle}>
        {FirstHalfBlock(
          blockId,
          monoThemeColor,
          G.blocksData,
          buildingLevel,
          G.blockOwners
        )}
        {SecondHalfBlock(blockId, rentPrice)}
        {OverlayBlock(blockId, playerPos)}
      </Flex>
    );
  };
  return (
    <Flex
      userSelect="none"
      w="100vw"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-tr, purple.300,  pink.200, yellow.400)"
    >
      <PlayerMoney
        playerMoney={G.playerMoney}
        currentPlayer={ctx.currentPlayer}
      />
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
        bg="gray.50"
      >
        {/* GO block */}
        <GridItem {...BlockStyle} id="block0" gridArea="9/9">
          <CenteredFlex>
            <Image src={goImg} w="50%"></Image>
            {OverlayBlock(0, G.playerPositions)}
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
            {OverlayBlock(8, G.playerPositions)}
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
            {OverlayBlock(12, G.playerPositions)}
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
            {OverlayBlock(16, G.playerPositions)}
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
            {OverlayBlock(20, G.playerPositions)}
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
            {OverlayBlock(24, G.playerPositions)}
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
            {OverlayBlock(28, G.playerPositions)}
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
          bg="purple.300"
          // bgGradient="linear(to-tr, purple.200, yellow.200)"
          borderWidth={7}
          rounded={5}
          borderColor="gray.300"
        >
          {/* <RollDice G={G} ctx={ctx} moves={moves}></RollDice> */}
          <CenteredFlex id="diceRollContainer" gap={10} flexDirection="column">
            <Rolling
              G={G}
              ctx={ctx}
              moves={moves}
              nextStage={nextStage}
              setStage={setStage}
              isRollAble={isRollAble}
              incMoveCount={incMoveCount}
              moveCount={moveCount}
              isCurrentPlayer={isCurrentPlayer}
              incRollCount={incRollCount}
              endTurn={endTurn}
            ></Rolling>
            <Flex
              flexDir="row"
              gap={7}
              w="100%"
              h="40%"
              justifyContent="center"
            >
              {/* Purchase stuff */}
              <Popover
                isOpen={isPurchaseAble}
                onClose={() => {
                  setIsPurchaseAble(false);
                  // check if upgrade able
                  if (isUpAble(G, ctx)) {
                    console.log("is up able");
                    setStage(3);
                  } else {
                    console.log("not up able");
                    setStage(0);
                  }
                }}
              >
                <PopoverTrigger>
                  <Button
                    colorScheme="blue"
                    disabled={!isPurchaseAble}
                    borderWidth={2}
                    borderColor="white"
                    w={102}
                  >
                    purchase
                  </Button>
                </PopoverTrigger>
                <Purchase
                  G={G}
                  ctx={ctx}
                  moves={moves}
                  setStage={setStage}
                  incMoveCount={incMoveCount}
                  moveCount={moveCount}
                />
              </Popover>
              {/* Upgrade stuff */}
              <Popover
                isOpen={isUpgradeAble}
                onClose={() => {
                  setIsUpgradeAble(false);
                  setStage(0);
                }}
              >
                <PopoverTrigger>
                  <Button
                    colorScheme="purple"
                    disabled={!isUpgradeAble}
                    borderWidth={2}
                    borderColor="white"
                    w={102}
                  >
                    upgrade
                  </Button>
                </PopoverTrigger>
                <Upgrade
                  G={G}
                  ctx={ctx}
                  moves={moves}
                  setStage={setStage}
                  moveCount={moveCount}
                  incMoveCount={incMoveCount}
                  endTurn={endTurn}
                />
              </Popover>
              <Popover
                isOpen={isSellAble}
                onClose={() => {
                  // setIsSellAble(false);
                  setStage(2);
                }}
              >
                <PopoverTrigger>
                  <Button
                    colorScheme="red"
                    disabled={!isSellAble}
                    borderWidth={2}
                    borderColor="white"
                    w={102}
                  >
                    sell
                  </Button>
                </PopoverTrigger>
                <Selling
                  G={G}
                  ctx={ctx}
                  moves={moves}
                  buildingLevel={buildingLevel}
                  assetToSell={assetToSell}
                  setAssetToSell={setAssetToSell}
                  sellAssets={sellAssets}
                  setStage={setStage}
                />
              </Popover>
            </Flex>
          </CenteredFlex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

// <i className="fas fa-home fa-2x" style={{ color: "#718096" }}></i>

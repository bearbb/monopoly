import React, { useState, useEffect, useRef } from "react";

import {
  Badge,
  Flex,
  Button,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { isUpgradeAble } from "src/moves/upgradeBuilding";
import { findCurrentBlock, getBlockPrice } from "src/utils/utilities";
import { isOwnedLevel4Building } from "src/moves/purchaseCity";
import { useUserContext } from "src/contexts/UserContext";

interface PurchaseProps {
  G: any;
  ctx: any;
  moves: any;
  setStage: (s: number) => void;
  incMoveCount: () => void;
  moveCount: number;
}
export const Purchase = ({
  G,
  ctx,
  moves,
  setStage,
  incMoveCount,
  moveCount,
}: PurchaseProps) => {
  const { userData, setUserData } = useUserContext();
  const [isJustPurchase, setIsJustPurchase] = useState<boolean>(false);
  const toast = useToast();
  const purchaseHandler = () => {
    if (!isRepurchase) {
      moves.purchaseCity();
    } else {
      moves.repurchaseCity();
      toast({
        title: "repurchase",
        description: `player ${ctx.currentPlayer} have repurchased this city`,
        duration: 3000,
        status: "success",
      });
    }
    setIsJustPurchase(true);
    setIsRepurchase(false);
    incMoveCount();
    //check if upAble
  };
  useEffect(() => {
    if (isJustPurchase) {
      if (isUpgradeAble(G, ctx)) {
        setStage(3);
      } else {
        console.log("to dice");
        setStage(0);
      }
    }
    return () => {
      setIsJustPurchase(false);
    };
  }, [isJustPurchase]);

  const [blockPrice, setBlockPrice] = useState<number | null>(null);
  useEffect(() => {
    const blockId = findCurrentBlock(G.playerPositions, userData.playerId);
    //check if this block is owned by other one
    if (blockId !== -1) {
      const price = getBlockPrice(G.blocksData, G.blockOwners, blockId);
      setBlockPrice(price.blockPrice);
      if (
        !isOwnedLevel4Building(G, ctx) &&
        ctx.currentPlayer !== G.blockOwners[blockId] &&
        G.blockOwners[blockId] !== null
      ) {
        console.log(
          `%cSet repurchase`,
          "background: #292d3e; color: #f07178; font-weight: bold"
        );
        setIsRepurchase(true);
      } else {
        setIsRepurchase(false);
      }
    }

    return () => {};
  }, [G.playerPositions]);
  const [isRepurchase, setIsRepurchase] = useState<boolean>(false);

  return (
    <PopoverContent>
      <PopoverArrow></PopoverArrow>
      <PopoverCloseButton />
      <PopoverHeader fontWeight="bold">
        {isRepurchase ? "!!! Repurchasing... !!!" : "Purchasing..."}
      </PopoverHeader>
      <PopoverBody>
        <Flex flexDir="column" gap={5}>
          <Flex w="100%" gap={3}>
            <Text>price: </Text>
            <Badge colorScheme="pink">{blockPrice}</Badge>
          </Flex>
          <Button
            colorScheme="blue"
            onClick={() => {
              purchaseHandler();
            }}
          >
            {isRepurchase ? "Repurchase" : "Purchase"}
          </Button>
        </Flex>
      </PopoverBody>
    </PopoverContent>
  );
};

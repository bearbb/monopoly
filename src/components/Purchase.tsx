import React, { useState, useEffect, useRef } from "react";

import {
  Badge,
  Flex,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Text,
} from "@chakra-ui/react";
import { isUpgradeAble } from "src/moves/upgradeBuilding";
import { findCurrentBlock, getBlockPrice } from "src/utils/utilities";

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
  const [isJustPurchase, setIsJustPurchase] = useState<boolean>(false);
  const purchaseHandler = () => {
    moves.purchaseCity();
    setIsJustPurchase(true);
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
    const blockId = findCurrentBlock(G.playerPositions, ctx.currentPlayer);
    if (blockId !== -1) {
      const price = getBlockPrice(G.blocksData, G.blockOwners, blockId);
      setBlockPrice(price.blockPrice);
    }
    return () => {};
  }, [G.playerPositions]);

  return (
    <PopoverContent>
      <PopoverArrow></PopoverArrow>
      <PopoverCloseButton />
      <PopoverHeader fontWeight="bold">Purchasing...</PopoverHeader>
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
            Purchase
          </Button>
        </Flex>
      </PopoverBody>
    </PopoverContent>
  );
};

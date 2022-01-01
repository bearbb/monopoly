import React, { useState, useEffect, useRef } from "react";

import { upgradePrice as getUpgradePrice } from "src/moves/upgradeBuilding";

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
interface UpgradeProps {
  G: any;
  ctx: any;
  moves: any;
  setStage: (s: number) => void;
  incMoveCount: () => void;
  moveCount: number;
}
export const Upgrade = ({
  G,
  ctx,
  moves,
  setStage,
  incMoveCount,
  moveCount,
}: UpgradeProps) => {
  //TODO: select a level to upgrade
  const upgradeHandler = () => {
    moves.upgradeBuilding();
    incMoveCount();
    setStage(0);
  };
  const [upgradePrice, setUpgradePrice] = useState<number | null>(null);
  useEffect(() => {
    const priceToUpgrade = getUpgradePrice(G, ctx);
    console.log(priceToUpgrade);
    if (priceToUpgrade !== -1) {
      setUpgradePrice(priceToUpgrade);
    }
    return () => {};
  }, [moveCount]);
  return (
    <PopoverContent>
      <PopoverArrow></PopoverArrow>
      <PopoverCloseButton />
      <PopoverHeader fontWeight="bold">Upgrading...</PopoverHeader>
      <PopoverBody>
        <Flex flexDir="column" gap={5}>
          <Flex w="100%" gap={3}>
            <Text>price: </Text>
            <Badge colorScheme="pink">{upgradePrice}</Badge>
          </Flex>
          <Button
            colorScheme="purple"
            onClick={() => {
              upgradeHandler();
            }}
          >
            Upgrade
          </Button>
        </Flex>
      </PopoverBody>
    </PopoverContent>
  );
};

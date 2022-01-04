import { useState, useEffect } from "react";
import { blockData } from "src/data/blocksData";
import { kFormatter } from "src/utils/utilities";
import { priceMultiplier } from "src/data/priceMultiplier";

import {
  Flex,
  Button,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Text,
} from "@chakra-ui/react";

import { listAsset } from "src/moves/sellAsset";

interface SellingProps {
  G: any;
  ctx: any;
  moves: any;
  buildingLevel: number[];
  assetToSell: number[];
  setAssetToSell: (assetToSell: number[]) => void;
  sellAssets: (assets: number[]) => void;
  setStage: (stage: number) => void;
}
export const Selling = ({
  G,
  ctx,
  moves,
  buildingLevel,
  sellAssets,
  setStage,
}: // assetToSell,
// setAssetToSell,
SellingProps) => {
  const [assetToSell, setAssetToSell] = useState<number[]>([]);
  const [isSellAble, setIsSellAble] = useState(false);
  useEffect(() => {
    console.log(assetToSell);
    if (assetToSell.length >= 1) {
      setIsSellAble(true);
    } else {
      setIsSellAble(false);
    }
    return () => {};
  }, [assetToSell]);
  useEffect(() => {
    const getAvailAsset = () => {
      const assetAvail = listAsset(G, ctx);
      if (assetAvail.length > 0) {
        setAssetList(assetAvail);
      }
    };
    getAvailAsset();
    return () => {};
  }, [G, ctx.currentPlayer, ctx]);
  const [assetList, setAssetList] = useState<number[]>([]);

  const addAssetHandler = (blockId: number) => {
    let temp = assetToSell;
    //check if block id is exist
    if (!temp.includes(blockId)) {
      setAssetToSell([...temp, blockId]);
    }
  };
  const removeAssetHandler = (blockId: number) => {
    let temp = assetToSell;
    const index = temp.findIndex((id) => id === blockId);
    if (index !== -1) {
      temp.splice(index, 1);
    }
    setAssetToSell([...temp]);
  };

  const [sellPriceList, setSellPriceList] = useState<
    { blockId: number; sellPrice: number }[]
  >([]);

  useEffect(() => {
    if (assetList.length >= 1) {
      let temp: { blockId: number; sellPrice: number }[] = assetList.map(
        (blockId) => {
          return {
            sellPrice:
              G.blocksData[blockId].basePrice *
              priceMultiplier.sell *
              G.blocksData[blockId].buildingLevel,
            blockId: blockId,
          };
        }
      );
      setSellPriceList(temp);
    }
    return () => {};
  }, [assetList, G.blocksData]);

  const [totalSellMoney, setTotalSellMoney] = useState<number>(0);
  useEffect(() => {
    if (assetToSell.length >= 1) {
      let total = 0;
      assetToSell.forEach((blockId) => {
        //find the sell price for each block id
        const i = sellPriceList.findIndex(
          (sellData) => sellData.blockId === blockId
        );
        if (i !== -1) {
          total += sellPriceList[i].sellPrice;
        }
      });
      setTotalSellMoney(total);
    }
    return () => {};
  }, [assetToSell]);

  const renderAllAssetDetail = () => {
    return assetList.map((assetId) => {
      return (
        <Flex gap={3}>
          <AssetDetail
            blockId={assetId}
            blocksData={G.blocksData}
            buildingLevel={buildingLevel}
            addAssetHandler={addAssetHandler}
            removeAssetHandler={removeAssetHandler}
            key={assetId}
          ></AssetDetail>
        </Flex>
      );
    });
  };

  return (
    <PopoverContent>
      <PopoverArrow></PopoverArrow>
      <PopoverCloseButton />
      <PopoverHeader fontWeight="bold">Selling...</PopoverHeader>
      <PopoverBody userSelect="none">
        <Flex>{renderAllAssetDetail()}</Flex>
        <Flex w="100%" gap={3} mt={3} alignItems="center">
          <Text>total is: </Text>
          <Text color="purple.600" fontWeight="extrabold">
            {totalSellMoney}
          </Text>
          <Button
            size="sm"
            colorScheme="red"
            disabled={!isSellAble}
            onClick={() => {
              //sell all asset in assetToSell
              sellAssets(assetToSell);
              setAssetToSell([]);
              setStage(2);
            }}
          >
            sell
          </Button>
        </Flex>
      </PopoverBody>
    </PopoverContent>
  );
};

interface AssetDetailProps {
  blockId: number;
  blocksData: blockData[];
  buildingLevel: number[];
  addAssetHandler: (blockId: number) => void;
  removeAssetHandler: (blockId: number) => void;
}

const AssetDetail = ({
  blockId,
  blocksData,
  buildingLevel,
  addAssetHandler,
  removeAssetHandler,
}: AssetDetailProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const buildingPriceInKFormat = kFormatter(
    blocksData[blockId].basePrice *
      priceMultiplier.sell *
      blocksData[blockId].buildingLevel
  );
  return (
    <Flex
      w={70}
      h={70}
      ml={3}
      borderWidth={2}
      borderColor="gray.400"
      rounded={5}
      flexDir="column"
      key={blockId}
      onClick={() => {
        if (isClicked) {
          removeAssetHandler(blockId);
        } else {
          addAssetHandler(blockId);
        }
        setIsClicked(!isClicked);
      }}
      cursor="pointer"
      bg={isClicked ? "gray.300" : "gray.50"}
    >
      <Flex w="100%" h="60%" justifyContent="center">
        <Text fontSize="sm" color="gray.800" fontWeight="bold">
          {blocksData[blockId].cityName}
        </Text>
      </Flex>
      <Flex
        w="100%"
        h="40%"
        justifyContent="center"
        borderTop="2px solid #A0AEC0"
      >
        <Text fontSize="sm" fontWeight="extrabold" color="gray.800">
          {buildingPriceInKFormat}
        </Text>
      </Flex>
    </Flex>
  );
};

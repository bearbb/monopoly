import { LobbyClient } from "boardgame.io/client";
import { priceMultiplier } from "../data/priceMultiplier";
import { urlData } from "../data/urlData";
//find current block where user pos is
export const findCurrentBlock = (
  playerPositions: Array<string[]>,
  userId: string
): number => {
  for (let i = 0; i < playerPositions.length; i++) {
    if (playerPositions[i].includes(userId)) {
      return i;
    }
  }
  return -1;
};
interface blockData {
  cityName: String | null;
  specialName: String | null;
  type: String;
  isOwned: boolean;
  buildingLevel: number;
  basePrice: number;
}
export const getBlockPrice = (
  blocksData: blockData[],
  blockOwners: number[],
  blockId: number
): { blockPrice: number; playerIdToReturnMoney: number } => {
  let returnData = {
    blockPrice: -1,
    playerIdToReturnMoney: -1,
  };
  const blockData = blocksData[blockId];
  //check if this block is able to purchase
  if (blockData.type === "CITY" || blockData.type === "RESORT") {
    //check if it is owned by someone else
    //is owned by someone
    if (blockData.isOwned) {
      //if that block is RESORT and owned u can't purchase
      if (blockData.type !== "RESORT") {
        //if it owned by other one u have to pay x time base price to them
        let priceToPay =
          blockData.basePrice *
          priceMultiplier.isOwnedByOther *
          blockData.buildingLevel;
        returnData.blockPrice = priceToPay;
        returnData.playerIdToReturnMoney = blockOwners[blockId];
      }
      //is an resort then u can't buy and the blockPrice still -1
      else {
      }
    }
    //block not owned by someone
    else {
      returnData.blockPrice = blockData.basePrice;
    }
  }
  return returnData;
};

export const isMonopoly = (blockOwners: number[]) => {
  const positions = [
    [1, 2, 3],
    [5, 6, 7],
    [9, 10, 11],
    [13, 15],
    [17, 19],
    [21, 22, 23],
    [25, 26],
    [29, 30, 31],
  ];
  let playerCompleteMonopolyCount = Array(4).fill(null);
  let ownerByPosition: number[][] = [];
  positions.forEach((position) => {
    let ownerOnThisPosList = position.map((i) => {
      return blockOwners[i];
    });
    ownerByPosition.push(ownerOnThisPosList);
  });

  for (let i = 0; i < playerCompleteMonopolyCount.length; i++) {
    //count all array that contain all value equal to i
    let count = 0;
    ownerByPosition.forEach((list) => {
      //if this array contain all value to i
      if (list.every((index) => index == i)) {
        count++;
      }
    });
    playerCompleteMonopolyCount[i] = count;
  }
  //win condition is there one player that have 3 monopoly count
  for (let i = 0; i < playerCompleteMonopolyCount.length; i++) {
    const element = playerCompleteMonopolyCount[i];
    if (element >= 3) {
      console.log(
        `%cPlayer with id ${i} won the game`,
        "background: #292d3e; color: #f07178; font-weight: bold"
      );
      return true;
    }
  }
};

export const bankruptList = (playerMoney: number[], blockOwners: number[]) => {
  //bankrupt when that player have money <= 0 and have no asset
  let bankruptPlayerList: number[] = [];
  //list all player have no money remain
  let beggarList = [];
  for (let i = 0; i < playerMoney.length; i++) {
    const money = playerMoney[i];
    if (money <= 0) {
      beggarList.push(i);
    }
  }
  //loop through that beggar list and find which one not own any asset
  beggarList.forEach((beggarId) => {
    if (!blockOwners.includes(beggarId)) {
      bankruptPlayerList.push(beggarId);
    }
  });
  return bankruptPlayerList;
};

const { protocol, hostname, port } = window.location;
const server = `${protocol}//${hostname}:${port}`;
export const lobbyClient = new LobbyClient({ server });

//check purchase able ??

export const kFormatter = (num: number) => {
  return Math.abs(num) > 999
    ? (Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1) + "K"
    : Math.sign(num) * Math.abs(num);
};

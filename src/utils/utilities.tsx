import { priceMultiplier } from "src/data/priceMultiplier";
//find current block where user pos is
export const findCurrentBlock = (
  playerPositions: Array<number[]>,
  userId: number
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
        let priceToPay = blockData.basePrice * priceMultiplier.isOwnedByOther;
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

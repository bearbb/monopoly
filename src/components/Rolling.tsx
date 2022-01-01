import { useState, useEffect } from "react";

import { Button, Flex } from "@chakra-ui/react";
import { Die } from "src/components/Die";
import { BoardProps } from "boardgame.io/react";
import { MonopolyState } from "src/game";

import { findCurrentBlock } from "src/utils/utilities";
import { isUpgradeAble as isUpAble } from "src/moves/upgradeBuilding";

//context
import { useUserContext } from "src/contexts/UserContext";
import { isHaveEnoughMoneyToPayRent, isHaveToPayRent } from "src/moves/payRent";

// interface RollingProps extends BoardProps<MonopolyState> {
//   //   d1: number;
//   //   d2: number;
// }

const defaultValue = ["one", "two", "three", "four", "five", "six"];

const dRoll = (): number[] => {
  let [d1, d2] = [
    Math.floor(Math.random() * 6 + 1),
    Math.floor(Math.random() * 6 + 1),
  ];
  return [d1, d2];
};

// const rollDice = (): string[] => {
//   let [d1, d2] = dRoll();
//   let diceValueInStr = [defaultValue[d1 - 1], defaultValue[d2 - 1]];
//   // console.log(d1, d2);
//   return diceValueInStr;
// };
const diceValueInStr = (d1: number, d2: number): string[] => {
  return [defaultValue[d1 - 1], defaultValue[d2 - 1]];
};

export const Rolling = ({
  G,
  ctx,
  moves,
  nextStage,
  setStage,
  isRollAble,
  incMoveCount,
  moveCount,
}: {
  G: any;
  ctx: any;
  moves: any;
  isRollAble: boolean;
  setStage: (s: number) => void;
  nextStage: () => void;
  incMoveCount: () => void;
  moveCount: number;
}) => {
  const { userData, setUserData } = useUserContext();
  const [rollCount, setRollCount] = useState<number>(0);
  const [diceValue, setDiceValue] = useState<string[]>(["one", "one"]);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [isJustCome, setIsJustCome] = useState<boolean>(false);
  const rollDiceHandler = () => {
    setIsRolling(true);
    let diceVl = dRoll();
    setTimeout(() => {
      setDiceValue(diceValueInStr(diceVl[0], diceVl[1]));
      setIsRolling(false);
    }, 1000);
    moves.diceMove(diceVl[0], diceVl[1]);
    setIsJustCome(true);
    let temp = rollCount;
    temp++;
    setRollCount(temp);
    setTimeout(() => {
      //check if user have to pay rent
    }, 1000);
    incMoveCount();
  };

  const notPurchaseAbleBlockIndex = [0, 8, 12, 16, 20, 24, 28];
  useEffect(() => {
    //check if current pos is not purchase able
    if (
      notPurchaseAbleBlockIndex.includes(
        findCurrentBlock(G.playerPositions, ctx.currentPlayer)
      )
    ) {
      setStage(0);
    } else {
      //check if current pos is upAble (owned asset)
      console.log(isUpAble(G, ctx));
      if (isUpAble(G, ctx)) {
        setStage(3);
      } else {
        if (isJustCome) {
          if (isHaveToPayRent(G, ctx)) {
            //check if user have to sell asset to pay rent ??
            console.log(
              `%cHave to pay rent`,
              "background: #292d3e; color: #f07178; font-weight: bold"
            );
            if (isHaveEnoughMoneyToPayRent(G, ctx)) {
              console.log(
                `%ctrigger`,
                "background: #292d3e; color: #f07178; font-weight: bold"
              );
              setStage(2);
            } else {
              //sell assets to pay rent
              setStage(1);
            }
          } else {
            console.log(
              `%ctrigger`,
              "background: #292d3e; color: #f07178; font-weight: bold"
            );
            setStage(2);
          }
        }
      }
    }
    return () => {
      setIsJustCome(false);
    };
  }, [isJustCome]);
  return (
    <Flex
      w="100%"
      h="60%"
      justifyContent="center"
      alignItems="center"
      gap={5}
      flexDirection="column"
    >
      <Flex id="DieContainer">
        <Die face={diceValue[0]} isRolling={isRolling}></Die>
        <Die face={diceValue[1]} isRolling={isRolling}></Die>
      </Flex>
      <Flex id="RollBtnContainer">
        <Button
          fontWeight="extrabold"
          size="md"
          colorScheme="orange"
          variant="solid"
          isLoading={isRolling}
          isDisabled={ctx.currentPlayer != userData.playerId}
          onClick={() => {
            rollDiceHandler();
          }}
          disabled={!isRollAble}
          border="2px solid white"
          rounded={5}
        >
          roll
        </Button>
      </Flex>
    </Flex>
  );
};

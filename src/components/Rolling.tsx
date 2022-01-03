import { useState, useEffect, useRef } from "react";

import { Button, Flex, Input, useToast, ToastId } from "@chakra-ui/react";
import { Die } from "src/components/Die";
import { BoardProps } from "boardgame.io/react";
import { MonopolyState } from "src/game";

import { findCurrentBlock } from "src/utils/utilities";
import { isUpgradeAble as isUpAble } from "src/moves/upgradeBuilding";

//context
import { useUserContext } from "src/contexts/UserContext";
import {
  isHaveEnoughMoneyToPayRent,
  isHaveToPayRent,
  moneyHaveToPay,
} from "src/moves/payRent";

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
  isCurrentPlayer,
  incRollCount,
}: {
  G: any;
  ctx: any;
  moves: any;
  isRollAble: boolean;
  setStage: (s: number) => void;
  nextStage: () => void;
  incMoveCount: () => void;
  moveCount: number;
  isCurrentPlayer: boolean;
  incRollCount: () => void;
}) => {
  const toast = useToast();
  const { userData, setUserData } = useUserContext();
  const [rollCount, setRollCount] = useState<number>(0);
  const [diceValue, setDiceValue] = useState<string[]>(["one", "one"]);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [isJustCome, setIsJustCome] = useState<boolean>(false);
  const [cheatDiceValue, setCheatDiceValue] = useState<number[]>([0, 0]);
  const cheatRollHandler = () => {
    setIsRolling(true);
    setTimeout(() => {
      setDiceValue(diceValueInStr(cheatDiceValue[0], cheatDiceValue[1]));
      setIsRolling(false);
    }, 1000);
    moves.diceMove(cheatDiceValue[0], cheatDiceValue[1]);
    setIsJustCome(true);
    let temp = rollCount;
    temp++;
    setRollCount(temp);
    setTimeout(() => {
      //check if user have to pay rent
    }, 1000);
    incMoveCount();
    incRollCount();
  };
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
    incRollCount();
  };

  //auto pay rent after rolling and if not able to pay rent => change to selling
  const payRentToast = (p0: any, p1: any, money: number) => {
    return toast({
      title: "pay rent",
      description: `player ${p0} have pay ${money} to player ${p1}`,
      isClosable: true,
      duration: 5000,
    });
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
      // console.log(isUpAble(G, ctx));
      if (isUpAble(G, ctx)) {
        setStage(3);
      } else {
        if (isJustCome) {
          // console.log("is just come");
          if (isHaveToPayRent(G, ctx)) {
            //check if user have to sell asset to pay rent ??
            // console.log(
            //   `%cHave to pay rent`,
            //   "background: #292d3e; color: #f07178; font-weight: bold"
            // );
            if (isHaveEnoughMoneyToPayRent(G, ctx)) {
              //then pay rent first
              moves.payRent();
              //using a toast to inform to player
              const payRentData = moneyHaveToPay(G, ctx);
              payRentToast(payRentData.p0, payRentData.p1, payRentData.money);
              setStage(2);
            } else {
              //sell assets to pay rent
              setStage(1);
            }
          } else {
            //check if current block is resort or not
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
      <Flex id="RollBtnContainer" flexDir="column">
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
          disabled={!isRollAble || !isCurrentPlayer}
          border="2px solid white"
          rounded={5}
        >
          roll
        </Button>
        <Flex>
          <Input
            placeholder="dice 1"
            onChange={(e) => {
              let temp = cheatDiceValue;
              temp[0] = parseInt(e.target.value);
              setCheatDiceValue(temp);
            }}
          ></Input>
          <Input
            placeholder="dice 2"
            onChange={(e) => {
              let temp = cheatDiceValue;
              temp[1] = parseInt(e.target.value);
              setCheatDiceValue(temp);
            }}
          ></Input>
          <Button
            onClick={() => {
              cheatRollHandler();
            }}
          >
            cheat roll
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

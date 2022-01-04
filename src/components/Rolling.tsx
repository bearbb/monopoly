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
  endTurn,
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
  endTurn: () => void;
}) => {
  const toast = useToast();
  const { userData, setUserData } = useUserContext();
  const [diceValue, setDiceValue] = useState<string[]>(["one", "one"]);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [isJustCome, setIsJustCome] = useState<boolean>(false);
  const [cheatDiceValue, setCheatDiceValue] = useState<number[]>([-1, 0]);
  const [isInPrison, setIsInPrison] = useState(false);

  useEffect(() => {
    let currentPos = findCurrentBlock(G.playerPositions, userData.playerId);
    if (currentPos === 8) {
      setIsInPrison(true);
    } else {
      setIsInPrison(false);
    }
    return () => {};
  }, [G.playerPositions, userData.playerId]);
  useEffect(() => {
    if (isInPrison) {
      toast({
        title: "congratulation",
        description:
          "u have just recruited by the Juventus club, (rolled double to get out)",
        status: "warning",
        isClosable: true,
        duration: 3000,
      });
    }
    return () => {};
  }, [toast, isInPrison]);

  const diceMoveCompact = (d1: number, d2: number) => {
    moves.diceMove(d1, d2);
    setIsJustCome(true);
    setTimeout(() => {
      //check if user have to pay rent
    }, 1000);
    incMoveCount();
    incRollCount();
  };
  const cheatRollHandler = () => {
    setIsRolling(true);
    //toast for receive money
    const currentPos = findCurrentBlock(G.playerPositions, userData.playerId);
    const incomingPos = currentPos + cheatDiceValue[0] + cheatDiceValue[1];
    if (incomingPos >= 31) {
      toast({
        title: "! cash cash !",
        description: "u have received 100k for being alive",
        status: "success",
        isClosable: true,
      });
    }
    setTimeout(() => {
      setDiceValue(diceValueInStr(cheatDiceValue[0], cheatDiceValue[1]));
      setIsRolling(false);
    }, 1000);

    //if is in prison then have to roll double to get out
    if (isInPrison) {
      if (cheatDiceValue[0] !== cheatDiceValue[1]) {
        toast({
          title: "prison rule",
          description: "u have to rolled double to continue",
          isClosable: true,
          duration: 5000,
        });
        endTurn();
      } else {
        diceMoveCompact(cheatDiceValue[0], cheatDiceValue[1]);
      }
    } else {
      diceMoveCompact(cheatDiceValue[0], cheatDiceValue[1]);
    }
  };
  const rollDiceHandler = () => {
    setIsRolling(true);
    let diceVl = dRoll();
    //toast for receive money
    const currentPos = findCurrentBlock(G.playerPositions, userData.playerId);
    const incomingPos = currentPos + diceVl[0] + diceVl[1];
    if (incomingPos > 31) {
      toast({
        title: "! cash cash !",
        description: "u have received 100k for being alive",
        status: "success",
        isClosable: true,
      });
    }
    setTimeout(() => {
      setDiceValue(diceValueInStr(diceVl[0], diceVl[1]));
      setIsRolling(false);
    }, 1000);
    //if is in prison then have to roll double to get out
    if (isInPrison) {
      if (diceVl[0] !== diceVl[1]) {
        toast({
          title: "prison rule",
          description: "u have to rolled double to continue",
          isClosable: true,
          duration: 5000,
        });
        endTurn();
      } else {
        diceMoveCompact(diceVl[0], diceVl[1]);
      }
    } else {
      diceMoveCompact(diceVl[0], diceVl[1]);
    }
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
        // if (false) {
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
        {/* <Flex>
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
        </Flex> */}
      </Flex>
    </Flex>
  );
};

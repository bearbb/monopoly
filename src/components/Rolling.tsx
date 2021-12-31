import { useState } from "react";

import { Button, Flex } from "@chakra-ui/react";
import { Die } from "src/components/Die";
import { BoardProps } from "boardgame.io/react";
import { MonopolyState } from "src/game";
import { diceMove } from "src/moves/diceMove";

interface RollingProps extends BoardProps<MonopolyState> {
  //   d1: number;
  //   d2: number;
}

const defaultValue = ["one", "two", "three", "four", "five", "six"];

const dRoll = (): number[] => {
  let [d1, d2] = [
    Math.floor(Math.random() * 6 + 1),
    Math.floor(Math.random() * 6 + 1),
  ];
  return [d1, d2];
};

const rollDice = (): string[] => {
  let [d1, d2] = dRoll();
  let diceValueInStr = [defaultValue[d1 - 1], defaultValue[d2 - 1]];
  console.log(d1, d2);
  return diceValueInStr;
};
const diceValueInStr = (d1: number, d2: number): string[] => {
  return [defaultValue[d1 - 1], defaultValue[d2 - 1]];
};

export const Rolling = ({
  G,
  ctx,
  moves,
}: {
  G: any;
  ctx: any;
  moves: any;
}) => {
  const [diceValue, setDiceValue] = useState<string[]>(["one", "one"]);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const rollDiceHandler = () => {
    setIsRolling(true);
    let diceVl = dRoll();
    setTimeout(() => {
      setDiceValue(diceValueInStr(diceVl[0], diceVl[1]));
      setIsRolling(false);
    }, 1000);
    moves.diceMove(diceVl[0], diceVl[1]);
  };
  return (
    <Flex
      w="100%"
      h="100%"
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
          onClick={() => {
            rollDiceHandler();
          }}
        >
          roll
        </Button>
      </Flex>
    </Flex>
  );
};

import { useState, useEffect } from "react";
import "src/components/RollDice.css";
import { Button, Flex } from "@chakra-ui/react";
import { BoardProps } from "boardgame.io/react";
import { MonopolyState } from "src/game";

const rollDice = (d1: number, d2: number) => {
  let elDiceOne = document.getElementById("dice1");
  let elDiceTwo = document.getElementById("dice2");
  var diceOne = d1;
  var diceTwo = d2;

  for (var i = 1; i <= 6; i++) {
    elDiceOne!.classList.remove("show-" + i);
    if (diceOne === i) {
      console.log("Stop at" + diceOne);
      elDiceOne!.classList.add("show-" + i);
    }
  }

  for (var k = 1; k <= 6; k++) {
    elDiceTwo!.classList.remove("show-" + k);
    if (diceTwo === k) {
      console.log("Stop" + k);
      elDiceTwo!.classList.add("show-" + k);
    }
  }
  setTimeout(() => {
    // rollDice(d1, d2);
  }, 1000);
};

const dRoll = (): number[] => {
  let [d1, d2] = [
    Math.floor(Math.random() * 6 + 1),
    Math.floor(Math.random() * 6 + 1),
  ];
  return [d1, d2];
};

export const RollDice = ({
  G,
  ctx,
  moves,
}: {
  G: any;
  ctx: any;
  moves: any;
}) => {
  const [diceRolled, setDiceRolled] = useState<number[]>([-1, -2]);
  const rollDiceHandler = () => {
    let [d1, d2] = dRoll();
    // console.log(d1);
    // setDiceRolled([d1, d2]);
    rollDice(d1, d2);
    console.log([d1, d2]);
    setTimeout(() => {}, 1500);
    // moves.diceMove(d1, d2);
  };
  useEffect(() => {
    console.log(diceRolled);
    return () => {};
  }, [diceRolled]);
  return (
    <div className="RollDice">
      <div className="game">
        <div className="container">
          <div id="dice1" className="dice dice-one">
            <div id="dice-one-side-one" className="side one">
              <div className="dot one-1" />
            </div>
            <div id="dice-one-side-two" className="side two">
              <div className="dot two-1" />
              <div className="dot two-2" />
            </div>
            <div id="dice-one-side-three" className="side three">
              <div className="dot three-1" />
              <div className="dot three-2" />
              <div className="dot three-3" />
            </div>
            <div id="dice-one-side-four" className="side four">
              <div className="dot four-1" />
              <div className="dot four-2" />
              <div className="dot four-3" />
              <div className="dot four-4" />
            </div>
            <div id="dice-one-side-five" className="side five">
              <div className="dot five-1" />
              <div className="dot five-2" />
              <div className="dot five-3" />
              <div className="dot five-4" />
              <div className="dot five-5" />
            </div>
            <div id="dice-one-side-six" className="side six">
              <div className="dot six-1" />
              <div className="dot six-2" />
              <div className="dot six-3" />
              <div className="dot six-4" />
              <div className="dot six-5" />
              <div className="dot six-6" />
            </div>
          </div>
        </div>
        <div className="container">
          <div id="dice2" className="dice dice-two">
            <div id="dice-two-side-one" className="side one">
              <div className="dot one-1" />
            </div>
            <div id="dice-two-side-two" className="side two">
              <div className="dot two-1" />
              <div className="dot two-2" />
            </div>
            <div id="dice-two-side-three" className="side three">
              <div className="dot three-1" />
              <div className="dot three-2" />
              <div className="dot three-3" />
            </div>
            <div id="dice-two-side-four" className="side four">
              <div className="dot four-1" />
              <div className="dot four-2" />
              <div className="dot four-3" />
              <div className="dot four-4" />
            </div>
            <div id="dice-two-side-five" className="side five">
              <div className="dot five-1" />
              <div className="dot five-2" />
              <div className="dot five-3" />
              <div className="dot five-4" />
              <div className="dot five-5" />
            </div>
            <div id="dice-two-side-six" className="side six">
              <div className="dot six-1" />
              <div className="dot six-2" />
              <div className="dot six-3" />
              <div className="dot six-4" />
              <div className="dot six-5" />
              <div className="dot six-6" />
            </div>
          </div>
        </div>
        <Flex justifyContent="center">
          <Button
            colorScheme="purple"
            fontWeight="bold"
            onClick={() => rollDiceHandler()}
          >
            roll dice
          </Button>
        </Flex>
      </div>
    </div>
  );
};

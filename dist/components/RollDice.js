"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollDice = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("src/components/RollDice.css");
const react_2 = require("@chakra-ui/react");
const timers_1 = require("timers");
const rollDice = (d1, d2) => {
    let elDiceOne = document.getElementById("dice1");
    let elDiceTwo = document.getElementById("dice2");
    var diceOne = d1;
    var diceTwo = d2;
    for (var i = 1; i <= 6; i++) {
        elDiceOne.classList.remove("show-" + i);
        if (diceOne === i) {
            elDiceOne.classList.add("show-" + i);
        }
    }
    for (var k = 1; k <= 6; k++) {
        elDiceTwo.classList.remove("show-" + k);
        if (diceTwo === k) {
            elDiceTwo.classList.add("show-" + k);
        }
    }
};
const dRoll = () => {
    let [d1, d2] = [
        Math.floor(Math.random() * 6 + 1),
        Math.floor(Math.random() * 6 + 1),
    ];
    return [d1, d2];
};
const RollDice = ({ G, ctx, moves, }) => {
    const [diceRolled, setDiceRolled] = (0, react_1.useState)([-1, -2]);
    const rollDiceHandler = () => {
        let [d1, d2] = dRoll();
        setDiceRolled([d1, d2]);
        rollDice(d1, d2);
        (0, timers_1.setTimeout)(() => { }, 1500);
        moves.diceMove(G, ctx, d1, d2);
    };
    (0, react_1.useEffect)(() => {
        console.log(diceRolled);
        return () => { };
    }, [diceRolled]);
    return ((0, jsx_runtime_1.jsx)("div", { className: "RollDice", children: (0, jsx_runtime_1.jsxs)("div", { className: "game", children: [(0, jsx_runtime_1.jsx)("div", { className: "container", children: (0, jsx_runtime_1.jsxs)("div", { id: "dice1", className: "dice dice-one", children: [(0, jsx_runtime_1.jsx)("div", { id: "dice-one-side-one", className: "side one", children: (0, jsx_runtime_1.jsx)("div", { className: "dot one-1" }, void 0) }, void 0), (0, jsx_runtime_1.jsxs)("div", { id: "dice-one-side-two", className: "side two", children: [(0, jsx_runtime_1.jsx)("div", { className: "dot two-1" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot two-2" }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("div", { id: "dice-one-side-three", className: "side three", children: [(0, jsx_runtime_1.jsx)("div", { className: "dot three-1" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot three-2" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot three-3" }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("div", { id: "dice-one-side-four", className: "side four", children: [(0, jsx_runtime_1.jsx)("div", { className: "dot four-1" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot four-2" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot four-3" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot four-4" }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("div", { id: "dice-one-side-five", className: "side five", children: [(0, jsx_runtime_1.jsx)("div", { className: "dot five-1" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot five-2" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot five-3" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot five-4" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot five-5" }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("div", { id: "dice-one-side-six", className: "side six", children: [(0, jsx_runtime_1.jsx)("div", { className: "dot six-1" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot six-2" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot six-3" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot six-4" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot six-5" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot six-6" }, void 0)] }, void 0)] }, void 0) }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "container", children: (0, jsx_runtime_1.jsxs)("div", { id: "dice2", className: "dice dice-two", children: [(0, jsx_runtime_1.jsx)("div", { id: "dice-two-side-one", className: "side one", children: (0, jsx_runtime_1.jsx)("div", { className: "dot one-1" }, void 0) }, void 0), (0, jsx_runtime_1.jsxs)("div", { id: "dice-two-side-two", className: "side two", children: [(0, jsx_runtime_1.jsx)("div", { className: "dot two-1" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot two-2" }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("div", { id: "dice-two-side-three", className: "side three", children: [(0, jsx_runtime_1.jsx)("div", { className: "dot three-1" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot three-2" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot three-3" }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("div", { id: "dice-two-side-four", className: "side four", children: [(0, jsx_runtime_1.jsx)("div", { className: "dot four-1" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot four-2" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot four-3" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot four-4" }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("div", { id: "dice-two-side-five", className: "side five", children: [(0, jsx_runtime_1.jsx)("div", { className: "dot five-1" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot five-2" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot five-3" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot five-4" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot five-5" }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("div", { id: "dice-two-side-six", className: "side six", children: [(0, jsx_runtime_1.jsx)("div", { className: "dot six-1" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot six-2" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot six-3" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot six-4" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot six-5" }, void 0), (0, jsx_runtime_1.jsx)("div", { className: "dot six-6" }, void 0)] }, void 0)] }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_2.Flex, { justifyContent: "center", children: (0, jsx_runtime_1.jsx)(react_2.Button, { colorScheme: "purple", fontWeight: "bold", onClick: () => rollDiceHandler(), children: "roll dice" }, void 0) }, void 0)] }, void 0) }, void 0));
};
exports.RollDice = RollDice;

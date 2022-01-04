"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upgrade = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const upgradeBuilding_1 = require("src/moves/upgradeBuilding");
const react_2 = require("@chakra-ui/react");
const Upgrade = ({ G, ctx, moves, setStage, incMoveCount, moveCount, endTurn, }) => {
    //TODO: select a level to upgrade
    const upgradeHandler = () => {
        moves.upgradeBuilding();
        incMoveCount();
        //check if previous dice rolled is double or not
        setStage(0);
        if (G.diceRolled[0] === G.diceRolled[1]) {
            //else end turn
        }
        else {
            // console.log(
            //   `%cEnd turn`,
            //   "background: #292d3e; color: #f07178; font-weight: bold"
            // );
            // endTurn();
        }
    };
    const [upgradePrice, setUpgradePrice] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const priceToUpgrade = (0, upgradeBuilding_1.upgradePrice)(G, ctx);
        // console.log(priceToUpgrade);
        if (priceToUpgrade !== -1) {
            setUpgradePrice(priceToUpgrade);
        }
        return () => { };
    }, [moveCount]);
    return ((0, jsx_runtime_1.jsxs)(react_2.PopoverContent, { children: [(0, jsx_runtime_1.jsx)(react_2.PopoverArrow, {}, void 0), (0, jsx_runtime_1.jsx)(react_2.PopoverCloseButton, {}, void 0), (0, jsx_runtime_1.jsx)(react_2.PopoverHeader, { fontWeight: "bold", children: "Upgrading..." }, void 0), (0, jsx_runtime_1.jsx)(react_2.PopoverBody, { children: (0, jsx_runtime_1.jsxs)(react_2.Flex, { flexDir: "column", gap: 5, children: [(0, jsx_runtime_1.jsxs)(react_2.Flex, { w: "100%", gap: 3, children: [(0, jsx_runtime_1.jsx)(react_2.Text, { children: "price: " }, void 0), (0, jsx_runtime_1.jsx)(react_2.Badge, { colorScheme: "pink", children: upgradePrice }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(react_2.Button, { colorScheme: "purple", onClick: () => {
                                upgradeHandler();
                            }, children: "Upgrade" }, void 0)] }, void 0) }, void 0)] }, void 0));
};
exports.Upgrade = Upgrade;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = require("@chakra-ui/react");
const upgradeBuilding_1 = require("src/moves/upgradeBuilding");
const utilities_1 = require("src/utils/utilities");
const purchaseCity_1 = require("src/moves/purchaseCity");
const UserContext_1 = require("src/contexts/UserContext");
const Purchase = ({ G, ctx, moves, setStage, incMoveCount, moveCount, }) => {
    const { userData, setUserData } = (0, UserContext_1.useUserContext)();
    const [isJustPurchase, setIsJustPurchase] = (0, react_1.useState)(false);
    const [isAbleToPurchase, setIsAbleToPurchase] = (0, react_1.useState)(false);
    const toast = (0, react_2.useToast)();
    const purchaseHandler = () => {
        if (!isRepurchase) {
            moves.purchaseCity();
        }
        else {
            moves.repurchaseCity();
            toast({
                title: "repurchase",
                description: `player ${ctx.currentPlayer} have repurchased this city`,
                duration: 3000,
                status: "success",
            });
        }
        setIsJustPurchase(true);
        setIsRepurchase(false);
        incMoveCount();
        //check if upAble
    };
    (0, react_1.useEffect)(() => {
        if (isJustPurchase) {
            if ((0, upgradeBuilding_1.isUpgradeAble)(G, ctx)) {
                setStage(3);
            }
            else {
                console.log("to dice");
                setStage(0);
            }
        }
        return () => {
            setIsJustPurchase(false);
        };
    }, [isJustPurchase]);
    const [blockPrice, setBlockPrice] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const blockId = (0, utilities_1.findCurrentBlock)(G.playerPositions, userData.playerId);
        //check if this block is owned by other one
        if (blockId !== -1) {
            const price = (0, utilities_1.getBlockPrice)(G.blocksData, G.blockOwners, blockId);
            setBlockPrice(price.blockPrice);
            if (!(0, purchaseCity_1.isOwnedLevel4Building)(G, ctx) &&
                ctx.currentPlayer !== G.blockOwners[blockId] &&
                G.blockOwners[blockId] !== null) {
                console.log(`%cSet repurchase`, "background: #292d3e; color: #f07178; font-weight: bold");
                setIsRepurchase(true);
            }
            else {
                setIsRepurchase(false);
            }
        }
        return () => { };
    }, [moveCount, G, ctx, userData]);
    const [isRepurchase, setIsRepurchase] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(react_2.PopoverContent, { children: [(0, jsx_runtime_1.jsx)(react_2.PopoverArrow, {}, void 0), (0, jsx_runtime_1.jsx)(react_2.PopoverCloseButton, {}, void 0), (0, jsx_runtime_1.jsx)(react_2.PopoverHeader, { fontWeight: "bold", children: isRepurchase ? "!!! Repurchasing... !!!" : "Purchasing..." }, void 0), (0, jsx_runtime_1.jsx)(react_2.PopoverBody, { children: (0, jsx_runtime_1.jsxs)(react_2.Flex, { flexDir: "column", gap: 5, children: [(0, jsx_runtime_1.jsxs)(react_2.Flex, { w: "100%", gap: 3, children: [(0, jsx_runtime_1.jsx)(react_2.Text, { children: "price: " }, void 0), (0, jsx_runtime_1.jsx)(react_2.Badge, { colorScheme: "pink", children: blockPrice }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(react_2.Button, { colorScheme: "blue", onClick: () => {
                                purchaseHandler();
                            }, children: isRepurchase ? "Repurchase" : "Purchase" }, void 0)] }, void 0) }, void 0)] }, void 0));
};
exports.Purchase = Purchase;

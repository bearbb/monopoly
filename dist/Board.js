"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = exports.CenteredFlex = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const upgradeBuilding_1 = require("src/moves/upgradeBuilding");
const utilities_1 = require("src/utils/utilities");
const react_2 = require("@chakra-ui/react");
//components
const Player_1 = require("src/components/Player");
const Purchase_1 = require("src/components/Purchase");
const Upgrade_1 = require("src/components/Upgrade");
const Selling_1 = require("src/components/Selling");
//board data
const blocksData_1 = require("src/data/blocksData");
//board img
const go_png_1 = __importDefault(require("src/assets/BoardImg/go.png"));
const prison_png_1 = __importDefault(require("src/assets/BoardImg/prison.png"));
const fifa_png_1 = __importDefault(require("src/assets/BoardImg/fifa.png"));
const de_airport_png_1 = __importDefault(require("src/assets/BoardImg/de_airport.png"));
const drawCard_png_1 = __importDefault(require("src/assets/BoardImg/drawCard.png"));
const Rolling_1 = require("src/components/Rolling");
const UserContext_1 = require("src/contexts/UserContext");
const priceMultiplier_1 = require("src/data/priceMultiplier");
const PlayerMoney_1 = require("src/components/PlayerMoney");
const purchaseCity_1 = require("./moves/purchaseCity");
const Building_1 = require("src/components/Building");
const MoneyBGColor = "gray.50";
const MonopolyColorTheme = {
    mono0: "red.200",
    mono1: "red.300",
    mono2: "orange.200",
    mono3: "orange.300",
    mono4: "yellow.300",
    mono5: "yellow.200",
    mono6: "green.200",
    mono7: "green.300",
    resort: "blue.100",
    chances: "purple.200",
};
const BlockStyle = {
    borderWidth: 1.5,
    borderColor: "gray.500",
    position: "relative",
    bg: MoneyBGColor,
};
const blockContentContainerStyle = {
    flexDirection: "column",
    w: "100%",
    h: "100%",
};
const firstHalfBlockStyle = {
    h: "70%",
    justifyContent: "center",
    alignItems: "center",
    // p: 2,
};
const secondHalfBlockStyle = {
    h: "30%",
    borderTop: "1px solid gray",
    justifyContent: "center",
    alignItems: "center",
};
const CenteredFlex = (props) => ((0, jsx_runtime_1.jsx)(react_2.Flex, { ...props, w: "100%", h: "100%", justifyContent: "center", alignItems: "center" }, void 0));
exports.CenteredFlex = CenteredFlex;
const FirstHalfBlock = (blockId, monoThemeColor, gBlocksData, buildingLevel, blockOwners) => {
    let cityName = blocksData_1.blocksData[blockId].cityName;
    return ((0, jsx_runtime_1.jsxs)(react_2.Flex, { ...firstHalfBlockStyle, bg: monoThemeColor, flexDir: "column", gap: 2, children: [(0, jsx_runtime_1.jsx)(react_2.Text, { fontSize: "xs", fontWeight: "bold", color: "gray.700", textAlign: "center", flexGrow: 2, children: cityName }, void 0), (0, jsx_runtime_1.jsx)(Building_1.Building, { blockId: blockId, blocksData: gBlocksData, buildingLevel: buildingLevel, blockOwners: blockOwners }, void 0)] }, void 0));
};
// function kFormatter(num: number) {
//   return Math.abs(num) > 999
//     ? (Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1) + "K"
//     : Math.sign(num) * Math.abs(num);
// }
const SecondHalfBlock = (blockId, rentPriceList) => {
    let rentPrice = rentPriceList[blockId];
    if (rentPrice !== undefined) {
        let rentPriceInK = (0, utilities_1.kFormatter)(rentPrice);
        return ((0, jsx_runtime_1.jsx)(react_2.Flex, { ...secondHalfBlockStyle, children: (0, jsx_runtime_1.jsx)(react_2.Text, { fontSize: "sm", fontWeight: "extrabold", color: "gray.800", children: rentPriceInK !== 0 ? rentPriceInK : null }, void 0) }, void 0));
    }
};
const OverlayBlock = (blockId, playerPos) => {
    //check if this block have player or not and which tokenId is it
    // console.log(playerPos);
    if (playerPos !== undefined) {
        let tokenIdList = [];
        let isExist = false;
        if (playerPos[blockId] !== undefined && playerPos[blockId].length > 0) {
            tokenIdList = playerPos[blockId].map((p) => parseInt(p));
            isExist = true;
        }
        // console.log(tokenIdList[0]);
        return ((0, jsx_runtime_1.jsx)(react_2.Flex, { id: `ovlBlock${blockId}`, position: "absolute", w: "100%", h: "100%", top: "0", bottom: "0", left: "0", right: "0", justifyContent: "center", alignItems: "center", children: isExist ? (0, jsx_runtime_1.jsx)(Player_1.Player, { tokenId: tokenIdList }, void 0) : null }, void 0));
    }
};
const GridItemStyle = {};
const Stages = ["diceMove", "sell", "purchase", "upgrade", "chances"];
const getRentPrice = (blockOwners, blocksData) => {
    //loop through blockOwners arr and check which one is owned
    let temp = Array(32).fill(null);
    for (let i = 0; i < blockOwners.length; i++) {
        const element = blockOwners[i];
        if (element !== null) {
            let price = blocksData[i].basePrice *
                blocksData[i].buildingLevel *
                priceMultiplier_1.priceMultiplier.rent;
            temp[i] = price;
        }
    }
    return temp;
};
const getBuildingLevel = (blocksData) => {
    let temp = Array(32).fill(null);
    //loop through blocksData and get its building level
    temp = blocksData.map((bdt) => bdt.buildingLevel);
    return temp;
};
const Board = ({ G, ctx, moves }) => {
    const { userData, setUserData } = (0, UserContext_1.useUserContext)();
    const [currentStage, setCurrentStage] = (0, react_1.useState)(0);
    const [isRollAble, setIsRollAble] = (0, react_1.useState)(false);
    const [isPurchaseAble, setIsPurchaseAble] = (0, react_1.useState)(false);
    const [isUpgradeAble, setIsUpgradeAble] = (0, react_1.useState)(false);
    const [isSellAble, setIsSellAble] = (0, react_1.useState)(false);
    const [rentPrice, setRentPrice] = (0, react_1.useState)(Array(32).fill(null));
    const [buildingLevel, setBuildingLevel] = (0, react_1.useState)(Array(32).fill(null));
    // const [rollCount, setRollCount] = useState(0);
    const [isCurrentPlayer, setIsCurrentPlayer] = (0, react_1.useState)(false);
    const [moveCount, setMoveCount] = (0, react_1.useState)(0);
    const [assetToSell, setAssetToSell] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        console.log(assetToSell);
        return () => { };
    }, [assetToSell]);
    const toast = (0, react_2.useToast)();
    const incMoveCount = () => {
        let temp = moveCount + 1;
        setMoveCount(temp);
    };
    const incRollCount = () => {
        moves.incRollCount();
    };
    const toPrison = () => {
        moves.toPrison();
    };
    const endTurn = () => {
        moves.endTurn();
    };
    const sellAssets = (assets) => {
        moves.sellAssets(assets);
    };
    const setStage = (stageId) => {
        setCurrentStage(stageId);
    };
    const nextStage = () => {
        let currentS = currentStage;
        currentS++;
        setCurrentStage(currentS);
    };
    //check if this player is the current turn
    (0, react_1.useEffect)(() => {
        if (ctx.currentPlayer === userData.playerId) {
            setIsCurrentPlayer(true);
        }
        else {
            setIsCurrentPlayer(false);
        }
        return () => { };
    }, [ctx.currentPlayer]);
    //update rentPrice and building level each move
    (0, react_1.useEffect)(() => {
        let temp = getRentPrice(G.blockOwners, G.blocksData);
        setRentPrice(temp);
        let temp1 = getBuildingLevel(G.blocksData);
        setBuildingLevel(temp1);
        return () => { };
    }, [G.playerPositions, G.blockOwners, G.blocksData]);
    (0, react_1.useEffect)(() => {
        // console.log(G.rollCount[parseInt(ctx.currentPlayer)]);
        if (G.rollCount[parseInt(ctx.currentPlayer)] >= 3 &&
            G.diceRolled[parseInt(ctx.currentPlayer)][0] ===
                G.diceRolled[parseInt(ctx.currentPlayer)][1]) {
            console.log(`%cToo much double`, "background: #292d3e; color: #f07178; font-weight: bold");
            toast({
                title: "too lucky to continue",
                description: "ur have rolled 3 double continuously, u go to prison now !!!",
                isClosable: true,
                duration: 4000,
            });
            toPrison();
            endTurn();
            setStage(0);
        }
        return () => { };
    }, [G.rollCount]);
    (0, react_1.useEffect)(() => {
        console.log(Stages[currentStage]);
        switch (currentStage) {
            case 0:
                //check if diceRolled is double or not
                let currentPlayerInInt = parseInt(ctx.currentPlayer);
                if (G.diceRolled[currentPlayerInInt][0] ===
                    G.diceRolled[currentPlayerInInt][1] &&
                    G.diceRolled[currentPlayerInInt] !== [0, 0]) {
                    //do something i dun know
                }
                //else end turn
                else {
                    endTurn();
                }
                //dice move => enable roll button
                setIsRollAble(true);
                //disable other
                setIsUpgradeAble(false);
                setIsPurchaseAble(false);
                break;
            case 1:
                //sell => enable sell
                setIsSellAble(true);
                //disable other
                setIsRollAble(false);
                setIsPurchaseAble(false);
                setIsUpgradeAble(false);
                break;
            case 2:
                //check if purchase able
                if ((0, purchaseCity_1.isOwnedResort)(G, ctx) || (0, purchaseCity_1.isOwnedLevel4Building)(G, ctx)) {
                    console.log("Not purchase able bcs -------");
                    setStage(0);
                }
                else {
                    //purchase => enable purchase
                    setIsPurchaseAble(true);
                    //disable other
                    setIsRollAble(false);
                    setIsSellAble(false);
                    setIsUpgradeAble(false);
                }
                break;
            case 3:
                //upgrade => enable upgrade
                setIsUpgradeAble(true);
                //disable other
                setIsRollAble(false);
                setIsSellAble(false);
                setIsPurchaseAble(false);
                break;
            default:
                break;
        }
        return () => { };
    }, [currentStage]);
    const BlockFull = (blockId, monoThemeColor, playerPos = G.playerPositions) => {
        return ((0, jsx_runtime_1.jsxs)(react_2.Flex, { ...blockContentContainerStyle, children: [FirstHalfBlock(blockId, monoThemeColor, G.blocksData, buildingLevel, G.blockOwners), SecondHalfBlock(blockId, rentPrice), OverlayBlock(blockId, playerPos)] }, void 0));
    };
    return ((0, jsx_runtime_1.jsxs)(react_2.Flex, { userSelect: "none", w: "100vw", h: "100vh", justifyContent: "center", alignItems: "center", bgGradient: "linear(to-tr, purple.300,  pink.200, yellow.400)", children: [(0, jsx_runtime_1.jsx)(PlayerMoney_1.PlayerMoney, { playerMoney: G.playerMoney, currentPlayer: ctx.currentPlayer }, void 0), (0, jsx_runtime_1.jsxs)(react_2.Grid, { templateColumns: "repeat(9, minmax(0, 1fr))", templateRows: "repeat(9, minmax(0, 1fr))", height: 750, w: 750, gap: 1, borderWidth: 2, borderColor: "gray.400", rounded: 5, p: 1.5, bg: "gray.50", children: [(0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block0", gridArea: "9/9", children: (0, jsx_runtime_1.jsxs)(exports.CenteredFlex, { children: [(0, jsx_runtime_1.jsx)(react_2.Image, { src: go_png_1.default, w: "50%" }, void 0), OverlayBlock(0, G.playerPositions)] }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block1", gridArea: "9/8", bg: MoneyBGColor, children: BlockFull(1, MonopolyColorTheme.mono0, G.playerPositions) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block2", gridArea: "9/7", bg: MoneyBGColor, children: BlockFull(2, MonopolyColorTheme.mono0, G.playerPositions) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block3", gridArea: "9/6", bg: MoneyBGColor, children: BlockFull(3, MonopolyColorTheme.mono0, G.playerPositions) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block4", gridArea: "9/5", bg: MoneyBGColor, children: BlockFull(4, MonopolyColorTheme.resort, G.playerPositions) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block5", gridArea: "9/4", bg: MoneyBGColor, children: BlockFull(5, MonopolyColorTheme.mono1) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block6", gridArea: "9/3", bg: MoneyBGColor, children: BlockFull(6, MonopolyColorTheme.mono1) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block7", gridArea: "9/2", bg: MoneyBGColor, children: BlockFull(7, MonopolyColorTheme.mono1) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block8", gridArea: "9/1", bg: "gray.100", children: (0, jsx_runtime_1.jsxs)(react_2.Flex, { w: "100%", h: "100%", justifyContent: "center", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(react_2.Image, { src: prison_png_1.default, w: "50%" }, void 0), OverlayBlock(8, G.playerPositions)] }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block9", gridArea: "8/1", bg: MoneyBGColor, children: BlockFull(9, MonopolyColorTheme.mono2) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block10", gridArea: "7/1", bg: MoneyBGColor, children: BlockFull(10, MonopolyColorTheme.mono2) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block11", gridArea: "6/1", bg: MoneyBGColor, children: BlockFull(11, MonopolyColorTheme.mono2) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block12", gridArea: "5/1", bg: MonopolyColorTheme.chances, children: (0, jsx_runtime_1.jsxs)(exports.CenteredFlex, { children: [(0, jsx_runtime_1.jsx)(react_2.Image, { src: drawCard_png_1.default, w: "50%" }, void 0), OverlayBlock(12, G.playerPositions)] }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block13", gridArea: "4/1", bg: MoneyBGColor, children: BlockFull(13, MonopolyColorTheme.mono3) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block14", gridArea: "3/1", bg: MoneyBGColor, children: BlockFull(14, MonopolyColorTheme.resort) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block15", gridArea: "2/1", bg: MoneyBGColor, children: BlockFull(15, MonopolyColorTheme.mono3) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block16", gridArea: "1/1", bg: "gray.100", children: (0, jsx_runtime_1.jsxs)(exports.CenteredFlex, { children: [(0, jsx_runtime_1.jsx)(react_2.Image, { src: fifa_png_1.default, w: "50%" }, void 0), OverlayBlock(16, G.playerPositions)] }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block17", gridArea: "1/2", bg: MoneyBGColor, children: BlockFull(17, MonopolyColorTheme.mono4) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block18", gridArea: "1/3", bg: MoneyBGColor, children: BlockFull(18, MonopolyColorTheme.resort) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block19", gridArea: "1/4", bg: MoneyBGColor, children: BlockFull(19, MonopolyColorTheme.mono4) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block20", gridArea: "1/5", bg: MonopolyColorTheme.chances, children: (0, jsx_runtime_1.jsxs)(exports.CenteredFlex, { children: [(0, jsx_runtime_1.jsx)(react_2.Image, { src: drawCard_png_1.default, w: "50%" }, void 0), OverlayBlock(20, G.playerPositions)] }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block21", gridArea: "1/6", bg: MoneyBGColor, children: BlockFull(21, MonopolyColorTheme.mono4) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block22", gridArea: "1/7", bg: MoneyBGColor, children: BlockFull(22, MonopolyColorTheme.mono5) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block23", gridArea: "1/8", bg: MoneyBGColor, children: BlockFull(23, MonopolyColorTheme.mono5) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block24", gridArea: "1/9", bg: "gray.100", children: (0, jsx_runtime_1.jsxs)(exports.CenteredFlex, { children: [(0, jsx_runtime_1.jsx)(react_2.Image, { w: "50%", src: de_airport_png_1.default }, void 0), OverlayBlock(24, G.playerPositions)] }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block25", gridArea: "2/9", bg: MoneyBGColor, children: BlockFull(25, MonopolyColorTheme.mono6) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block26", gridArea: "3/9", bg: MoneyBGColor, children: BlockFull(26, MonopolyColorTheme.mono6) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block27", gridArea: "4/9", bg: MoneyBGColor, children: BlockFull(27, MonopolyColorTheme.resort) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block28", gridArea: "5/9", bg: MonopolyColorTheme.chances, children: (0, jsx_runtime_1.jsxs)(exports.CenteredFlex, { children: [OverlayBlock(28, G.playerPositions), (0, jsx_runtime_1.jsx)(react_2.Image, { src: drawCard_png_1.default, w: "50%" }, void 0)] }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block29", gridArea: "6/9", bg: MoneyBGColor, children: BlockFull(29, MonopolyColorTheme.mono7) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block30", gridArea: "7/9", bg: MoneyBGColor, children: BlockFull(30, MonopolyColorTheme.mono7) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { ...BlockStyle, id: "block31", gridArea: "8/9", bg: MoneyBGColor, children: BlockFull(31, MonopolyColorTheme.mono7) }, void 0), (0, jsx_runtime_1.jsx)(react_2.GridItem, { gridArea: "2/2/9/9", bg: "purple.300", 
                        // bgGradient="linear(to-tr, purple.200, yellow.200)"
                        borderWidth: 7, rounded: 5, borderColor: "gray.300", children: (0, jsx_runtime_1.jsxs)(exports.CenteredFlex, { id: "diceRollContainer", gap: 10, flexDirection: "column", children: [(0, jsx_runtime_1.jsx)(Rolling_1.Rolling, { G: G, ctx: ctx, moves: moves, nextStage: nextStage, setStage: setStage, isRollAble: isRollAble, incMoveCount: incMoveCount, moveCount: moveCount, isCurrentPlayer: isCurrentPlayer, incRollCount: incRollCount, endTurn: endTurn }, void 0), (0, jsx_runtime_1.jsxs)(react_2.Flex, { flexDir: "row", gap: 7, w: "100%", h: "40%", justifyContent: "center", children: [(0, jsx_runtime_1.jsxs)(react_2.Popover, { isOpen: isPurchaseAble, onClose: () => {
                                                setIsPurchaseAble(false);
                                                // check if upgrade able
                                                if ((0, upgradeBuilding_1.isUpgradeAble)(G, ctx)) {
                                                    console.log("is up able");
                                                    setStage(3);
                                                }
                                                else {
                                                    console.log("not up able");
                                                    setStage(0);
                                                }
                                            }, children: [(0, jsx_runtime_1.jsx)(react_2.PopoverTrigger, { children: (0, jsx_runtime_1.jsx)(react_2.Button, { colorScheme: "blue", disabled: !isPurchaseAble, borderWidth: 2, borderColor: "white", w: 102, children: "purchase" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(Purchase_1.Purchase, { G: G, ctx: ctx, moves: moves, setStage: setStage, incMoveCount: incMoveCount, moveCount: moveCount }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(react_2.Popover, { isOpen: isUpgradeAble, onClose: () => {
                                                setIsUpgradeAble(false);
                                                setStage(0);
                                            }, children: [(0, jsx_runtime_1.jsx)(react_2.PopoverTrigger, { children: (0, jsx_runtime_1.jsx)(react_2.Button, { colorScheme: "purple", disabled: !isUpgradeAble, borderWidth: 2, borderColor: "white", w: 102, children: "upgrade" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(Upgrade_1.Upgrade, { G: G, ctx: ctx, moves: moves, setStage: setStage, moveCount: moveCount, incMoveCount: incMoveCount, endTurn: endTurn }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)(react_2.Popover, { isOpen: isSellAble, onClose: () => {
                                                setIsSellAble(false);
                                                setStage(2);
                                            }, children: [(0, jsx_runtime_1.jsx)(react_2.PopoverTrigger, { children: (0, jsx_runtime_1.jsx)(react_2.Button, { colorScheme: "red", disabled: !isSellAble, borderWidth: 2, borderColor: "white", w: 102, children: "sell" }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(Selling_1.Selling, { G: G, ctx: ctx, moves: moves, buildingLevel: buildingLevel, assetToSell: assetToSell, setAssetToSell: setAssetToSell, sellAssets: sellAssets }, void 0)] }, void 0)] }, void 0)] }, void 0) }, void 0)] }, void 0)] }, void 0));
};
exports.Board = Board;

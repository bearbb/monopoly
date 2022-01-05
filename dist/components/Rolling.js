"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rolling = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = require("@chakra-ui/react");
const Die_1 = require("src/components/Die");
const utilities_1 = require("src/utils/utilities");
const upgradeBuilding_1 = require("src/moves/upgradeBuilding");
//context
const UserContext_1 = require("src/contexts/UserContext");
const payRent_1 = require("src/moves/payRent");
// interface RollingProps extends BoardProps<MonopolyState> {
//   //   d1: number;
//   //   d2: number;
// }
const defaultValue = ["one", "two", "three", "four", "five", "six"];
const dRoll = () => {
    let [d1, d2] = [
        Math.floor(Math.random() * 6 + 1),
        Math.floor(Math.random() * 6 + 1),
    ];
    return [d1, d2];
};
const diceValueInStr = (d1, d2) => {
    return [defaultValue[d1 - 1], defaultValue[d2 - 1]];
};
const Rolling = ({ G, ctx, moves, nextStage, setStage, isRollAble, incMoveCount, moveCount, isCurrentPlayer, incRollCount, endTurn, }) => {
    const toast = (0, react_2.useToast)();
    const { userData, setUserData } = (0, UserContext_1.useUserContext)();
    const [diceValue, setDiceValue] = (0, react_1.useState)(["one", "one"]);
    const [isRolling, setIsRolling] = (0, react_1.useState)(false);
    const [isJustCome, setIsJustCome] = (0, react_1.useState)(false);
    const [cheatDiceValue, setCheatDiceValue] = (0, react_1.useState)([-1, 0]);
    const [isInPrison, setIsInPrison] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        let currentPos = (0, utilities_1.findCurrentBlock)(G.playerPositions, userData.playerId);
        if (currentPos === 8) {
            setIsInPrison(true);
        }
        else {
            setIsInPrison(false);
        }
        return () => { };
    }, [G.playerPositions, userData.playerId]);
    (0, react_1.useEffect)(() => {
        if (isInPrison) {
            toast({
                title: "congratulation",
                description: "u have just recruited by the Juventus club, (rolled double to get out)",
                status: "warning",
                isClosable: true,
                duration: 3000,
            });
        }
        return () => { };
    }, [toast, isInPrison]);
    const diceMoveCompact = (d1, d2) => {
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
        const currentPos = (0, utilities_1.findCurrentBlock)(G.playerPositions, userData.playerId);
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
            }
            else {
                diceMoveCompact(cheatDiceValue[0], cheatDiceValue[1]);
            }
        }
        else {
            diceMoveCompact(cheatDiceValue[0], cheatDiceValue[1]);
        }
    };
    const rollDiceHandler = () => {
        setIsRolling(true);
        let diceVl = dRoll();
        //toast for receive money
        const currentPos = (0, utilities_1.findCurrentBlock)(G.playerPositions, userData.playerId);
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
            }
            else {
                diceMoveCompact(diceVl[0], diceVl[1]);
            }
        }
        else {
            diceMoveCompact(diceVl[0], diceVl[1]);
        }
    };
    //auto pay rent after rolling and if not able to pay rent => change to selling
    const payRentToast = (p0, p1, money) => {
        return toast({
            title: "pay rent",
            description: `player ${p0} have pay ${money} to player ${p1}`,
            isClosable: true,
            duration: 5000,
        });
    };
    const notPurchaseAbleBlockIndex = [0, 8, 12, 16, 20, 24, 28];
    (0, react_1.useEffect)(() => {
        //check if current pos is not purchase able
        if (notPurchaseAbleBlockIndex.includes((0, utilities_1.findCurrentBlock)(G.playerPositions, ctx.currentPlayer))) {
            setStage(0);
        }
        else {
            //check if current pos is upAble (owned asset)
            // console.log(isUpAble(G, ctx));
            if ((0, upgradeBuilding_1.isUpgradeAble)(G, ctx)) {
                // if (false) {
                setStage(3);
            }
            else {
                if (isJustCome) {
                    // console.log("is just come");
                    if ((0, payRent_1.isHaveToPayRent)(G, ctx)) {
                        //check if user have to sell asset to pay rent ??
                        // console.log(
                        //   `%cHave to pay rent`,
                        //   "background: #292d3e; color: #f07178; font-weight: bold"
                        // );
                        if ((0, payRent_1.isHaveEnoughMoneyToPayRent)(G, ctx)) {
                            //then pay rent first
                            moves.payRent();
                            //using a toast to inform to player
                            const payRentData = (0, payRent_1.moneyHaveToPay)(G, ctx);
                            payRentToast(payRentData.p0, payRentData.p1, payRentData.money);
                            setStage(2);
                        }
                        else {
                            //sell assets to pay rent
                            setStage(1);
                        }
                    }
                    else {
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
    return ((0, jsx_runtime_1.jsxs)(react_2.Flex, { w: "100%", h: "60%", justifyContent: "center", alignItems: "center", gap: 5, flexDirection: "column", children: [(0, jsx_runtime_1.jsxs)(react_2.Flex, { id: "DieContainer", children: [(0, jsx_runtime_1.jsx)(Die_1.Die, { face: diceValue[0], isRolling: isRolling }, void 0), (0, jsx_runtime_1.jsx)(Die_1.Die, { face: diceValue[1], isRolling: isRolling }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(react_2.Flex, { id: "RollBtnContainer", flexDir: "column", children: (0, jsx_runtime_1.jsx)(react_2.Button, { fontWeight: "extrabold", size: "md", colorScheme: "orange", variant: "solid", isLoading: isRolling, isDisabled: ctx.currentPlayer != userData.playerId, onClick: () => {
                        rollDiceHandler();
                    }, disabled: !isRollAble || !isCurrentPlayer, border: "2px solid white", rounded: 5, children: "roll" }, void 0) }, void 0)] }, void 0));
};
exports.Rolling = Rolling;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerMoney = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const utilities_1 = require("src/utils/utilities");
const react_2 = require("@chakra-ui/react");
//token
const _0_png_1 = __importDefault(require("src/assets/PlayerToken/0.png"));
const _1_png_1 = __importDefault(require("src/assets/PlayerToken/1.png"));
const _2_png_1 = __importDefault(require("src/assets/PlayerToken/2.png"));
const _3_png_1 = __importDefault(require("src/assets/PlayerToken/3.png"));
const UserContext_1 = require("src/contexts/UserContext");
const tokenSelector = (tokenId) => {
    if (tokenId === 0) {
        return _0_png_1.default;
    }
    else if (tokenId === 1) {
        return _1_png_1.default;
    }
    else if (tokenId === 2) {
        return _2_png_1.default;
    }
    else {
        return _3_png_1.default;
    }
};
const PlayerTokenAndMoney = ({ tokenId, money, username, currentPlayer, }) => {
    const ActivePlayerStyle = {
        opacity: 1,
    };
    return ((0, jsx_runtime_1.jsxs)(react_2.Flex, { w: 300, h: 70, gap: 3, borderWidth: 2, borderColor: "gray.500", rounded: 5, bg: "gray.50", opacity: parseInt(currentPlayer) === tokenId ? 1 : 0.3, children: [(0, jsx_runtime_1.jsx)(react_2.Flex, { w: 70, h: "100%", justifyContent: "center", alignItems: "center", borderRight: "2px solid #718096", children: (0, jsx_runtime_1.jsx)(react_2.Image, { src: tokenSelector(tokenId), w: "auto", h: "60px" }, void 0) }, void 0), (0, jsx_runtime_1.jsxs)(react_2.Flex, { flexDir: "column", h: "100%", justifyContent: "space-between", children: [(0, jsx_runtime_1.jsx)(react_2.Text, { fontSize: "xl", fontWeight: "extrabold", color: "red.700", children: username }, void 0), (0, jsx_runtime_1.jsx)(react_2.Text, { fontSize: "2xl", fontWeight: "extrabold", children: money.toLocaleString() }, void 0)] }, void 0)] }, void 0));
};
const getLobbyPlayerName = async (lobbyId) => {
    try {
        const { players } = await utilities_1.lobbyClient.getMatch("default", lobbyId);
        let temp = players.map((p) => ({
            id: p.id,
            name: p.name,
        }));
        return temp;
    }
    catch (error) {
        return null;
    }
};
const PlayerMoney = ({ playerMoney, currentPlayer, }) => {
    const { userData, setUserData } = (0, UserContext_1.useUserContext)();
    const [playerName, setPlayerName] = (0, react_1.useState)([]);
    const getNSetLobbyPlayerName = async (lobbyId) => {
        const players = await getLobbyPlayerName(lobbyId);
        if (players !== null) {
            let temp = players.map((p) => p.name);
            setPlayerName(temp);
        }
    };
    (0, react_1.useEffect)(() => {
        getNSetLobbyPlayerName(userData.lobbyId);
        return () => { };
    }, []);
    return ((0, jsx_runtime_1.jsxs)(react_2.Flex, { w: "100vw", h: "100vh", 
        //       zIndex="99999"
        justifyContent: "space-between", alignItems: "", position: "fixed", flexDir: "column", p: 10, children: [(0, jsx_runtime_1.jsxs)(react_2.Flex, { w: "100%", justifyContent: "space-between", children: [(0, jsx_runtime_1.jsx)(PlayerTokenAndMoney, { tokenId: 0, money: playerMoney[0], username: "bearbb", currentPlayer: currentPlayer }, void 0), playerName[1] !== undefined && ((0, jsx_runtime_1.jsx)(PlayerTokenAndMoney, { tokenId: 1, money: playerMoney[1], username: playerName[1], currentPlayer: currentPlayer }, void 0))] }, void 0), (0, jsx_runtime_1.jsxs)(react_2.Flex, { w: "100%", justifyContent: "space-between", children: [playerName[2] !== undefined && ((0, jsx_runtime_1.jsx)(PlayerTokenAndMoney, { tokenId: 3, money: playerMoney[2], username: playerName[2], currentPlayer: currentPlayer }, void 0)), playerName[3] !== undefined && ((0, jsx_runtime_1.jsx)(PlayerTokenAndMoney, { tokenId: 3, money: playerMoney[3], username: playerName[3], currentPlayer: currentPlayer }, void 0))] }, void 0)] }, void 0));
};
exports.PlayerMoney = PlayerMoney;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lobby = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = require("@chakra-ui/react");
const icons_1 = require("@chakra-ui/icons");
//contexts
const UserContext_1 = require("src/contexts/UserContext");
//player token
const _0_png_1 = __importDefault(require("src/assets/PlayerToken/0.png"));
const _1_png_1 = __importDefault(require("src/assets/PlayerToken/1.png"));
const _2_png_1 = __importDefault(require("src/assets/PlayerToken/2.png"));
const _3_png_1 = __importDefault(require("src/assets/PlayerToken/3.png"));
//lobby
const utilities_1 = require("src/utils/utilities");
const react_router_1 = require("react-router");
const Body = (props) => ((0, jsx_runtime_1.jsx)(react_2.Flex, { ...props, flexDirection: "column", w: "100vw", h: "100vh", justifyContent: "center", alignItems: "center", p: 15 }, void 0));
const Lobby = () => {
    const [playersData, setPlayersData] = (0, react_1.useState)([]);
    const [isError, setIsError] = (0, react_1.useState)(false);
    const { userData, setUserData } = (0, UserContext_1.useUserContext)();
    const [isAllReady, setIsAllReady] = (0, react_1.useState)(false);
    const navigate = (0, react_router_1.useNavigate)();
    const toast = (0, react_2.useToast)();
    (0, react_1.useEffect)(() => {
        // console.log(
        //   `%c${userData}`,
        //   "background: #292d3e; color: #f07178; font-weight: bold"
        // );
        return () => { };
    }, []);
    const getLobbyData = async () => {
        try {
            const { players } = await utilities_1.lobbyClient.getMatch("default", userData.lobbyId);
            let temp = players.map((p) => ({
                id: p.id,
                name: p.name,
            }));
            setPlayersData(temp);
        }
        catch (error) {
            setIsError(true);
        }
    };
    (0, react_1.useEffect)(() => {
        // console.log(playersData);
        return () => { };
    }, [playersData]);
    //function on click the button: 2 way
    //call getLobbyData if isAllReady = false
    //navigate to game else
    const twiceHandler = () => {
        if (!isAllReady) {
            getLobbyData();
        }
        else {
            // TODO: navigate to game
            navigateToGame();
        }
    };
    //init function
    (0, react_1.useEffect)(() => {
        // console.log(userData.lobbyId);
        getLobbyData();
        return () => { };
    }, []);
    //check is ready status
    (0, react_1.useEffect)(() => {
        //check if all slot have join
        //by check all object have name !== undefined
        let isReady = playersData.every((player) => player.name !== undefined);
        setIsAllReady(isReady);
        return () => { };
    }, [playersData]);
    const navigateToGame = () => {
        //check if all userData meet requirements
        let allMeet = true;
        let key;
        for (key in userData) {
            if (userData[key] === "") {
                allMeet = false;
            }
        }
        if (allMeet) {
            navigate("/game");
        }
    };
    return ((0, jsx_runtime_1.jsxs)(Body, { id: "Lobby", minH: 835, children: [(0, jsx_runtime_1.jsx)(react_2.Heading, { as: "h1", m: "50", size: "2xl", children: "lobby" }, void 0), (0, jsx_runtime_1.jsxs)(react_2.Flex, { id: "LobbyContent", flexDirection: "column", w: "100%", h: "100%", 
                // justifyContent="space-between"
                gap: 15, p: "50px 200px 100px 200px", children: [(0, jsx_runtime_1.jsxs)(react_2.Flex, { children: [(0, jsx_runtime_1.jsx)(react_2.Text, { fontSize: "2xl", 
                                // mb={25}
                                color: "purple.500", fontWeight: "bold", children: "lobby id:" }, void 0), (0, jsx_runtime_1.jsx)(react_2.Text, { fontSize: "2xl", ml: 5, fontWeight: "bold", borderWidth: 1, rounded: 3, borderColor: "purple.400", p: "0 7px 0 7px", color: "purple.700", children: userData.lobbyId }, void 0), (0, jsx_runtime_1.jsx)(react_2.Center, { h: "100%", ml: 4, children: (0, jsx_runtime_1.jsx)(icons_1.CopyIcon, { fontWeight: "extrabold", color: "purple.500", boxSize: 7, cursor: "pointer", _hover: { color: "purple.700" }, onClick: () => {
                                        navigator.clipboard.writeText(userData.lobbyId);
                                        toast({
                                            description: "lobby id copied",
                                            status: "success",
                                            isClosable: true,
                                            duration: 4000,
                                        });
                                    } }, void 0) }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(react_2.Flex, { w: "100%", justifyContent: "space-between", h: "60%", children: renderPlayerNToken(playersData) }, void 0), (0, jsx_runtime_1.jsx)(react_2.Flex, { w: "100%", justifyContent: "center", children: (0, jsx_runtime_1.jsx)(react_2.Button, { w: "fit-content", 
                            // p="3px 5px 3px 5px"
                            textAlign: "center", colorScheme: "purple", size: "lg", onClick: () => twiceHandler(), children: isAllReady ? "Play" : "Check if all ready" }, void 0) }, void 0)] }, void 0)] }, void 0));
};
exports.Lobby = Lobby;
const PlayerNToken = ({ ...props }) => {
    return ((0, jsx_runtime_1.jsxs)(react_2.Flex, { flexDirection: "column", gap: 4, children: [(0, jsx_runtime_1.jsx)(react_2.Text, { color: "orange.300", fontWeight: "bold", fontSize: "2xl", children: props.name === undefined ? "waiting..." : props.name }, void 0), (0, jsx_runtime_1.jsx)(TokenCover, { tokenId: props.tokenId }, void 0), props.isReady ? (0, jsx_runtime_1.jsx)(ReadyBadge, {}, void 0) : (0, jsx_runtime_1.jsx)(NotReadyBadge, {}, void 0)] }, void 0));
};
const renderPlayerNToken = (player) => {
    let render = player.map((p) => {
        return ((0, jsx_runtime_1.jsx)(PlayerNToken, { tokenId: p.id, name: p.name, isReady: p.name === undefined ? false : true, avatar: null }, p.id));
    });
    return render;
};
const AvatarCover = (props) => ((0, jsx_runtime_1.jsx)(react_2.Box, { ...props, w: 100, h: 100, borderWidth: 2, borderColor: "black" }, void 0));
const TokenCover = ({ tokenId }) => ((0, jsx_runtime_1.jsx)(react_2.Box
// {...props}
, { 
    // {...props}
    width: 200, height: 200, borderWidth: 2, borderColor: "black", children: (0, jsx_runtime_1.jsx)(react_2.Flex, { w: "100%", h: "100%", justifyContent: "center", alignItems: "center", children: (0, jsx_runtime_1.jsx)(react_2.Image, { w: "70%", src: tokenSwitcher(tokenId) }, void 0) }, void 0) }, void 0));
const tokenSwitcher = (tokenId) => {
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
const ReadyBadge = () => ((0, jsx_runtime_1.jsx)(react_2.Badge, { variant: "solid", colorScheme: "green", textAlign: "center", children: "Ready" }, void 0));
const NotReadyBadge = () => ((0, jsx_runtime_1.jsx)(react_2.Badge, { variant: "outline", colorScheme: "green", textAlign: "center", children: "Not ready" }, void 0));

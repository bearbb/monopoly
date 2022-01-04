"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
//router
const react_router_dom_1 = require("react-router-dom");
//contexts
const UserContext_1 = require("src/contexts/UserContext");
//boardgame
const utilities_1 = require("src/utils/utilities");
const ButtonStyle = {
    w: "15%",
    size: "3xl",
    fontSize: "2xl",
    fontWeight: "extrabold",
    p: 15,
};
const createLobby = async () => {
    // const data = await axios.post(`${urlData.serverURI}/games/default/create`);
    //TODO: create handler when create get error
    const { matchID } = await utilities_1.lobbyClient.createMatch("default", {
        numPlayers: 1,
    });
    return matchID;
};
const Menu = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { userData, setUserData } = (0, UserContext_1.useUserContext)();
    const createLobbyHandler = async () => {
        navigate("/create-lobby");
        // }
    };
    return ((0, jsx_runtime_1.jsxs)(react_1.Flex, { id: "Menu", flexDirection: "column", width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(react_1.Heading, { as: "h1", size: "xl", mb: "10vh", children: "*some aesthetic background*" }, void 0), (0, jsx_runtime_1.jsxs)(react_1.Flex, { justifyContent: "space-around", w: "80%", children: [(0, jsx_runtime_1.jsx)(react_1.Button, { ...ButtonStyle, colorScheme: "purple", onClick: () => {
                            createLobbyHandler();
                        }, children: "create lobby" }, void 0), (0, jsx_runtime_1.jsx)(react_1.Button, { ...ButtonStyle, colorScheme: "orange", onClick: () => {
                            navigate("/join-lobby");
                        }, children: "join lobby" }, void 0)] }, void 0)] }, void 0));
};
exports.Menu = Menu;

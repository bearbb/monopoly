"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Client_1 = require("src/Client");
require("./App.css");
const react_2 = require("@chakra-ui/react");
//Components
const CreatePlayer_1 = require("src/components/CreatePlayer");
const Menu_1 = require("src/components/Menu");
const CreateLobby_1 = require("src/components/CreateLobby");
const JoinLobby_1 = require("src/components/JoinLobby");
const Lobby_1 = require("src/components/Lobby");
//Route
const react_router_dom_1 = require("react-router-dom");
//User context
const UserContext_1 = require("src/contexts/UserContext");
const theme = (0, react_2.extendTheme)({
    fonts: {
        // body: "Indie Flower",
        // heading: "Indie Flower",
        // body: "Amatic SC",
        // heading: "Amatic SC",
        body: "Varela Round",
        heading: "Varela Round",
    },
});
const getInitUserData = () => {
    let username = localStorage.getItem("username");
    let lobbyId = localStorage.getItem("lobbyId");
    let credentials = localStorage.getItem("credentials");
    let playerId = localStorage.getItem("playerId");
    let userData = {
        username: "",
        lobbyId: "",
        credentials: "",
        playerId: "",
    };
    if (username !== null) {
        userData.username = username;
    }
    if (lobbyId !== null) {
        userData.lobbyId = lobbyId;
    }
    if (credentials !== null) {
        userData.credentials = credentials;
    }
    if (playerId !== null) {
        userData.playerId = playerId;
    }
    return userData;
};
const App = () => {
    const [userData, setUserData] = (0, react_1.useState)({
        username: getInitUserData().username,
        lobbyId: getInitUserData().lobbyId,
        credentials: getInitUserData().credentials,
        playerId: getInitUserData().playerId,
    });
    (0, react_1.useEffect)(() => {
        return () => { };
    }, []);
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        // console.log(userData);
        return () => { };
    }, [userData]);
    (0, react_1.useEffect)(() => {
        if (userData.username === "") {
            navigate("/create-player");
        }
        else {
            if (userData.lobbyId === "") {
                navigate("/");
            }
        }
        return () => { };
    }, []);
    return ((0, jsx_runtime_1.jsx)(react_2.ChakraProvider, { theme: theme, children: (0, jsx_runtime_1.jsx)(UserContext_1.UserContext.Provider, { value: { userData, setUserData }, children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "create-player", element: (0, jsx_runtime_1.jsx)(CreatePlayer_1.CreatePlayer, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(Menu_1.Menu, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "create-lobby", element: (0, jsx_runtime_1.jsx)(CreateLobby_1.CreateLobby, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "join-lobby", element: (0, jsx_runtime_1.jsx)(JoinLobby_1.JoinLobby, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "lobby", element: (0, jsx_runtime_1.jsx)(Lobby_1.Lobby, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "game", element: (0, jsx_runtime_1.jsx)(Client_1.Client, { matchID: `${userData.lobbyId}`, playerID: userData.playerId, credentials: userData.credentials }, void 0) }, void 0)] }, void 0) }, void 0) }, void 0));
};
exports.App = App;
exports.default = exports.App;

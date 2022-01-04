"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinLobby = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = require("@chakra-ui/react");
//router
const react_router_dom_1 = require("react-router-dom");
//lobby instance
const utilities_1 = require("src/utils/utilities");
//context
const UserContext_1 = require("src/contexts/UserContext");
const inputStyle = {
    variant: "filled",
    mb: 3,
    borderWidth: 3,
    focusBorderColor: "blackAlpha.500",
    size: "lg",
    w: "50%",
};
const boldLabel = {
    fontWeight: 400,
    fontSize: "3xl",
};
const Label = (props) => ((0, jsx_runtime_1.jsx)(react_2.FormLabel, { ...props, ...boldLabel }, void 0));
const JoinLobby = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [lobbyId, setLobbyId] = (0, react_1.useState)("");
    const [alert, setAlert] = (0, react_1.useState)("");
    const [toggleLobbyButton, setToggleLobbyButton] = (0, react_1.useState)(false);
    const { userData, setUserData } = (0, UserContext_1.useUserContext)();
    // const [password, setPassword] = useState<String>("");
    const joinLobbyHandler = async () => {
        //check if lobbyId is empty
        if (lobbyId === "") {
            setAlert("please enter the lobby id");
        }
        else {
            //get player list first
            try {
                const { matchID, players, setupData } = await utilities_1.lobbyClient.getMatch("default", lobbyId);
                console.log(matchID, players);
                let playerIndexAvail = -1;
                //check players arr if any slot left
                for (let i = 0; i < players.length; i++) {
                    const element = players[i];
                    if (element.name === undefined) {
                        playerIndexAvail = i;
                        break;
                    }
                }
                //check if already joined
                let isJoined = false;
                for (let i = 0; i < players.length; i++) {
                    const element = players[i];
                    if (element.name === userData.username) {
                        isJoined = true;
                    }
                }
                if (playerIndexAvail === -1) {
                    setAlert("lobby is full");
                }
                else if (isJoined) {
                    setToggleLobbyButton(true);
                    setAlert("u r already joined");
                }
                else {
                    //join lobby with that id and username
                    const { playerCredentials } = await utilities_1.lobbyClient.joinMatch("default", lobbyId, {
                        playerID: playerIndexAvail.toString(),
                        playerName: userData.username,
                    });
                    let temp = {
                        ...userData,
                        lobbyId: lobbyId,
                        credentials: playerCredentials,
                        playerId: playerIndexAvail.toString(),
                    };
                    setUserData(temp);
                    localStorage.setItem("playerId", playerIndexAvail.toString());
                    localStorage.setItem("lobbyId", lobbyId);
                    localStorage.setItem("credentials", playerCredentials);
                    navigate("/lobby");
                }
            }
            catch (error) {
                setAlert("lobby id not found");
            }
        }
    };
    return ((0, jsx_runtime_1.jsxs)(react_2.Flex, { id: "CreateLobby", alignItems: "center", justifyContent: "center", height: "100vh", minW: 870, flexDirection: "column", children: [(0, jsx_runtime_1.jsx)(react_2.Heading, { as: "h1", m: "50", size: "2xl", children: "join lobby" }, void 0), (0, jsx_runtime_1.jsxs)(react_2.Flex, { flexDirection: "row", justifyContent: "space-between", w: "80vw", ml: "10vw", mr: "10vw", mb: "10vh", p: "20", gap: 50, flex: "100%", children: [(0, jsx_runtime_1.jsx)(react_2.Flex, { flexDirection: "column", flexGrow: "1;0", 
                        //   p={15}
                        alignItems: "center", justifyContent: "center", children: (0, jsx_runtime_1.jsxs)(react_2.Flex, { alignItems: "flex-start", flexDirection: "column", children: [(0, jsx_runtime_1.jsx)(react_2.FormLabel, { fontWeight: "extrabold", fontSize: "4xl", htmlFor: "avatarSelector", children: "avatar" }, void 0), (0, jsx_runtime_1.jsx)(react_2.Box, { id: "avatarSelector", w: "15vw", minW: "220px", minH: "220px", h: "15vw", borderWidth: 3, borderColor: "blackAlpha.200", cursor: "pointer" }, void 0)] }, void 0) }, void 0), (0, jsx_runtime_1.jsxs)(react_2.Flex, { flexDirection: "column", flexGrow: 1.5, w: "", justifyContent: "center", children: [(0, jsx_runtime_1.jsx)(Label, { htmlFor: "lobbyIdInput", ...boldLabel, children: "lobby id" }, void 0), (0, jsx_runtime_1.jsx)(react_2.Input, { id: "lobbyIdInput", placeholder: "input ur lobby id", ...inputStyle, onChange: (e) => {
                                    setLobbyId(e.target.value);
                                } }, void 0), (0, jsx_runtime_1.jsx)(react_2.Text, { color: "red.400", fontWeight: "bold", children: alert }, void 0), (0, jsx_runtime_1.jsxs)(react_2.Flex, { gap: 10, children: [(0, jsx_runtime_1.jsx)(react_2.Button, { size: "lg", colorScheme: "orange", w: "fit-content", mt: 10, onClick: () => joinLobbyHandler(), children: "join" }, void 0), toggleLobbyButton ? ((0, jsx_runtime_1.jsx)(react_2.Button, { size: "lg", colorScheme: "purple", w: "fit-content", mt: 10, onClick: () => navigate("/lobby"), children: "back to lobby" }, void 0)) : null] }, void 0)] }, void 0)] }, void 0)] }, void 0));
};
exports.JoinLobby = JoinLobby;

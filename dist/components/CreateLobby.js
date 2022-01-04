"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLobby = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = require("@chakra-ui/react");
const Board_1 = require("src/Board");
const utilities_1 = require("src/utils/utilities");
const UserContext_1 = require("src/contexts/UserContext");
const react_router_1 = require("react-router");
const NumOfPlayerInput = ({ setNumOfPlayer, }) => {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = (0, react_2.useNumberInput)({
        step: 1,
        defaultValue: 2,
        min: 1,
        max: 4,
        precision: 0,
        onChange: (value) => {
            setNumOfPlayer(parseInt(value));
        },
    });
    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();
    return ((0, jsx_runtime_1.jsxs)(react_2.HStack, { maxW: "150", children: [(0, jsx_runtime_1.jsx)(react_2.Button, { ...dec, colorScheme: "purple", children: "-" }, void 0), (0, jsx_runtime_1.jsx)(react_2.Input, { ...input, fontWeight: "extrabold" }, void 0), (0, jsx_runtime_1.jsx)(react_2.Button, { ...inc, colorScheme: "red", children: "+" }, void 0)] }, void 0));
};
const createLobby = async (numPlayers) => {
    //TODO: create handler when create get error
    try {
        const { matchID } = await utilities_1.lobbyClient.createMatch("default", {
            numPlayers: numPlayers,
        });
        return { matchId: matchID };
    }
    catch (error) {
        return { error: "Something went wrong try again" };
    }
};
const CreateLobby = () => {
    const [isCheckedState, setIsCheckedState] = (0, react_1.useState)(false);
    const [displayAtt, setDisplayAtt] = (0, react_1.useState)("none");
    const { userData, setUserData } = (0, UserContext_1.useUserContext)();
    const [numOfPlayer, setNumOfPlayer] = (0, react_1.useState)(2);
    const [error, setError] = (0, react_1.useState)("");
    const navigate = (0, react_router_1.useNavigate)();
    const createLobbyHandler = async () => {
        const createLobbyRes = await createLobby(numOfPlayer);
        if (!createLobbyRes.error && createLobbyRes.matchId) {
            let temp = userData;
            temp.lobbyId = createLobbyRes.matchId;
            setUserData({ ...temp });
            localStorage.setItem("lobbyId", createLobbyRes.matchId);
            try {
                const { playerCredentials } = await utilities_1.lobbyClient.joinMatch("default", createLobbyRes.matchId, { playerID: "0", playerName: userData.username });
                temp.credentials = playerCredentials;
                setUserData({ ...temp });
                localStorage.setItem("credentials", playerCredentials);
                localStorage.setItem("playerId", "0");
                setError("");
                //navigate to lobby
                navigate("/lobby");
            }
            catch (error) {
                setError("some thing went wrong with joining the lobby, pls try again");
            }
        }
        else {
            setError("some thing went wrong with create new lobby, pls try again");
        }
    };
    (0, react_1.useEffect)(() => {
        if (isCheckedState) {
            setDisplayAtt("block");
        }
        else {
            setDisplayAtt("none");
        }
        return () => { };
    }, [isCheckedState]);
    return ((0, jsx_runtime_1.jsxs)(react_2.Flex, { id: "CreateLobby", alignItems: "center", justifyContent: "center", height: "100vh", minW: 870, flexDirection: "column", children: [(0, jsx_runtime_1.jsx)(react_2.Heading, { as: "h1", m: "50", size: "2xl", children: "create lobby" }, void 0), (0, jsx_runtime_1.jsxs)(react_2.Flex, { flexDirection: "row", justifyContent: "space-between", w: "80vw", ml: "10vw", mr: "10vw", mb: "10vh", p: "20", gap: 50, flex: "100%", children: [(0, jsx_runtime_1.jsx)(react_2.Flex, { flexDirection: "column", flexGrow: "1;0", 
                        //   p={15}
                        alignItems: "center", justifyContent: "center", children: (0, jsx_runtime_1.jsxs)(react_2.Flex, { alignItems: "flex-start", flexDirection: "column", children: [(0, jsx_runtime_1.jsx)(react_2.FormLabel, { fontWeight: "extrabold", fontSize: "4xl", htmlFor: "avatarSelector", children: "avatar" }, void 0), (0, jsx_runtime_1.jsx)(react_2.Box, { id: "avatarSelector", w: "15vw", minW: "220px", minH: "220px", h: "15vw", borderWidth: 3, borderColor: "blackAlpha.200", cursor: "pointer", children: (0, jsx_runtime_1.jsx)(Board_1.CenteredFlex, { children: (0, jsx_runtime_1.jsx)(react_2.Text, { children: "*coming soon*" }, void 0) }, void 0) }, void 0)] }, void 0) }, void 0), (0, jsx_runtime_1.jsxs)(react_2.Flex, { flexDirection: "column", flexGrow: 1.5, w: "", justifyContent: "center", children: [(0, jsx_runtime_1.jsx)(NumOfPlayerInput, { setNumOfPlayer: setNumOfPlayer }, void 0), (0, jsx_runtime_1.jsx)(react_2.Button, { size: "lg", colorScheme: "orange", w: "150px", mt: 5, onClick: () => {
                                    createLobbyHandler();
                                }, children: "create" }, void 0)] }, void 0)] }, void 0)] }, void 0));
};
exports.CreateLobby = CreateLobby;

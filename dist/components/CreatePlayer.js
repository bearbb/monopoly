"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlayer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = require("@chakra-ui/react");
//Context
const UserContext_1 = require("src/contexts/UserContext");
//Router
const react_router_dom_1 = require("react-router-dom");
const CreatePlayer = () => {
    const { userData, setUserData } = (0, UserContext_1.useUserContext)();
    const [username, setUsername] = (0, react_1.useState)("");
    const [alert, setAlert] = (0, react_1.useState)("");
    //navigator
    const navigate = (0, react_router_dom_1.useNavigate)();
    const usernameHandler = (e) => {
        setUsername(e.target.value);
    };
    (0, react_1.useEffect)(() => {
        // console.log(username);
        return () => { };
    }, [username]);
    //on click create
    const createPlayerHandler = () => {
        //check if username is empty
        if (username === "") {
            setAlert("please enter ur username");
        }
        else {
            // setUserData((state : ) => ({ lobbyId: "", username: username }));
            const updatedData = { ...userData, username };
            setUserData(updatedData);
            localStorage.setItem("username", username);
            //navigate to menu page
            navigate("/");
        }
    };
    return ((0, jsx_runtime_1.jsxs)(react_2.Flex, { id: "CreatePlayer", alignItems: "center", justifyContent: "center", height: "100vh", minW: 870, flexDirection: "column", padding: 30, children: [(0, jsx_runtime_1.jsx)(react_2.Heading, { as: "h1", mb: 50, size: "2xl", children: "create player" }, void 0), (0, jsx_runtime_1.jsxs)(react_2.Flex, { flexDirection: "row", justifyContent: "space-between", w: "80vw", ml: "10vw", mr: "10vw", mb: "10vh", p: "20", gap: 50, flex: "100%", children: [(0, jsx_runtime_1.jsx)(react_2.Flex, { flexDirection: "column", flexGrow: "1;0", 
                        //   p={15}
                        alignItems: "center", justifyContent: "center", children: (0, jsx_runtime_1.jsxs)(react_2.Flex, { alignItems: "flex-start", flexDirection: "column", children: [(0, jsx_runtime_1.jsx)(react_2.FormLabel, { fontWeight: "bold", fontSize: "3xl", htmlFor: "avatarSelector", children: "avatar" }, void 0), (0, jsx_runtime_1.jsx)(react_2.Box, { id: "avatarSelector", w: "15vw", minW: "220px", minH: "220px", h: "15vw", borderWidth: 3, borderColor: "blackAlpha.200", cursor: "pointer" }, void 0)] }, void 0) }, void 0), (0, jsx_runtime_1.jsxs)(react_2.Flex, { flexDirection: "column", flexGrow: 1.5, w: "", justifyContent: "center", children: [(0, jsx_runtime_1.jsx)(react_2.FormLabel, { htmlFor: "usernameInput", fontWeight: "bold", fontSize: "3xl", children: "username" }, void 0), (0, jsx_runtime_1.jsx)(react_2.Input, { id: "usernameInput", placeholder: "input ur username", variant: "filled", mb: 3, borderWidth: 3, focusBorderColor: "blackAlpha.500", size: "lg", w: "50%", onChange: (e) => {
                                    usernameHandler(e);
                                } }, void 0), (0, jsx_runtime_1.jsx)(react_2.Button, { size: "lg", colorScheme: "orange", w: "fit-content", onClick: () => {
                                    createPlayerHandler();
                                }, children: "create" }, void 0)] }, void 0)] }, void 0)] }, void 0));
};
exports.CreatePlayer = CreatePlayer;

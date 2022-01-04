"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserContext = exports.UserContext = void 0;
const react_1 = require("react");
exports.UserContext = (0, react_1.createContext)({
    userData: {
        username: "",
        lobbyId: "",
        credentials: "",
        playerId: "",
    },
    setUserData: () => { },
});
const useUserContext = () => (0, react_1.useContext)(exports.UserContext);
exports.useUserContext = useUserContext;

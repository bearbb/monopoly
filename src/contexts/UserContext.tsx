import { createContext, useContext } from "react";

export interface UserContextData {
  userData: {
    username: string;
    lobbyId: string;
    credentials: string;
  };
  setUserData: (data: UserContextData["userData"]) => void;
}

export const UserContext = createContext<UserContextData>({
  userData: {
    username: "",
    lobbyId: "",
    credentials: "",
  },
  setUserData: () => {},
});

export const useUserContext = () => useContext(UserContext);

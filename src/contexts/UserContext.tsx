import { createContext, useContext } from "react";

export interface UserContextData {
  userData: {
    username: string;
    lobbyId: string;
  };
  setUserData: (data: UserContextData["userData"]) => void;
}

export const UserContext = createContext<UserContextData>({
  userData: {
    username: "",
    lobbyId: "",
  },
  setUserData: () => {},
});

export const useUserContext = () => useContext(UserContext);

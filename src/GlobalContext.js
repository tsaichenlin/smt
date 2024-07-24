import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalPlayers, setGlobalPlayers] = useState({
    Pitcher: { name: "...", id: "" },
    Catcher: { name: "...", id: "" },
    First: { name: "...", id: "" },
    Second: { name: "...", id: "" },
    Third: { name: "...", id: "" },
    Shortstop: { name: "...", id: "" },
    Left: { name: "...", id: "" },
    Center: { name: "...", id: "" },
    Right: { name: "...", id: "" },
  });

  return (
    <GlobalContext.Provider value={{ globalPlayers, setGlobalPlayers }}>
      {children}
    </GlobalContext.Provider>
  );
};

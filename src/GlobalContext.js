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
  const [svgController, setSvgController] = useState({
    pitcher: false,
    catcher: false,
    first: false,
    second: false,
    thrid: false,
    shortstop: false,
    left: false,
    right: false,
    center: false,
  });
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [isShowing, setIsShowing] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editPlayerMode, setEditPlayerMode] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        globalPlayers,
        setGlobalPlayers,
        svgController,
        setSvgController,
        selectedPlayer,
        setSelectedPlayer,
        isShowing,
        setIsShowing,
        editMode,
        setEditMode,
        editPlayerMode,
        setEditPlayerMode,
        isPopup,
        setIsPopup,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

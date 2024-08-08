import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  //Lineup
  const [globalPlayers, setGlobalPlayers] = useState({
    Pitcher: { name: "...", id: "1" },
    Catcher: { name: "...", id: "2" },
    First: { name: "...", id: "3" },
    Second: { name: "...", id: "4" },
    Third: { name: "...", id: "5" },
    Shortstop: { name: "...", id: "6" },
    Left: { name: "...", id: "7" },
    Center: { name: "...", id: "8" },
    Right: { name: "...", id: "9" },
  });

  //Navigation Helpers
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [isShowing, setIsShowing] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editPlayerMode, setEditPlayerMode] = useState(false);
  const [isPopup, setIsPopup] = useState(false);

  //Model
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [data, setData] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        globalPlayers,
        setGlobalPlayers,
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
        loading,
        setLoading,
        response,
        setResponse,
        data,
        setData,
        isSimulating,
        setIsSimulating,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

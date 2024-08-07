import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  //Lineup
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
  const [startSim, setStartSim] = useState(false);
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
        startSim,
        setStartSim,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

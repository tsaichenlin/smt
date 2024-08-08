import { useEffect, useState, useContext } from "react";
import Papa from "papaparse";
import { GlobalContext } from "../GlobalContext";

export const useRVv = (playerPosition) => {
  const { globalPlayers } = useContext(GlobalContext);
  const [data, setData] = useState([]);
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);
  const { isSimulating, setIsSimulating } = useContext(GlobalContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/database/player_database_all.csv");
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result.value);
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            setData(results.data);
            setError(null);
          },
          error: (err) => {
            console.error("Error parsing CSV:", err);
            setError(err);
          },
        });
      } catch (err) {
        console.error("Error fetching CSV:", err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const positionDefaults = {
      Pitcher: 1,
      Catcher: 2,
      First: 3,
      Second: 4,
      Third: 5,
      Shortstop: 6,
      Left: 7,
      Center: 8,
      Right: 9,
    };
    console.log("getting data");
    if (data.length > 0) {
      if (globalPlayers[playerPosition].id == "") {
        console.log("default");
        var playerId = positionDefaults[playerPosition];
      } else {
        var playerId = globalPlayers[playerPosition].id;
        console.log("not deafult");
      }
      const playerRow = data.find((row) => row.player_id == playerId);
      if (playerRow) {
        setPlayerData(playerRow);
      } else {
        setPlayerData(null);
      }
    } else {
      setPlayerData(null);
    }
  }, [globalPlayers]);

  return { playerData, error };
};

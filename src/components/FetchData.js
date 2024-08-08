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
    console.log("getting data");
    if (data.length > 0 && globalPlayers[playerPosition]?.id) {
      const playerId = globalPlayers[playerPosition].id;
      const playerRow = data.find((row) => row.player_id == playerId);
      console.log(playerId);
      console.log(playerRow);
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

import React, { useEffect, useState, useCallback, useRef } from "react";
import Papa from "papaparse";

const MAX_CONCURRENT_WORKERS = 2;
const total_plays = 10; //3890
var lineups_results = [0, 0, 0, 0, 0, 0, 0, 0, 0];

const ModelLoader = () => {
  const [baseRV, setBaseRV] = useState(0);
  const [error, setError] = useState(null);
  const [battedBallInput, setBattedBallInput] = useState([]);
  const [situationInput, setSituationInput] = useState([]);
  const [positionInput, setPositionInput] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playerData, setPlayerData] = useState({});

  const runValueReturned = useRef(false);
  const runValueRef = useRef(null);

  const [runValue, setRunValue] = useState(null);
  const [players, setPlayers] = useState([]);
  const [expectedRVAtPos, setExpectedRVAtPos] = useState(Array(9).fill(0));
  const [expectedRVAtPrimaryPos, setExpectedRVAtPrimaryPos] = useState(Array(9).fill(0));
  const [PrimaryPos, setPrimaryPos] = useState(Array(9).fill(''));

  const [bestPlayers, setBestPlayers] = useState([]);
  const [worstPlayers, setWorstPlayers] = useState([]);

  const workers = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      const [battedBallData, situationData, positionData, playerCSV] = await Promise.all([
        fetch("./Database/batted_ball_Input.json").then((response) =>
          response.json()
        ),
        fetch("./Database/situation_Input.json").then((response) =>
          response.json()
        ),
        fetch("./Database/position_Input.json").then((response) =>
          response.json()
        ),
        fetch("./Database/player_database_all_pos.csv").then((response) =>
          response.text()
        ),
      ]);

      setBattedBallInput(battedBallData.slice(0, total_plays));
      setSituationInput(situationData.slice(0, total_plays));
      setPositionInput([1, 2, 3, 4, 5, 6, 7, 8, 9]);

      // Parse CSV data
      const parsedCSV = Papa.parse(playerCSV, { header: true });
      const playerData = parsedCSV.data.reduce((acc, player) => {
        acc[player.player_id] = player;
        return acc;
      }, {});

      // Initialize and preload workers
      for (let i = 0; i < MAX_CONCURRENT_WORKERS; i++) {
        const worker = new Worker(new URL("./worker.js", import.meta.url)); // Update path to worker script
        worker.postMessage({ preload: true });
        worker.onmessage = () => {
          console.log(`Worker ${i} preloaded`);
        };
        workers.current.push(worker);
      }

      const workerInstance = new Worker(new URL("./worker.js", import.meta.url)); // Update path to worker script
      workerInstance.onmessage = (e) => {
        setBaseRV(e.data.result);
        workerInstance.terminate();
      };
      workerInstance.onerror = (err) => {
        console.error("Error in worker:", err);
        setError(err);
        workerInstance.terminate();
      };
      workerInstance.postMessage({
        battedBallInput: battedBallData.slice(0, total_plays),
        situationInput: situationData.slice(0, total_plays),
        positionInput: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        lineup: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      });

      setError(null);
      setPlayerData(playerData); // Update playerData state
      console.log("Data fetched");
    };

    fetchData();
    return () => {
      workers.current.forEach((worker) => worker.terminate());
    };
  }, []);

  useEffect(() => {}, [expectedRVAtPos]);
  let workersReturned = 0;

  const processBatch = useCallback(
    async (batch) => {
      const workerPromises = batch.map(
        (lineup, index) =>
          new Promise((resolve, reject) => {
            const workerInstance =
              workers.current[index % MAX_CONCURRENT_WORKERS];

            const handleMessage = (e) => {
              const place = lineup[9];
              const result = baseRV - e.data.result;

              if (place === 0) {
                runValueReturned.current = true;
                runValueRef.current = result;
                setRunValue(result);

                setExpectedRVAtPos((prevResults) => {
                  const updatedResults = prevResults.map((val, idx) =>
                    val !== 0 ? result - val : val
                  );
                  return updatedResults;
                });
              } else {
                setExpectedRVAtPos((prevResults) => {
                  const updatedResults = [...prevResults];
                  if (runValueReturned.current) {
                    updatedResults[place - 1] = runValueRef.current - result;
                    lineups_results[place - 1] = runValueRef.current - result;
                  } else {
                    updatedResults[place - 1] = result;
                  }
                  expectedRVAtPos.current = updatedResults;
                  return updatedResults;
                });
              }
              resolve();
              workersReturned++;
            };

            const handleError = (err) => {
              console.error("Error in worker:", err);
              setError(err);
              reject(err);
            };

            workerInstance.onmessage = handleMessage;
            workerInstance.onerror = handleError;

            const cutLineup = lineup.slice(0, 9);
            workerInstance.postMessage({
              battedBallInput,
              situationInput,
              positionInput,
              lineup: cutLineup,
            });
          })
      );

      await Promise.all(workerPromises);

      if (workersReturned == 10) {
        console.log("Before the best worst eval", expectedRVAtPos.current);
        let top = [0];
        let bottom = [0];

        for (let i = 1; i < 9 && i < workersReturned; i++) {
          for (let a = 0; a < 3; a++) {
            if (
              expectedRVAtPos.current[top[a]] < expectedRVAtPos.current[i]
            ) {
              let next = i;
              for (let b = a; b < 3; b++) {
                const temp = top[b];
                top[b] = next;
                next = temp;
              }
              break;
            }
          }
          if (top.length < 3 && top.length < i) {
            top.push(i);
          }
          for (let a = 0; a < 3; a++) {
            if (
              expectedRVAtPos.current[bottom[a]] >
              expectedRVAtPos.current[i]
            ) {
              let next = i;
              for (let b = a; b < 3; b++) {
                const temp = bottom[b];
                bottom[b] = next;
                next = temp;
              }
              break;
            }
          }
          if (bottom.length < 3 && bottom.length < i) {
            bottom.push(i);
          }
        }

        console.log("Top Players:", top);
        console.log("Bottom Players:", bottom);
        setBestPlayers(top);
        setWorstPlayers(bottom);
        console.log(workersReturned);
      }
    },
    [battedBallInput, situationInput, positionInput, baseRV]
  );

  const makePrediction = useCallback(
    async (lineup) => {
      runValueReturned.current = false;
      runValueRef.current = null;
      setLoading(true);
      setResults([]); 
      setPlayers(lineup);
      setExpectedRVAtPos(Array(9).fill(0)); 


        const modLineup = [...lineup, 0];
        const lineups = [modLineup];
        for (let i = 0; i < 9; i++) {
          const newLineup = [...lineup];
          newLineup[i] = i + 1;
          newLineup.push(i + 1);
          lineups.push(newLineup);
        }

        for (let i = 0; i < lineups.length; i += MAX_CONCURRENT_WORKERS) {
          const batch = lineups.slice(i, i + MAX_CONCURRENT_WORKERS);
          await processBatch(batch);
        }

        // Update PrimaryPos and expectedRVAtPrimaryPos based on playerData
        const primaryPositions = lineup.map((playerId) => {
          const player = playerData[playerId];
          if (player) {
            return player.primary_position;
          }
          return '';
        });

        const primaryValues = lineup.map((playerId) => {
          const player = playerData[playerId];
          if (player) {
            const position = player.primary_position;
            return parseFloat(player[`${position}_value`]);
          }
          return 0;
        });

        setPrimaryPos(primaryPositions);
        setExpectedRVAtPrimaryPos(primaryValues);
        setLoading(false);


    },
    [processBatch, playerData]
  );

  const handlePredictionClick = () => {
    if (!loading) {
      makePrediction([392, 383, 431, 461, 463, 467, 535, 586, 624]);
    }
  };

  return (
    <div style={{ color: "white" }}>
      <h1>TensorFlow.js Model Prediction</h1>
      <button onClick={handlePredictionClick} disabled={loading}>
        {loading ? "Making Prediction..." : "Make Prediction"}
      </button>
      <div>
        <h2>Results</h2>
        <p>Base RV: {baseRV}</p>
        <p>Resulting Lineup Run Value: {runValue}</p>
        <p>Players: {players.join(", ")}</p>
        <p>Expected RV at Position: {expectedRVAtPos.join(", ")}</p>
        <p>Expected RV at Primary Position: {expectedRVAtPrimaryPos.join(", ")}</p>
        <p>Primary Positions: {PrimaryPos.join(", ")}</p>
        <p>Best Players: {bestPlayers.join(", ")}</p>
        <p>Worst Players: {worstPlayers.join(", ")}</p>
      </div>
      {error && <div>Error: {error.toString()}</div>}
    </div>
  );
};

export default ModelLoader;

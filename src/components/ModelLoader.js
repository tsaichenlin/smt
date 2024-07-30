import React, { useEffect, useState, useCallback, useRef } from 'react';

const MAX_CONCURRENT_WORKERS = 2; // Adjust this number based on your available resources
const total_plays = 10; // Adjust as needed
var lineups_results = [0,0,0,0,0,0,0,0,0];
const ModelLoader = () => {
  const [baseRV, setBaseRV] = useState(0);
  const [error, setError] = useState(null);
  const [battedBallInput, setBattedBallInput] = useState([]);
  const [situationInput, setSituationInput] = useState([]);
  const [positionInput, setPositionInput] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const runValueReturned = useRef(false);
  const runValueRef = useRef(null);

  const [runValue, setRunValue] = useState(null);
  const [players, setPlayers] = useState([]);
  const [expectedRVAtPos, setExpectedRVAtPos] = useState(Array(9).fill(0));
  const expectedRVAtPosRef = useRef(expectedRVAtPos);

  const [bestPlayers, setBestPlayers] = useState([]);
  const [worstPlayers, setWorstPlayers] = useState([]);

  const workers = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [battedBallData, situationData, positionData] = await Promise.all([
          fetch('/Database/batted_ball_Input.json').then(response => response.json()),
          fetch('/Database/situation_Input.json').then(response => response.json()),
          fetch('/Database/position_Input.json').then(response => response.json()),
        ]);

        setBattedBallInput(battedBallData.slice(0, total_plays));
        setSituationInput(situationData.slice(0, total_plays));
        setPositionInput(positionData.slice(0, total_plays));

        // Initialize and preload workers
        for (let i = 0; i < MAX_CONCURRENT_WORKERS; i++) {
          const worker = new Worker(new URL('./worker.js', import.meta.url));
          worker.postMessage({ preload: true });
          worker.onmessage = () => {
            console.log(`Worker ${i} preloaded`);
          };
          workers.current.push(worker);
        }

        // Initialize the worker for the base lineup [1, 2, 3, 4, 5, 6, 7, 8, 9]
        const workerInstance = new Worker(new URL('./worker.js', import.meta.url));
        workerInstance.onmessage = (e) => {
          setBaseRV(e.data.result);
          workerInstance.terminate();
        };
        workerInstance.onerror = (err) => {
          console.error('Error in worker:', err);
          setError(err);
          workerInstance.terminate();
        };
        workerInstance.postMessage({
          battedBallInput: battedBallData.slice(0, total_plays),
          situationInput: situationData.slice(0, total_plays),
          positionInput: positionData.slice(0, total_plays),
          lineup: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        });

        setError(null);
        console.log('Data fetched');
      } catch (err) {
        console.error('Error fetching JSON:', err);
        setError(err);
      }
    };

    fetchData();
    return () => {
      // Terminate workers when the component unmounts
      workers.current.forEach(worker => worker.terminate());
    };
  }, []);

  useEffect(() => {
  }, [expectedRVAtPos]);
    let workersReturned = 0;
  const processBatch = useCallback(async (batch) => {
    let pitcher = 0;
    let catcher = 0;
    let first = 0;
    let second = 0;
    let third = 0;
    let shortstop =0;
    let left = 0;
    let center = 0;
    let right = 0;
    const workerPromises = batch.map((lineup, index) =>
      new Promise((resolve, reject) => {
        const workerInstance = workers.current[index % MAX_CONCURRENT_WORKERS];

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
                lineups_results[place-1] = runValueRef.current - result;
              } else {
                updatedResults[place - 1] = result;
              }
              expectedRVAtPosRef.current = updatedResults;
              return updatedResults;
            });
          }
          resolve();
          workersReturned++;
        };

        const handleError = (err) => {
          console.error('Error in worker:', err);
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
          lineup: cutLineup
        });
      })
    );

    await Promise.all(workerPromises);

    // Update best and worst players after all workers are done
    if (workersReturned ==10){
        console.log('Before the best worst eval', lineups_results);
        console.log(expectedRVAtPos);
        let top = [0];
        let bottom = [0];

        for (let i = 1; i < 9 && i < workersReturned; i++) {
        for (let a = 0; a < 3; a++) {
            if (expectedRVAtPosRef.current[top[a]] < expectedRVAtPosRef.current[i]) {
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
            if (expectedRVAtPosRef.current[bottom[a]] > expectedRVAtPosRef.current[i]) {
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

        console.log('Top Players:', top);
        console.log('Bottom Players:', bottom);
        setBestPlayers(top);
        setWorstPlayers(bottom);
        console.log(workersReturned);
}
  }, [battedBallInput, situationInput, positionInput, baseRV]);

  const makePrediction = useCallback(async (lineup) => {
    runValueReturned.current = false;
    runValueRef.current = null;
    setLoading(true);
    setResults([]); // Clear previous results
    setPlayers(lineup);
    setExpectedRVAtPos(Array(9).fill(0)); // Reset expected run values

    try {
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
    } catch (err) {
      console.error('Error making prediction:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [processBatch]);

  const handlePredictionClick = () => {
    if (!loading) {
      makePrediction([392, 383, 431, 461, 463, 467, 535, 586, 624]);
    }
  };

  return (
    <div>
      <h1>TensorFlow.js Model Prediction</h1>
      <button onClick={handlePredictionClick} disabled={loading}>
        {loading ? 'Making Prediction...' : 'Make Prediction'}
      </button>
      <div>
        <h2>Results</h2>
        <p>Base RV: {baseRV}</p>
        <p>Resulting Lineup Run Value: {runValue}</p>
        <p>Players: {players.join(', ')}</p>
        <p>Expected RV at Position: {expectedRVAtPos.join(', ')}</p>
        <p>Best Players: {bestPlayers.join(', ')}</p>
        <p>Worst Players: {worstPlayers.join(', ')}</p>
      </div>
      {error && <div>Error: {error.toString()}</div>}
    </div>
  );
};

export default ModelLoader;

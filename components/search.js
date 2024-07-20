import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const CsvReader = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    playerFirstName: '',
    playerLastName: '',
    playerId: '',
    position: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Database/player_database.csv');
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result.value);
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            const filteredResults = results.data.map(row => {
                delete row[''];
                return row;
              });
            setData(results.data);
            setFilteredData(results.data); // Initialize filtered data
            setError(null);
          },
          error: (err) => {
            console.error('Error parsing CSV:', err);
            setError(err);
          }
        });
      } catch (err) {
        console.error('Error fetching CSV:', err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleSearch = (playerFirstName, playerLastName, playerId, position) => {
    const filtered = data.filter((row) => {
      return (
        (playerFirstName ? row.first_name === playerFirstName : true) &&
        (playerLastName ? row.last_name === playerLastName : true) &&
        (playerId ? row.player_id === playerId : true) &&
        (position ? row.primary_position === position || row.secondary_position.includes(position) : true)
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div>
      <h1>CSV Reader and Search</h1>

      <div>
        <h2>Search Criteria</h2>
        <input
          type="text"
          name="playerFirstName"
          placeholder="Player First Name"
          value={searchCriteria.playerFirstName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="playerLastName"
          placeholder="Player Last Name"
          value={searchCriteria.playerLastName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="playerId"
          placeholder="Player ID"
          value={searchCriteria.playerId}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={searchCriteria.position}
          onChange={handleInputChange}
        />
        <button
          onClick={() =>
            handleSearch(
              searchCriteria.playerFirstName,
              searchCriteria.playerLastName,
              searchCriteria.playerId,
              searchCriteria.position
            )
          }
        >
          Search
        </button>
      </div>

      {error && <div>Error: {error.message}</div>}
      {filteredData.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <pre>{JSON.stringify(filteredData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};


export default CsvReader;

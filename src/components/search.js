import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import styled from "styled-components";
import "@fortawesome/fontawesome-free/css/all.min.css";
import SearchCard from "./SearchCard";

const SearchBar = styled.input`
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  border: solid var(--white) 1px;
  background: none;
  color: var(--white);
  outline: none;
  z-index: 5;
  &::placeholder {
    color: var(--white);
  }
`;
const Button = styled.button`
  width: 30px;
  background-color: transparent;
  border: none;
  color: var(--white);
  font-weight: normal;
  font-size: 22px;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`;
const Div = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const ResultContainer = styled.div`
  width: 100%;
  height: 700px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  gap: 20px;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const CsvReader = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    searchInput: "",
    playerLastName: "",
    playerId: "",
    position: "",
  });

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
            const filteredResults = results.data.map((row) => {
              delete row[""];
              return row;
            });
            setData(results.data);
            setFilteredData(results.data);
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

  const handleInputChange = (event) => {
    setSearchCriteria({ searchInput: event.target.value });
    if (event.target.value === "") {
      setFilteredData(data);
    }
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleSearch(searchCriteria.searchInput);
    }
  };

  const clearSearchInput = () => {
    setSearchCriteria({ searchInput: "" });
    setFilteredData(data);
  };

  const handleSearch = (searchQuery) => {
    searchQuery = searchQuery.toLowerCase();
    if (!searchQuery) {
      setFilteredData(data);
      return;
    }
    const filtered = data.filter((row) => {
      return (
        (row.first_name &&
          row.first_name.toLowerCase().includes(searchQuery)) ||
        (row.last_name && row.last_name.toLowerCase().includes(searchQuery)) ||
        (row.player_id && row.player_id.toLowerCase().includes(searchQuery)) ||
        (row.level && row.level.toLowerCase().includes(searchQuery)) ||
        (row.primary_position &&
          row.primary_position.toLowerCase().includes(searchQuery)) ||
        (Array.isArray(row.secondary_position) &&
          row.secondary_position.some((position) =>
            position.toLowerCase().includes(searchQuery)
          ))
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div>
      <Div>
        <SearchBar
          placeholder="Search name, id, and positions."
          value={searchCriteria.searchInput}
          onChange={handleInputChange}
          onKeyDown={handleEnter}
        ></SearchBar>
        <Button onClick={clearSearchInput}>&#x2715;</Button>
      </Div>

      {error && <div>Error: {error.message}</div>}
      {filteredData.length > 0 && (
        <ResultContainer>
          {filteredData.map((player, index) => (
            <SearchCard key={index} player={player} />
          ))}
        </ResultContainer>
      )}
    </div>
  );
};

export default CsvReader;

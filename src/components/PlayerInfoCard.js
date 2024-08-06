import React, { useEffect, useState, useContext } from "react";
import Papa from "papaparse";
import styled from "styled-components";

import photoPlaceHolder from "../images/photoPlaceHolder.webp";
import { GlobalContext } from "../GlobalContext";
const Card = styled.div`
  background-color: var(--dark-blue);
  display: flex;
  width: 100%;
  min-width: 350px;
  align-items: top;
  box-sizing: border-box;
  padding: 20px;
  flex-direction: row;
`;

const InfoDiv = styled.div`
  margin: 0 30px;
  padding: 0;
  color: var(--white);
  overflow: hidden;
  width: 100%;
`;

const Photo = styled.img`
  width: 25%;
  height: 25%;
  object-fit: cover;
`;

const Name = styled.h1`
  font-size: 25px;
  margin: 0;
  white-space: nowrap;
`;

const Info = styled.p`
  font-size: 16px;
  margin: 5px 0;
  padding: 0;
  color: var(--white);
`;

const Div = styled.div`
  display: flex;
  align-items: baseline;
  gap: 15px;
  flex-wrap: wrap;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: var(--white);
  text-align: left;
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 25px;
  border-top: 0;
`;

export const Tr = styled.tr`
  font-weight: 200;
  box-sizing: border-box;
  padding: 20px;
  box-sizing: border-box;
  background-color: var(--dark-blue);
  &:nth-child(odd) {
    background-color: var(--blue);
    .td {
      border: none;
    }
  }
`;
const Th = styled.th`
  width: 19%;
  font-size: 20px;
  box-sizing: border-box;
  padding: 10px;
  color: var(--white);
  background-color: var(--dark-blue);
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--dark-blue);
`;

const Td = styled.td`
  border: 0;
  padding: 5px 10px;
  font-size: 18px;
  font-weight: 500;
  &.data {
    text-align: right;
  }
  box-sizing: border-box;
`;

const ScrollSection = styled.div`
  overflow-y: auto;
  overflow-x: auto;
  max-height: 500px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: var(--blue);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--white);
    border-radius: 10px;
  }
`;

const EmptySection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 550px;
  margin-top: 10%;
  font-size: 15px;

  h1 {
    color: var(--white);
    opacity: 0.5;
  }
`;
const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 10px;
  font-weight: 500;
`;

const RemoveButton = styled.div`
  background-color: var(--dark-blue);
  color: var(--white);
  width: 150px;
  text-align: center;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;
export default function PlayerInfoCard() {
  const { selectedPlayer, setSelectedPlayer } = useContext(GlobalContext);
  const { globalPlayers, setGlobalPlayers } = useContext(GlobalContext);
  const { isShowing, setIsShowing } = useContext(GlobalContext);
  const { editPlayerMode, setEditPlayerMode } = useContext(GlobalContext);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [player, setPlayer] = useState(null);
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

  const handleSearch = (searchQuery) => {
    const filtered = data.filter((row) => {
      return row.player_id && row.player_id === searchQuery;
    });
    setPlayer(filtered[0]);
  };

  const generateSecondary = (positions) => {
    if (positions) {
      return positions
        .replace(/\[|\]|'/g, "")
        .split(", ")
        .map((position) =>
          position
            .split("_")
            .map(
              (word) => word.charAt(0).toUpperCase() + word.slice(1) // Capitalize each word
            )
            .join(" ")
        )
        .join(", ");
    } else {
      return "None";
    }
  };

  useEffect(() => {
    if (selectedPlayer != "") {
      setPlayer(
        data.find((row) => row.player_id == globalPlayers[selectedPlayer]?.id)
      );
    }
  }, [selectedPlayer, globalPlayers, filteredData]);

  const formatPrimary = (pos) => {
    if (typeof pos === "string") {
      return pos
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(" ");
    }
  };
  const deletePlayer = () => {
    setGlobalPlayers((prev) => ({
      ...prev,
      [selectedPlayer]: { name: "...", id: "" },
    }));
    setTimeout(() => {
      setIsShowing(true);
      setTimeout(() => {
        setSelectedPlayer("");
        setEditPlayerMode(false);
      }, 600);
    }, 400);
  };
  if (!player) {
    return (
      <EmptySection>
        <h1>No Player Selected</h1>
      </EmptySection>
    );
  }
  return (
    <div style={{ marginTop: "20px" }}>
      <Div style={{ justifyContent: "space-between" }}>
        <Title>Selected {selectedPlayer}</Title>
        <RemoveButton onClick={deletePlayer}>Delete Player</RemoveButton>
      </Div>

      <Card>
        <Photo src={photoPlaceHolder} />
        <InfoDiv>
          <Div>
            <Name>{player.first_name + " " + player.last_name}</Name>
            <Info>{"ID: " + player.player_id}</Info>
          </Div>
          <Info>{"Level: " + player.level}</Info>
          <Info>
            {"Primary: " + formatPrimary(player.primary_position)}
          </Info>{" "}
          <Info>
            {"Secondary: " + generateSecondary(player.secondary_position)}
          </Info>
          <Info>
            {"Run Value: " + Math.round(player.run_value * 100) / 100}
          </Info>
        </InfoDiv>
      </Card>
      <ScrollSection>
        <Card>
          <Table>
            <thead>
              <Th>Position</Th>
              <Th>Run Value</Th>
            </thead>
            <tbody>
              <Tr>
                <Td>Pitcher</Td>
                <Td>{Number(player.pitcher_value).toFixed(2)}</Td>
              </Tr>
              <Tr>
                <Td>Catcher</Td>
                <Td>{Number(player.catcher_value).toFixed(2)}</Td>
              </Tr>
              <Tr>
                <Td>First Base</Td>
                <Td>{Number(player.first_base_value).toFixed(2)}</Td>
              </Tr>
              <Tr>
                <Td>Second Base</Td>
                <Td>{Number(player.second_base_value).toFixed(2)}</Td>
              </Tr>
              <Tr>
                <Td>Third Base</Td>
                <Td>{Number(player.third_base_value).toFixed(2)}</Td>
              </Tr>
              <Tr>
                <Td>Shortstop</Td>
                <Td>{Number(player.shortstop_value).toFixed(2)}</Td>
              </Tr>
              <Tr>
                <Td>Left Field</Td>
                <Td>{Number(player.left_field_value).toFixed(2)}</Td>
              </Tr>
              <Tr>
                <Td>Center Field</Td>
                <Td>{Number(player.center_field_value).toFixed(2)}</Td>
              </Tr>
              <Tr>
                <Td>Right Field</Td>
                <Td>{Number(player.right_field_value).toFixed(2)}</Td>
              </Tr>
            </tbody>
          </Table>
        </Card>
      </ScrollSection>
    </div>
  );
}

//,player_id,first_name,last_name,level,primary_position,secondary_position,pitcher_value,catcher_value,first_base_value,second_base_value,third_base_value,shortstop_value,left_field_value,center_field_value,right_field_value,run_value

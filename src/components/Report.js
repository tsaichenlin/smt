import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../GlobalContext";
import { useRVv } from "./FetchData";

const Container = styled.div`
  padding: 10px 50px;
  box-sizing: border-box;
  padding-right: 30px;
  height: 630px;
`;

const Title = styled.h2`
  color: var(--white);
  font-weight: 500;
  font-size: 30px;
  margin-bottom: 8px;
`;

const Players = styled.h2`
  color: ${(props) => props.color};
  font-weight: 300;
  font-size: 18px;
  margin: 5px 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: var(--white);
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  margin-bottom: 25px;
`;

const Tr = styled.tr`
  font-weight: 200;
  box-sizing: border-box;
  border: 2px solid var(--gray);
  padding: 20px;
  box-sizing: border-box;
  &:nth-child(even) {
    background-color: var(--table-accent);
    .td {
      border: none;
    }
  }
`;

const Th = styled.th`
  width: 19%;
  font-size: 14px;
  box-sizing: border-box;
  padding: 10px;
  color: var(--blue);
  background-color: var(--gray);
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--gray);
`;

const Td = styled.td`
  border: 0;
  padding: 5px 10px;
  font-size: 15px;
  &.data {
    text-align: right;
  }
  box-sizing: border-box;
  height: 45px;
  border: solid 2px var(--table-accent);
`;

const ScrollSection = styled.div`
  overflow-y: auto;
  overflow-x: auto;
  max-height: calc(100vh - 430px);
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: var(--gray);
    padding: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--white);
    border-radius: 10px;
  }
`;

function Report() {
  const { globalPlayers } = useContext(GlobalContext);
  const { response, setResponse } = useContext(GlobalContext);
  const { playerData: pitcherData } = useRVv("Pitcher");
  const { playerData: catcherData } = useRVv("Catcher");
  const { playerData: firstBaseData } = useRVv("First");
  const { playerData: secondBaseData } = useRVv("Second");
  const { playerData: thirdBaseData } = useRVv("Third");
  const { playerData: shortstopData } = useRVv("Shortstop");
  const { playerData: leftFieldData } = useRVv("Left");
  const { playerData: centerFieldData } = useRVv("Center");
  const { playerData: rightFieldData } = useRVv("Right");
  const averagePlayers = {
    1: "Avg Pitcher",
    2: "Avg Catcher",
    3: "Avg First Base",
    4: "Avg Second Base",
    5: "Avg Third Base",
    6: "Avg Shortstop",
    7: "Avg Left Field",
    8: "Avg Center Field",
    9: "Avg Right Field",
  };

  const getPlayerName = (id) => {
    if (averagePlayers[id]) {
      return averagePlayers[id];
    }

    for (const position in globalPlayers) {
      if (globalPlayers[position].id === id) {
        console.log(globalPlayers[position].name);
        return globalPlayers[position].name;
      }
    }

    return "";
  };

  const getPlayerRanking = (playerList) => {
    console.log(response);
    return playerList
      .map((id) => getPlayerName(id))
      .filter((name) => name)
      .join(", ");
  };

  const positionKeyMap = {
    First: "first_base_value",
    Second: "second_base_value",
    Third: "third_base_value",
    Shortstop: "shortstop_value",
    Left: "left_field_value",
    Center: "center_field_value",
    Right: "right_field_value",
    Pitcher: "pitcher_value",
    Catcher: "catcher_value",
  };

  const positionName = {
    First: "First Base",
    Second: "Second Base",
    Third: "Third Base",
    Shortstop: "Shortstop",
    Left: "Left Field",
    Center: "Center Field",
    Right: "Right Field",
    Pitcher: "Pitcher",
    Catcher: "Catcher",
  };

  const renderPlayerRow = (position, index, playerData) => {
    const playerName =
      globalPlayers[position].name !== "..."
        ? globalPlayers[position].name
        : response
        ? averagePlayers[index + 1] || "Avg Player"
        : "-";

    const responseValue = response ? response.RV_player[index].toFixed(2) : "-";

    const playerKey = positionKeyMap[position];
    const playerValue =
      playerData && response ? Number(playerData[playerKey]).toFixed(2) : "-";

    if (playerData) {
      console.log("num ", playerData, playerKey);
    }
    const difference =
      response && playerData
        ? (
            response.RV_player[index] - Number(playerData[`${playerKey}`])
          ).toFixed(2)
        : "-";
    const pos = response ? positionName[position] : "-";

    return (
      <Tr key={position}>
        <Td>{playerName}</Td>
        <Td>{pos}</Td>
        <Td>{responseValue}</Td>
        <Td>{playerValue}</Td>
        <Td>{difference}</Td>
      </Tr>
    );
  };

  useEffect(() => {}, [response]);
  return (
    <div>
      <Container>
        <Title>Evaluation Report</Title>
        <div style={{ marginBottom: "20px" }}>
          <Players color="var(--green)">
            Top 3:{" "}
            {response && response.TopPlayers
              ? getPlayerRanking(response.TopPlayers)
              : "-"}
          </Players>
          <Players color="var(--red)">
            Bottom 3:{" "}
            {response && response.BottomPlayers
              ? getPlayerRanking(response.BottomPlayers)
              : "-"}
          </Players>
        </div>
        <Table>
          <thead>
            <Th>Expected Lineup RV</Th>
            <Th>Expected Lineup RVv</Th>
            <Th>RV - RVv</Th>
          </thead>
          <tbody>
            <Tr>
              <Td>
                {" "}
                {response.RV_lineup ? response.RV_lineup.toFixed(2) : "-"}
              </Td>

              <Td>
                {(Number(pitcherData?.pitcher_value) || 0) +
                  (Number(catcherData?.catcher_value) || 0) +
                  (Number(firstBaseData?.first_base_value) || 0) +
                  (Number(secondBaseData?.second_base_value) || 0) +
                  (Number(thirdBaseData?.third_base_value) || 0) +
                  (Number(shortstopData?.shortstop_value) || 0) +
                  (Number(leftFieldData?.left_field_value) || 0) +
                  (Number(centerFieldData?.center_field_value) || 0) +
                  (Number(rightFieldData?.right_field_value) || 0) ===
                0
                  ? "-"
                  : response.RV_lineup
                  ? (
                      (Number(pitcherData?.pitcher_value) || 0) +
                      (Number(catcherData?.catcher_value) || 0) +
                      (Number(firstBaseData?.first_base_value) || 0) +
                      (Number(secondBaseData?.second_base_value) || 0) +
                      (Number(thirdBaseData?.third_base_value) || 0) +
                      (Number(shortstopData?.shortstop_value) || 0) +
                      (Number(leftFieldData?.left_field_value) || 0) +
                      (Number(centerFieldData?.center_field_value) || 0) +
                      (Number(rightFieldData?.right_field_value) || 0)
                    ).toFixed(2)
                  : "-"}
              </Td>
              <Td>
                {(Number(pitcherData?.pitcher_value) || 0) +
                  (Number(catcherData?.catcher_value) || 0) +
                  (Number(firstBaseData?.first_base_value) || 0) +
                  (Number(secondBaseData?.second_base_value) || 0) +
                  (Number(thirdBaseData?.third_base_value) || 0) +
                  (Number(shortstopData?.shortstop_value) || 0) +
                  (Number(leftFieldData?.left_field_value) || 0) +
                  (Number(centerFieldData?.center_field_value) || 0) +
                  (Number(rightFieldData?.right_field_value) || 0) ===
                0
                  ? "-"
                  : response.RV_lineup
                  ? (
                      response.RV_lineup -
                      (Number(pitcherData?.pitcher_value) || 0) +
                      (Number(catcherData?.catcher_value) || 0) +
                      (Number(firstBaseData?.first_base_value) || 0) +
                      (Number(secondBaseData?.second_base_value) || 0) +
                      (Number(thirdBaseData?.third_base_value) || 0) +
                      (Number(shortstopData?.shortstop_value) || 0) +
                      (Number(leftFieldData?.left_field_value) || 0) +
                      (Number(centerFieldData?.center_field_value) || 0) +
                      (Number(rightFieldData?.right_field_value) || 0)
                    ).toFixed(2)
                  : "-"}
              </Td>
            </Tr>
          </tbody>
        </Table>
        <ScrollSection>
          <Table>
            <thead>
              <Th>Player</Th>
              <Th>Position</Th>
              <Th>Expected RV</Th>
              <Th>Expected RVv</Th>
              <Th>RV - RVv</Th>
            </thead>
            <tbody>
              {renderPlayerRow("Pitcher", 0, pitcherData)}
              {renderPlayerRow("Catcher", 1, catcherData)}
              {renderPlayerRow("First", 2, firstBaseData)}
              {renderPlayerRow("Second", 3, secondBaseData)}
              {renderPlayerRow("Third", 4, thirdBaseData)}
              {renderPlayerRow("Shortstop", 5, shortstopData)}
              {renderPlayerRow("Left", 6, leftFieldData)}
              {renderPlayerRow("Center", 7, centerFieldData)}
              {renderPlayerRow("Right", 8, rightFieldData)}
            </tbody>
          </Table>
        </ScrollSection>
      </Container>
    </div>
  );
}

export default Report;

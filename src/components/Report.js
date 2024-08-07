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

const TableContainer = styled.div`
  overflow-x: auto;
  max-width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: var(--white);
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  margin-bottom: 25px;
  border-top: 0;
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
  border: solid 2px var(--gray);
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

  const getPlayerName = (id) => {
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

  return (
    <div>
      <Container>
        <Title>Evaluation Report</Title>
        <div style={{ marginBottom: "20px" }}>
          <Players color="var(--green)">
            Top 3:{" "}
            {response && response.TopPlayers
              ? getPlayerRanking(response.TopPlayers)
              : "N/a"}
          </Players>
          <Players color="var(--red)">
            Bottom 3:{" "}
            {response && response.BottomPlayers
              ? getPlayerRanking(response.BottomPlayers)
              : "N/a"}
          </Players>
        </div>
        <Table>
          <thead>
            <Th>Expected Lineup RV:</Th>
            <Th>Expected Lineup RVv:</Th>
          </thead>
          <tbody>
            <Tr>
              <Td>
                {" "}
                {response.RV_lineup ? response.RV_lineup.toFixed(2) : "0"}
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
                  ? "0"
                  : (
                      (Number(pitcherData?.pitcher_value) || 0) +
                      (Number(catcherData?.catcher_value) || 0) +
                      (Number(firstBaseData?.first_base_value) || 0) +
                      (Number(secondBaseData?.second_base_value) || 0) +
                      (Number(thirdBaseData?.third_base_value) || 0) +
                      (Number(shortstopData?.shortstop_value) || 0) +
                      (Number(leftFieldData?.left_field_value) || 0) +
                      (Number(centerFieldData?.center_field_value) || 0) +
                      (Number(rightFieldData?.right_field_value) || 0)
                    ).toFixed(2)}
              </Td>
            </Tr>
          </tbody>
        </Table>
        <ScrollSection>
          <Table>
            <thead style={{ background: "var(--gray)" }}>
              <Th>Player</Th>
              <Th>Position</Th>
              <Th>Expected RV</Th>
              <Th>Expected RVv</Th>
              <Th>RV Difference</Th>
            </thead>
            <tbody>
              <Tr>
                <Td>
                  {globalPlayers.Pitcher.name !== "..."
                    ? globalPlayers.Pitcher.name
                    : "Average Player"}
                </Td>
                <Td>Pitcher</Td>
                <Td>{response ? response.RV_player[0].toFixed(2) : "0"}</Td>
                <Td>
                  {pitcherData
                    ? Number(pitcherData.pitcher_value).toFixed(2)
                    : "0"}
                </Td>
                <Td>
                  {response && pitcherData
                    ? (
                        Number(pitcherData.pitcher_value) -
                        response.RV_player[0]
                      ).toFixed(2)
                    : "0"}
                  {""}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  {globalPlayers.Catcher.name !== "..."
                    ? globalPlayers.Catcher.name
                    : "Average Player"}
                </Td>
                <Td>Catcher</Td>
                <Td>{response ? response.RV_player[1].toFixed(2) : "0"}</Td>
                <Td>
                  {catcherData
                    ? Number(catcherData.catcher_value).toFixed(2)
                    : "0"}
                </Td>
                <Td>
                  {response && catcherData
                    ? (
                        Number(catcherData.catcher_value) -
                        response.RV_player[1]
                      ).toFixed(2)
                    : "0"}{" "}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  {globalPlayers.First.name !== "..."
                    ? globalPlayers.First.name
                    : "Average Player"}
                </Td>
                <Td>First Base</Td>
                <Td>{response ? response.RV_player[2].toFixed(2) : "0"}</Td>
                <Td>
                  {firstBaseData
                    ? Number(firstBaseData.first_base_value).toFixed(2)
                    : "0"}
                </Td>
                <Td>
                  {response && firstBaseData
                    ? (
                        Number(firstBaseData.first_base_value) -
                        response.RV_player[2]
                      ).toFixed(2)
                    : "0"}{" "}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  {globalPlayers.Second.name !== "..."
                    ? globalPlayers.Second.name
                    : "Average Player"}
                </Td>
                <Td>Second Base</Td>
                <Td>{response ? response.RV_player[3].toFixed(2) : "0"}</Td>
                <Td>
                  {secondBaseData
                    ? Number(secondBaseData.second_base_value).toFixed(2)
                    : "0"}
                </Td>
                <Td>
                  {response && secondBaseData
                    ? (
                        Number(secondBaseData.second_base_value) -
                        response.RV_player[3]
                      ).toFixed(2)
                    : "0"}{" "}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  {globalPlayers.Third.name !== "..."
                    ? globalPlayers.Third.name
                    : "Average Player"}
                </Td>
                <Td>Third Base</Td>
                <Td>{response ? response.RV_player[4].toFixed(2) : "0"}</Td>
                <Td>
                  {thirdBaseData
                    ? Number(thirdBaseData.third_base_value).toFixed(2)
                    : "0"}
                </Td>
                <Td>
                  {response && thirdBaseData
                    ? (
                        Number(thirdBaseData.third_base_value) -
                        response.RV_player[4]
                      ).toFixed(2)
                    : "0"}{" "}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  {globalPlayers.Shortstop.name !== "..."
                    ? globalPlayers.Shortstop.name
                    : "Average Player"}
                </Td>
                <Td>Shortstop</Td>
                <Td>{response ? response.RV_player[5].toFixed(2) : "0"}</Td>
                <Td>
                  {shortstopData
                    ? Number(shortstopData.shortstop_value).toFixed(2)
                    : "0"}
                </Td>
                <Td>
                  {response && shortstopData
                    ? (
                        Number(shortstopData.shortstop_value) -
                        response.RV_player[5]
                      ).toFixed(2)
                    : "0"}{" "}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  {globalPlayers.Left.name !== "..."
                    ? globalPlayers.Left.name
                    : "Average Player"}
                </Td>
                <Td>Left Field</Td>
                <Td>{response ? response.RV_player[6].toFixed(2) : "0"}</Td>
                <Td>
                  {leftFieldData
                    ? Number(leftFieldData.left_field_value).toFixed(2)
                    : "0"}
                </Td>
                <Td>
                  {response && leftFieldData
                    ? (
                        Number(leftFieldData.left_field_value) -
                        response.RV_player[6]
                      ).toFixed(2)
                    : "0"}{" "}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  {globalPlayers.Center.name !== "..."
                    ? globalPlayers.Center.name
                    : "Average Player"}
                </Td>
                <Td>Center Field</Td>
                <Td>{response ? response.RV_player[7].toFixed(2) : "0"}</Td>
                <Td>
                  {centerFieldData
                    ? Number(centerFieldData.center_field_value).toFixed(2)
                    : "0"}
                </Td>
                <Td>
                  {response && centerFieldData
                    ? (
                        Number(centerFieldData.center_field_value) -
                        response.RV_player[7]
                      ).toFixed(2)
                    : "0"}{" "}
                </Td>
              </Tr>
              <Tr>
                <Td>
                  {globalPlayers.Right.name !== "..."
                    ? globalPlayers.Right.name
                    : "Average Player"}
                </Td>
                <Td>Right Field</Td>
                <Td>{response ? response.RV_player[8].toFixed(2) : "0"}</Td>
                <Td>
                  {rightFieldData
                    ? Number(rightFieldData.right_field_value).toFixed(2)
                    : "0"}
                </Td>
                <Td>
                  {response && rightFieldData
                    ? (
                        Number(rightFieldData.right_field_value) -
                        response.RV_player[8]
                      ).toFixed(2)
                    : "0"}{" "}
                </Td>
              </Tr>
            </tbody>
          </Table>
        </ScrollSection>
      </Container>
    </div>
  );
}

export default Report;

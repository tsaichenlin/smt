import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../GlobalContext";

import Nav from "../components/Nav";
import SimButton from "../components/SimButton";
import fullField from "../images/fullField.png";
import EditButton from "../components/EditButton";
import PlayerButton from "../components/PlayerButton";

import CsvReader from "../components/search";

const Div = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
  &::before {
    content: "";
    background-color: var(--dark-gray);
    height: 100%;
    width: 50%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }
`;

const Content = styled.div`
  display: flex;
  position: relative;
`;
const BgLineContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  top: 50px;
  height: calc(100%-50px);
  width: 50%;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BgLine = styled.div`
  border: solid 1px var(--gray);
  height: 90%;
  width: 90%;

  z-index: -1;
  position: relative;
  top: 0;
  right: 0;
  overflow: hidden;

  &::before {
    content: "";
    border: solid 1px var(--gray);
    position: absolute;
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    margin: 10px;
    z-index: -1;
  }
`;

const TeamSection = styled.div`
  position: absolute;
  right: 50%;
  transform: translate(50%, 20px);
  z-index: 5;

  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
`;

const Right = styled.div`
  width: 50%;
`;

const Left = styled(Right)`
  display: flex;
  align-items: center;
  padding-right: 8vw;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
`;

const Img = styled.img`
  width: 500px;
  width: 80%;
  margin: 50px;
`;

const EditPanel = styled.div`
  background-color: var(--blue);
  height: 100%;
  width: 50%;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 4;
  padding: 35px;
  box-sizing: border-box;

  &::before {
    content: "Edit Mode";
    color: var(--white);
    text-align: top;
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 35px;
    margin-top: 30px;
    font-size: 28px;
    font-weight: 400;
  }
`;

const ExitButton = styled.div`
  display: inline-block;
  font-weight: 900;
  font-size: 20px;
  color: var(--white);
  cursor: pointer;
`;

const SearchSection = styled.div`
  height: 90%;
  margin-left: 80px;
  overflow: hidden;
`;

function Simulator() {
  const [editMode, setEditMode] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { globalPlayers, setGlobalPlayers } = useContext(GlobalContext);

  const enterEditMode = () => {
    setEditMode(true);
  };

  const exitEditMode = () => {
    setEditMode(false);
  };

  const handleSearchInput = (e) => {
    if (e.key === "Enter") {
      console.log(searchInput);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  useEffect(() => {
    console.log(editMode);
  }, [editMode]);

  return (
    <Div>
      <Nav></Nav>

      <TeamSection>
        <EditButton onClick={enterEditMode} />
        <PlayerButton name={globalPlayers.Pitcher.name} position="P" />
        <PlayerButton name={globalPlayers.Catcher.name} position="C" />
        <PlayerButton name={globalPlayers.First.name} position="1B" />
        <PlayerButton name={globalPlayers.Second.name} position="2B" />
        <PlayerButton name={globalPlayers.Third.name} position="3B" />
        <PlayerButton name={globalPlayers.Shortstop.name} position="SS" />
        <PlayerButton name={globalPlayers.Left.name} position="LF" />
        <PlayerButton name={globalPlayers.Center.name} position="CF" />
        <PlayerButton name={globalPlayers.Right.name} position="RF" />
      </TeamSection>
      {editMode && (
        <EditPanel>
          <ExitButton onClick={exitEditMode}>&#10005;</ExitButton>
          <h3
            style={{
              color: "var(--white)",
              textAlign: "right",
              fontWeight: "normal",
              marginTop: "10px",
            }}
          >
            Create Your Lineup
          </h3>
          <SearchSection>
            <CsvReader></CsvReader>
          </SearchSection>
        </EditPanel>
      )}

      <Content>
        <Left>
          <Img src={fullField}></Img>
          <SimButton></SimButton>
          <div>
            <p style={{ color: "var(--blue)" }}>
              Select Players and Simulate the Play.
            </p>
          </div>
        </Left>

        <Right></Right>
      </Content>
      <BgLineContainer>
        <BgLine></BgLine>
      </BgLineContainer>
    </Div>
  );
}

export default Simulator;

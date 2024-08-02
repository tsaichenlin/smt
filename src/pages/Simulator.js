import styled, { keyframes } from "styled-components";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../GlobalContext";

import Nav from "../components/Nav";
import SimButton from "../components/SimButton";
import FieldSVG from "../images/fieldSVG.js";
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
  min-height: 700px;
  box-sizing: border-box;
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
  align-items: center;
  overflow: hidden;
`;

const ImgContainer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
  box-sizing: border-box;
`;

const FieldZoom = styled(FieldSVG)`
  transform: scale(1);
  transform-origin: center bottom;
  width: 100%;
  height: 100%;
`;

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
 0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
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
  transform: translateX(100%);

  animation: ${({ isShowing }) => (isShowing ? slideOut : slideIn)} 0.6s ease
    forwards;

  &::before {
    content: "${({ title }) => title}";
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

const Section = styled.div`
  height: 90%;
  margin-left: 80px;
  overflow: hidden;
`;

function Simulator() {
  const { editMode, setEditMode } = useContext(GlobalContext);
  const { editPlayerMode, setEditPlayerMode } = useContext(GlobalContext);
  const { selectedPlayer, setSelectedPlayer } = useContext(GlobalContext);

  const { globalPlayers, setGlobalPlayers } = useContext(GlobalContext);
  const { svgController, setSvgController } = useContext(GlobalContext);

  const { isShowing, setIsShowing } = useContext(GlobalContext);

  const enterEditMode = () => {
    if (editMode) {
      setIsShowing(true);
      setTimeout(() => {
        setEditMode(false);
      }, 600);
    } else {
      setIsShowing(true);
      setTimeout(() => {
        setEditPlayerMode(false);
        setSelectedPlayer("");
        setEditMode(true);
        setIsShowing(false);
      }, 600);
    }
  };

  const exitEditMode = () => {
    if (editMode) {
      setIsShowing(true);
      setTimeout(() => {
        setEditMode(false);
      }, 600);
    } else if (editPlayerMode) {
      setIsShowing(true);
      setTimeout(() => {
        setEditPlayerMode(false);
        setSelectedPlayer("");
      }, 600);
    }
  };
  const handleStarButton = () => {
    if (editPlayerMode && selectedPlayer == "") {
      setIsShowing(true);
      setTimeout(() => {
        setEditPlayerMode(false);
      }, 600);
    } else {
      setIsShowing(true);
      setTimeout(() => {
        setEditMode(false);
        setEditPlayerMode(true);
        setIsShowing(false);
      }, 600);
    }
  };

  const handlePlayerButton = (pos) => {
    console.log(selectedPlayer + pos);
    if (editPlayerMode) {
      if (selectedPlayer == pos) {
        setIsShowing(true);
        setTimeout(() => {
          setSelectedPlayer("");
          setEditPlayerMode(false);
        }, 600);
      } else {
        setSelectedPlayer(pos);
      }
    } else {
      setIsShowing(true);
      setTimeout(() => {
        setEditMode(false);
        setEditPlayerMode(true);
        setSelectedPlayer(pos);
        setIsShowing(false);
      }, 600);
    }
  };

  return (
    <Div>
      <Nav color="var(--white)"></Nav>

      <TeamSection>
        <EditButton onClick={enterEditMode} />
        <PlayerButton
          name={globalPlayers.Pitcher.name}
          position="P"
          onClick={() => handlePlayerButton("pitcher")}
          clicked={selectedPlayer == "pitcher"}
        />
        <PlayerButton
          name={globalPlayers.Catcher.name}
          position="C"
          onClick={() => handlePlayerButton("catcher")}
          clicked={selectedPlayer == "catcher"}
        />
        <PlayerButton
          name={globalPlayers.First.name}
          position="1B"
          onClick={() => handlePlayerButton("first")}
          clicked={selectedPlayer == "first"}
        />
        <PlayerButton
          name={globalPlayers.Second.name}
          position="2B"
          onClick={() => handlePlayerButton("second")}
          clicked={selectedPlayer == "second"}
        />
        <PlayerButton
          name={globalPlayers.Third.name}
          position="3B"
          onClick={() => handlePlayerButton("third")}
          clicked={selectedPlayer == "third"}
        />
        <PlayerButton
          name={globalPlayers.Shortstop.name}
          position="SS"
          onClick={() => handlePlayerButton("shortstop")}
          clicked={selectedPlayer == "shortstop"}
        />
        <PlayerButton
          name={globalPlayers.Left.name}
          position="LF"
          onClick={() => handlePlayerButton("left")}
          clicked={selectedPlayer == "left"}
        />
        <PlayerButton
          name={globalPlayers.Center.name}
          position="CF"
          onClick={() => handlePlayerButton("center")}
          clicked={selectedPlayer == "center"}
        />
        <PlayerButton
          name={globalPlayers.Right.name}
          position="RF"
          onClick={() => handlePlayerButton("right")}
          clicked={selectedPlayer == "right"}
        />
      </TeamSection>
      {editMode && (
        <EditPanel isShowing={isShowing} title="Edit Mode">
          <ExitButton onClick={exitEditMode}>&#10005;</ExitButton>
          {!editPlayerMode && (
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
          )}
          <Section>
            <CsvReader></CsvReader>
          </Section>
        </EditPanel>
      )}
      {editPlayerMode && (
        <EditPanel isShowing={isShowing} title="Player Info">
          <ExitButton onClick={exitEditMode}>&#10005;</ExitButton>

          <Section>
            <h1>{selectedPlayer == "." ? "" : selectedPlayer}</h1>
            <p>info here</p>
          </Section>
        </EditPanel>
      )}

      <Content>
        <Left>
          <ImgContainer>
            <FieldZoom />
          </ImgContainer>

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

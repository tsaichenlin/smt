import styled, { keyframes } from "styled-components";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../GlobalContext";

import Nav from "../components/Nav";
import SimButton from "../components/SimButton";
import FieldSVG from "../images/fieldSVG.js";
import EditButton from "../components/EditButton";
import PlayerButton from "../components/PlayerButton";
import Report from "../components/Report.js";
import PlayerInfoCard from "../components/PlayerInfoCard.js";

import CsvReader from "../components/search";
import { runSimulation } from "../components/BackendConnector.js";

const Div = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
  &::before {
    content: "";
    background-color: var(--dark-gray);
    height: 100%;
    width: 60%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  position: relative;
  min-height: calc(100vh - 200px);
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`;
const BgLineContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  top: 60px;
  height: calc(100% - 50px);
  width: 60%;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 25px;
  box-sizing: border-box;
  overflow: hidden;
`;
const BgLine = styled.div`
  border: solid 1px var(--gray);
  height: 90%;
  width: 90%;
  border-radius: 20px;
  z-index: -1;
  position: relative;
  top: 0;
  right: 0;
  box-sizing: border-box;
  overflow: hidden;
  &::before {
    border-radius: 10px;

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
  right: 60%;
  transform: translate(50%, 20px);
  z-index: 4;

  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
`;

const Left = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  padding-right: 85px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 20px;
`;

const ImgContainer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
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
  width: 60%;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 3;
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
  font-weight: bold;
  font-size: 20px;
  color: var(--white);
  cursor: pointer;
  padding: 5px;
`;

const Section = styled.div`
  height: 90%;
  margin-left: 80px;
  overflow: hidden;
`;

const ZoomIn = keyframes`
  0%{
    transform: scale(0.5);
    opacity: 0;
  }
  100%{
    transform: scale(1);
    opacity: 1;
  }
`;

const PopupDiv = styled.div`
  position: absolute;
  z-index: 5;
  background-color: var(--popup-color);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PopupCard = styled.div`
  position: relative;
  background-color: var(--white);
  width: 40vw;
  height: 50vh;
  z-index: 6;
  padding: 20px;
  min-width: 400px;
  min-height: 250px;
  max-width: 700px;
  box-sizing: border-box;

  animation: ${ZoomIn} 0.4s ease-out;

  border-radius: 20px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--dark-gray);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 20;
  color: var(--white);
  h1 {
    text-align: center;
    font-weight: 700;
    font-size: 35px;
    opacity: 0.3;
    padding-top: 20px;
    margin: 0;
    padding-top: 10px;
  }
  p {
    font-size: 22px;
    opacity: 0.7;
    margin: 0;
  }
  i {
    background: transparent;
    border: none;
    border-radius: 5px;
    font-size: 40px;
    color: var(--white);
    opacity: 0.3;
    transition: scale 0.3s ease;
  }
`;

const StepList = styled.ol`
  list-style: none;
  counter-reset: step-counter;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 15px;
`;

const StepItem = styled.li`
  counter-increment: step-counter;
  margin: 0 0 1em 0;
  padding-left: 2em;
  position: relative;
  font-size: 18px;

  &:before {
    content: counter(step-counter);
    position: absolute;
    left: 0;
    top: 0;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    background-color: var(--blue);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
`;
function Simulator() {
  const { editMode, setEditMode } = useContext(GlobalContext);
  const { editPlayerMode, setEditPlayerMode } = useContext(GlobalContext);
  const { selectedPlayer, setSelectedPlayer } = useContext(GlobalContext);
  const { globalPlayers, setGlobalPlayers } = useContext(GlobalContext);
  const { isShowing, setIsShowing } = useContext(GlobalContext);
  const { isPopup, setIsPopup } = useContext(GlobalContext);
  const { data, setData } = useContext(GlobalContext);
  const { response, setResponse } = useContext(GlobalContext);
  const { isSimulating, setIsSimulating } = useContext(GlobalContext);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleExit = () => {
    if (editMode || editPlayerMode) {
      exitEditMode();
    }
  };

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

  const handlePlayerButton = (pos) => {
    pos = pos.charAt(0).toUpperCase() + pos.slice(1);
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
      setSelectedPlayer(pos);
      setIsShowing(true);
      setTimeout(() => {
        setEditMode(false);
        setEditPlayerMode(true);
        setIsShowing(false);
      }, 600);
    }
  };
  const handlePopup = () => {
    setIsPopup(!isPopup);
  };

  const generateID = () => {
    const positionDefaults = {
      Pitcher: "1",
      Catcher: "2",
      First: "3",
      Second: "4",
      Third: "5",
      Shortstop: "6",
      Left: "7",
      Center: "8",
      Right: "9",
    };

    const ids = Object.entries(globalPlayers).map(([position, player]) =>
      player.id !== "" ? player.id : positionDefaults[position]
    );
    // const ids = Object.entries(globalPlayers).map(([player]) => player.id);

    return JSON.stringify(ids);
  };

  useEffect(() => {
    console.log("Popup state changed:", isPopup);
  }, [isPopup]);
  const handleSim = async () => {
    const missingPos = [];

    for (let position in globalPlayers) {
      if (globalPlayers[position].name == "...") {
        missingPos.push(position);
      }
    }
    console.log("missing pos: " + missingPos);

    if (missingPos.length > 0) {
      const confirmation = window.confirm(
        `Some positions are empty, would you like to fill these positions with average players?`
      );
      if (confirmation) {
        console.log("Confirm avg player fill");
        setIsSimulating(true);
        setData(generateID);
        console.log(data);
      } else {
        console.log("Denied avg player fill");
      }
    } else {
      console.log("All players assigned");
      setIsSimulating(true);
      setData(generateID);
    }
  };

  useEffect(() => {
    console.log(data, isSimulating);
    if (data !== null && isSimulating === true) {
      runSimulation(data, setResponse, setIsSimulating);
      console.log("runnings");
    }
  }, [data, isSimulating]);

  const handleResize = () => {
    setWindowSize({
      width: "1000px",
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("response is updated");
    console.log(response);
  }, [response]);
  return (
    <Div>
      {window.innerWidth < 700 && (
        <Overlay>
          <i className="fa-solid fa-expand"></i>
          <h1>Who's on First?</h1>
          <p style={{ textAlign: "center" }}>
            Please expand your browser window to use application.
          </p>
        </Overlay>
      )}

      {isPopup && (
        <PopupDiv onClick={handlePopup}>
          <PopupCard onClick={(e) => e.stopPropagation()}>
            <ExitButton
              onClick={handlePopup}
              style={{
                color: "var(--blue)",
                display: "block",
                textAlign: "right",
                paddingRight: "10px",
              }}
            >
              &#x2715;
            </ExitButton>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "80%",
              }}
            >
              <h2
                style={{
                  color: "var(--gray)",
                  textAlign: "center",
                  margin: "0",
                }}
              >
                Welcome to
              </h2>
              <h1
                style={{
                  color: "var(--red)",
                  textAlign: "center",
                  margin: "0",
                }}
              >
                Who's on First?
              </h1>
              <h4
                style={{
                  color: "var(--gray)",
                  textAlign: "center",
                  margin: "0",
                }}
              >
                {" "}
                A Baseball Defense Simulator
              </h4>
              <StepList>
                <StepItem>Create your lineup.</StepItem>
                <StepItem>Simulate Defense with the model.</StepItem>
                <StepItem>View defense evaluation!</StepItem>
              </StepList>{" "}
            </div>
          </PopupCard>
        </PopupDiv>
      )}

      <Nav color="var(--white)" tutorial={true}></Nav>
      <TeamSection>
        <EditButton onClick={enterEditMode} />
        <PlayerButton
          name={globalPlayers.Pitcher.name}
          position="P"
          onClick={() => handlePlayerButton("pitcher")}
          clicked={selectedPlayer == "Pitcher"}
        />
        <PlayerButton
          name={globalPlayers.Catcher.name}
          position="C"
          onClick={() => handlePlayerButton("catcher")}
          clicked={selectedPlayer == "Catcher"}
        />
        <PlayerButton
          name={globalPlayers.First.name}
          position="1B"
          onClick={() => handlePlayerButton("first")}
          clicked={selectedPlayer == "First"}
        />
        <PlayerButton
          name={globalPlayers.Second.name}
          position="2B"
          onClick={() => handlePlayerButton("second")}
          clicked={selectedPlayer == "Second"}
        />
        <PlayerButton
          name={globalPlayers.Third.name}
          position="3B"
          onClick={() => handlePlayerButton("third")}
          clicked={selectedPlayer == "Third"}
        />
        <PlayerButton
          name={globalPlayers.Shortstop.name}
          position="SS"
          onClick={() => handlePlayerButton("shortstop")}
          clicked={selectedPlayer == "Shortstop"}
        />
        <PlayerButton
          name={globalPlayers.Left.name}
          position="LF"
          onClick={() => handlePlayerButton("left")}
          clicked={selectedPlayer == "Left"}
        />
        <PlayerButton
          name={globalPlayers.Center.name}
          position="CF"
          onClick={() => handlePlayerButton("center")}
          clicked={selectedPlayer == "Center"}
        />
        <PlayerButton
          name={globalPlayers.Right.name}
          position="RF"
          onClick={() => handlePlayerButton("right")}
          clicked={selectedPlayer == "Right"}
        />
      </TeamSection>
      {editMode && (
        <EditPanel isShowing={isShowing} title="Edit Mode">
          <ExitButton onClick={exitEditMode}> &#x2715;</ExitButton>
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
          <ExitButton onClick={exitEditMode}>&#x2715;</ExitButton>

          <Section>
            <PlayerInfoCard />
          </Section>
        </EditPanel>
      )}
      <Content>
        <Left onClick={handleExit}>
          <ImgContainer>
            <FieldZoom />
          </ImgContainer>

          <SimButton
            onClick={handleSim}
            isSimulating={isSimulating}
          ></SimButton>
          <div>
            {/*}
            <p
              style={{
                color: "var(--blue)",
                textAlign: "center",
                margin: "15px 5px",
              }}
            >
              Select Players and Simulate the Play.
            </p>*/}
          </div>
        </Left>
      </Content>
      <BgLineContainer>
        <BgLine>
          <Report result={response}></Report>
        </BgLine>
      </BgLineContainer>
    </Div>
  );
}

export default Simulator;

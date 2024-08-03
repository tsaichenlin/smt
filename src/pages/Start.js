import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StartButton = styled(Link)`
  padding: 6px;
  width: 250px;

  background-color: var(--white);
  border: none;
  color: vaR(--red);

  text-align: center;
  text-decoration: none;
  font-weight: 600;

  transition: background-color ease 0.3s, color ease 0.3s;

  &:hover {
    background-color: var(--red);
    color: var(--white);
  }
`;

function Start() {
  const { setIsPopup } = useContext(GlobalContext);
  const handleStart = () => {
    setIsPopup(true);
  };
  return (
    <Container id="start-container">
      <h1>
        Welcome to <span>Baseball Data</span>
      </h1>
      <StartButton onClick={handleStart} id="start-button" to="/sim">
        Get Started!
      </StartButton>
    </Container>
  );
}
export default Start;

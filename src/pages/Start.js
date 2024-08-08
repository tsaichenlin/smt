import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";

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
  color: var(--red);

  text-align: center;
  text-decoration: none;
  font-weight: 600;

  transition: background-color ease 0.3s, color ease 0.3s;

  &:hover {
    background-color: var(--red);
    color: var(--white);
  }
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 50px;
  margin: 0;
  color: var(--red);
`;
const SubTitle = styled.h2`
  font-weight: 500;
  font-size: 20px;
  color: var(--white);
  margin-bottom: 40px;
  margin-top: 0px;
`;
function Start() {
  const { setIsPopup } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleStart = () => {
    setIsPopup(true);
    setTimeout(() => {
      navigate("/sim");
    }, 200);
  };
  return (
    <Container id="start-container">
      <Title>Who's on First?</Title>
      <SubTitle>A Baseball Defense Simulator</SubTitle>
      <StartButton onClick={handleStart} id="start-button">
        Enter
      </StartButton>
    </Container>
  );
}
export default Start;

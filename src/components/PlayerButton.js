import styled from "styled-components";

const Button = styled.button`
  width: 180px;
  height: 50px;
  background-color: var(--gray);
  font-weight: 800;
  padding: 0px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border: solid 0.5px var(--blue);
    box-sizing: border-box;
  }
  p {
    padding: 0;
    margin: 0;
    font-size: 15px;
    text-align: left;
  }
`;

function PlayerButton(props) {
  return (
    <Button onClick={props.onClick}>
      <p style={{ color: "var(--white)" }}>{props.name}</p>
      <p style={{ color: "var(--blue)" }}>{props.position}</p>
    </Button>
  );
}

export default PlayerButton;

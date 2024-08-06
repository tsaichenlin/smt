import styled from "styled-components";

const Button = styled.button`
  width: 180px;
  height: 50px;
  background-color: var(--gray);
  font-weight: 800;
  padding: 0px 15px;
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
    color: var(--white);
  }
  h1 {
    padding: 0;
    margin: 0;
    font-size: 15px;
    text-align: left;
    color: var(--white);
    width: 110px;
    white-space: nowrap;
    overflow: hidden;
  }
  &.clicked {
    background-color: var(--white);
    .name {
      color: var(--red);
    }
  }
`;

function PlayerButton(props) {
  return (
    <Button onClick={props.onClick} className={props.clicked ? "clicked" : ""}>
      <h1 className="name">{props.name}</h1>
      <p style={{ color: "var(--blue)" }}>{props.position}</p>
    </Button>
  );
}

export default PlayerButton;

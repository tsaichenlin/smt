import styled from "styled-components";

const Button = styled.button`
  width: 180px;
  height: 50px;
  background-color: var(--gray);
  font-weight: 500;
  padding: 0px 15px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  letter-spacing: 1px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    border: solid 0.5px var(--gray);
    background-color: var(--dark-gray);
    box-sizing: border-box;
  }
  p {
    padding: 0;
    margin: 0;
    font-size: 15px;
    text-align: left;
    color: var(--blue);
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
    font-weight: 500;
  }
  &.clicked {
    background-color: var(--white);
    .name {
      color: var(--gay);
    }
  }
`;

function PlayerButton(props) {
  return (
    <Button onClick={props.onClick} className={props.clicked ? "clicked" : ""}>
      <h1 className="name">{props.name}</h1>
      <p>{props.position}</p>
    </Button>
  );
}

export default PlayerButton;

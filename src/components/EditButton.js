import styled from "styled-components";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";

const Button = styled.button`
  width: 180px;
  height: 38px;
  background-color: var(--blue);
  color: var(--white);
  font-weight: 500;
  border: none;
  font-size: 15px;
  cursor: pointer;
  border-radius: 20px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--dark-blue);
    box-sizing: border-box;
  }
  &.clicked {
    background-color: var(--dark-blue);
    box-sizing: border-box;
  }
`;

function EditButton(props) {
  const { editMode } = useContext(GlobalContext);
  const { editPlayerMode } = useContext(GlobalContext);
  return (
    <Button
      className={editMode || editPlayerMode ? "clicked" : ""}
      onClick={props.onClick}
    >
      Edit Players
    </Button>
  );
}

export default EditButton;

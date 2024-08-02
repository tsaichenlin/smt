import styled from "styled-components";

const Button = styled.button`
  width: 180px;
  background-color: var(--dark-gray);
  color: var(--blue);
  font-weight: 800;
  border: solid 0.5px var(--gray);
  padding: 8px;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    border: solid 0.5px var(--white-border);
  }
`;

function EditButton(props) {
  return <Button onClick={props.onClick}>Edit All Players</Button>;
}

export default EditButton;

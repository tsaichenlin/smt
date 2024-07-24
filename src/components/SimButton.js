import styled from "styled-components";

const Button = styled.button`
  width: 180px;
  height: 30px;
  background-color: var(--blue);
  color: var(--white);
  font-weight: 800;
  border: none;
  padding: 6px;
  font-size: 15px;

  &:hover {
    border: solid 0.5px var(--white-border);
  }
`;

function SimButton() {
  return <Button>Simulate</Button>;
}

export default SimButton;

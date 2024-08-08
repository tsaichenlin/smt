import styled, { keyframes } from "styled-components";

const underline = keyframes`
 0% {
    width: 0%
 }
  100% {
    width: 100%;
 }
`;
const Button = styled.button`
  width: 200px;
  height: 35px;
  background-color: var(--blue);
  color: var(--white);
  font-weight: 800;
  border: none;
  padding: 6px;
  font-size: 15px;
  position: relative;
  cursor: pointer;
  border-radius: 20px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: var(--dark-blue);
  }

  &::after {
    content: "";
    position: absolute;
    width: 0;
    left: 0;
    height: 5px;
    border-radius: 5px;
    transition: width 0.5s ease;
    background-color: var(--white);
    bottom: -10px;
    z-index: 12;
  }
  &.flashing {
    &::after {
      animation: ${underline} 5s infinite;
    }
  }
`;

function SimButton({ onClick, isSimulating }) {
  return (
    <Button className={isSimulating ? "flashing" : ""} onClick={onClick}>
      Simulate
    </Button>
  );
}

export default SimButton;

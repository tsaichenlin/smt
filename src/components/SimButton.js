import styled, { keyframes } from "styled-components";
import { useState } from "react";

const buttonAnimation = keyframes`
 0% {
    background-color: var(--white);
    color: var(--blue);
 }
  100% {
    background-color: var(--blue);
    color: var(--white);

 }
`;

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

  &:hover {
    border: solid 0.5px var(--white);
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
  }
  &.flashing {
    &::after {
      animation: ${underline} 1.5s infinite;
    }
  }
`;

function SimButton() {
  const [isFlashing, setIsFlashing] = useState(false);

  const handleClick = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 5000);
  };
  return (
    <Button className={isFlashing ? "flashing" : ""} onClick={handleClick}>
      Simulate
    </Button>
  );
}

export default SimButton;

import styled, { keyframes } from "styled-components";
import { useState, useContext } from "react";
import { GlobalContext } from "../GlobalContext";

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
  cursor: pointer;

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
    z-index: 12;
  }
  &.flashing {
    &::after {
      animation: ${underline} 5s infinite;
    }
  }
`;

function SimButton({ onClick, isSimulating }) {
  /*
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 5000);
  };
*/

  return (
    <Button className={isSimulating ? "flashing" : ""} onClick={onClick}>
      Simulate
    </Button>
  );
}

export default SimButton;

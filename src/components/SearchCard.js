import styled from "styled-components";
import photoPlaceHolder from "../images/photoPlaceHolder.webp";
import { useState } from "react";

const Card = styled.div`
  background-color: var(--dark-blue);
  display: flex;
  width: 100%;
  min-width: 350px;
  align-items: top;
  box-sizing: border-box;
  padding: 10px;
  justify-content: center;
`;

const InfoDiv = styled.div`
  margin: 0 20px;
  padding: 0;
  color: var(--white);
  overflow: hidden;
  width: 200px;
`;

const Photo = styled.img`
  height: 100px;
  margin: auto 0;
  object-fit: cover;
`;

const Name = styled.h1`
  font-size: 18px;
  margin: 0;
`;

const Info = styled.p`
  font-size: 13px;
  margin: 5px 0;
  padding: 0;
  width: 100%;
`;

const Dropdown = styled.div`
  position: relative;
  overflow: visible;
  margin-left: auto;
`;

const DropdownButton = styled.button`
  width: 120px;
  height: 20px;
  border: none;
  background-color: var(--blue);
  color: var(--white);
  margin-top: 0;
  position: relative;

  &:hover {
    cursor: pointer;
  }
  padding-top: ${(props) => (props.first ? "5px" : "0")};
  padding-bottom: ${(props) => (props.last ? "5px" : "0")};
`;

const DropdownContent = styled.div`
  position: absolute;
  z-index: 1;
  display: ${(props) => (props.show ? "block" : "none")};
  width: 100%;
  background-color: var(--white);
`;
const Option = styled.button`
  font-size: 13px;
  display: block;
  width: 100%;
  z-index: 2;
  border: none;
  height: ${(props) => (props.first || props.last ? "25px" : "20px")};
  text-align: center;
  box-shadow: none;
  color: var(--blue);
  background-color: transparent;

  &:hover {
    cursor: pointer;
    background-color: var(--blue);
    color: var(--white);
  }
`;

function SearchCard({ player }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const generateSecondary = (positions) => {
    if (positions) {
      return positions
        .replace(/\[|\]|'/g, "")
        .split(", ")
        .join(", ");
    } else {
      return "None";
    }
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <Card>
      <Photo src={photoPlaceHolder}></Photo>
      <InfoDiv>
        <Name>{player.first_name + " " + player.last_name}</Name>
        <Info>{"ID: " + player.player_id}</Info>
        <Info>{"Level: " + player.level}</Info>
        <Info>{"Primary Position: " + player.primary_position}</Info>
        <Info>
          {"Secondary Position: " +
            generateSecondary(player.secondary_position)}
        </Info>
        <Info>{"Run Value: " + Math.round(player.run_value * 100) / 100}</Info>
      </InfoDiv>
      <Dropdown onMouseLeave={handleMouseLeave}>
        <DropdownButton onClick={toggleDropdown}>Select</DropdownButton>
        <DropdownContent show={dropdownOpen}>
          <Option first>Pitcher</Option>
          <Option>Catcher</Option>
          <Option>1st Base</Option>
          <Option>2nd Base</Option>
          <Option>3rd Base</Option>
          <Option>Shortstop</Option>
          <Option>Left Field</Option>
          <Option>Center Field</Option>
          <Option last>Right Field</Option>
        </DropdownContent>
      </Dropdown>
    </Card>
  );
}

export default SearchCard;

/* <h2>{player.player_id}</h2>
      <h2>{player.level}</h2>
      <h2>{player.primary_position}</h2>
      <h2>{player.secondary_position}</h2>
      <h2>{player.run_value}</h2>*/

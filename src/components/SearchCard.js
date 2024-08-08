import styled from "styled-components";
import photoPlaceholder from "../images/photoPlaceholder.png";
import { useState, useContext } from "react";
import { GlobalContext } from "../GlobalContext";

const Card = styled.div`
  background-color: var(--dark-blue);
  display: flex;
  width: 100%;
  min-width: 350px;
  align-items: top;
  box-sizing: border-box;
  padding: 10px;
  justify-content: center;
  border-radius: 20px;
`;

const InfoDiv = styled.div`
  margin: 0 20px;
  padding: 0;
  color: var(--white);
  overflow: hidden;
  width: 250px;
`;

const Photo = styled.img`
  height: 150px;
  margin: auto 0;
  object-fit: cover;
  border-radius: 16px;
`;

const Name = styled.h1`
  font-size: 18px;
  margin: 0;
`;

const Info = styled.p`
  font-size: 15px;
  margin: 5px 0;
  padding: 0;
  width: 100%;
  box-sizing: border-box;

  span {
    color: var(--transparent-white);
  }
`;

const Dropdown = styled.div`
  position: relative;
  overflow: visible;
  margin-left: auto;
`;

const DropdownButton = styled.button`
  width: 120px;
  height: 30px;
  border-radius: 20px;
  border: none;
  background-color: var(--blue);
  color: var(--white);
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 15px;
  position: relative;
  transition: border-radius 0.3s ease;

  &:hover {
    cursor: pointer;
  }
  padding-top: ${(props) => (props.first ? "5px" : "0")};
  padding-bottom: ${(props) => (props.last ? "5px" : "0")};

  &.clicked {
    border-radius: 10px 10px 0 0;
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  border-radius: 0 0 10px 10px;
  z-index: 1;
  width: 100%;
  background-color: var(--white);
  opacity: ${(props) => (props.show ? "1" : "0")};
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  overflow: hidden;
`;
const Option = styled.button`
  font-size: 13px;
  display: block;
  width: 100%;
  z-index: 2;
  border: none;
  height: 25px;
  text-align: center;
  box-shadow: none;
  color: var(--blue);
  background-color: transparent;

  &:hover {
    cursor: pointer;
    background-color: var(--blue);
    color: var(--white);
  }
  &:first-child,
  :last-child {
    padding-top: 5px;
  }
`;

function SearchCard({ player }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { globalPlayers, setGlobalPlayers } = useContext(GlobalContext);

  const generateSecondary = (positions) => {
    if (positions) {
      return positions
        .replace(/\[|\]|'/g, "")
        .split(", ")
        .map((position) =>
          position
            .split("_")
            .map(
              (word) => word.charAt(0).toUpperCase() + word.slice(1) // Capitalize each word
            )
            .join(" ")
        )
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

  const handleSelectPlayer = (position) => () => {
    const playerName = player.first_name + " " + player.last_name;
    setGlobalPlayers((prevPlayers) => ({
      ...prevPlayers,
      [position]: { name: playerName, id: player.player_id },
    }));
  };
  const formatPrimary = (pos) => {
    if (typeof pos === "string") {
      return pos
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(" ");
    }
  };
  return (
    <Card>
      <Photo src={photoPlaceholder}></Photo>
      <InfoDiv>
        <Name>{player.first_name + " " + player.last_name}</Name>
        <Info>
          <span>ID: </span>
          {player.player_id}
        </Info>
        <Info>
          {" "}
          <span>Level: </span>
          {player.level}
        </Info>
        <Info>
          {" "}
          <span>Primary: </span>
          {formatPrimary(player.primary_position)}
        </Info>
        <Info>
          <span>Secondary: </span>
          {generateSecondary(player.secondary_position)}
        </Info>
        <Info>
          {" "}
          <span>RVv: </span>
          {Math.round(player.run_value * 100) / 100}
        </Info>
      </InfoDiv>
      <Dropdown onMouseLeave={handleMouseLeave}>
        <DropdownButton
          onClick={toggleDropdown}
          className={dropdownOpen ? "clicked" : ""}
        >
          Select
        </DropdownButton>
        <DropdownContent show={dropdownOpen}>
          <Option onClick={handleSelectPlayer("Pitcher")}>Pitcher</Option>
          <Option onClick={handleSelectPlayer("Catcher")}>Catcher</Option>
          <Option onClick={handleSelectPlayer("First")}>1st Base</Option>
          <Option onClick={handleSelectPlayer("Second")}>2nd Base</Option>
          <Option onClick={handleSelectPlayer("Third")}>3rd Base</Option>
          <Option onClick={handleSelectPlayer("Shortstop")}>Shortstop</Option>
          <Option onClick={handleSelectPlayer("Left")}>Left Field</Option>
          <Option onClick={handleSelectPlayer("Center")}>Center Field</Option>
          <Option onClick={handleSelectPlayer("Right")} last>
            Right Field
          </Option>
        </DropdownContent>
      </Dropdown>
    </Card>
  );
}

export default SearchCard;

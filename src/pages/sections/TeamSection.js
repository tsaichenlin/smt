import EditButton from "../../components/EditButton";
import PlayerButton from "../../components/PlayerButton";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
`;
function TeamSection() {
  return (
    <Content>
      <EditButton />
      <PlayerButton name="Player 1" position="C" />
      <PlayerButton name="Player 2" position="1B" />
      <PlayerButton name="Player 3" position="2B" />
      <PlayerButton name="Player 4" position="3B" />
      <PlayerButton name="Player 5" position="SS" />
      <PlayerButton name="Player 6" position="LF" />
      <PlayerButton name="Player 7" position="RF" />
      <PlayerButton name="Player 8" position="CF" />
      <PlayerButton name="Player 9" position="??" />
    </Content>
  );
}

export default TeamSection;

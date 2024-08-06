import styled from "styled-components";
const Container = styled.div`
  padding: 10px 50px;
  box-sizing: border-box;
  padding-right: 30px;
  height: 630px;
`;
const Title = styled.h2`
  color: var(--white);
  font-weight: 500;
  font-size: 30px;
  margin-bottom: 8px;
`;

const Players = styled.h2`
  color: ${(props) => props.color};
  font-weight: 300;
  font-size: 18px;
  margin: 5px 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: var(--white);
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  margin-bottom: 25px;
  border-top: 0;
`;

export const Tr = styled.tr`
  font-weight: 200;
  box-sizing: border-box;
  border: 2px solid var(--gray);
  padding: 20px;
  box-sizing: border-box;
  &:nth-child(even) {
    background-color: var(--table-accent);
    .td {
      border: none;
    }
  }
`;
const Th = styled.th`
  width: 19%;
  font-size: 14px;
  box-sizing: border-box;
  padding: 10px;
  color: var(--blue);
  background-color: var(--gray);
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--gray);
`;

const Td = styled.td`
  border: 0;
  padding: 5px 10px;
  font-size: 15px;
  &.data {
    text-align: right;
  }
  box-sizing: border-box;
`;

const ScrollSection = styled.div`
  overflow-y: scroll;
  overflow-x: auto;
  max-height: 380px;
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: var(--gray);
    padding: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--white);
    border-radius: 10px;
  }
`;

function Report() {
  return (
    <div>
      <Container>
        <Title>Evaluation Report</Title>
        <div style={{ marginBottom: "20px" }}>
          <Players color="var(--green)">
            Top 3: Player 1, Player 2, Player 3
          </Players>
          <Players color="var(--red)">
            Bottom 3: Player 1, Player 2, Player 3
          </Players>
        </div>
        <Table>
          <thead>
            <Th>Expected Lineup RV:</Th>
            <Th>Expected Lineup RVv:</Th>
          </thead>
          <tbody>
            <Tr>
              <Td>+2.1</Td>
              <Td>+1.8</Td>
            </Tr>
          </tbody>
        </Table>
        <ScrollSection>
          <Table>
            <thead>
              <Th>Player</Th>
              <Th>Position</Th>
              <Th>Expected RV</Th>
              <Th>Expected RVv</Th>
              <Th>RV Difference</Th>
            </thead>
            <tbody>
              <Tr>
                <Td>Player Name Here</Td>
                <Td>Right Field</Td>
                <Td>+0.2</Td>
                <Td>+0.3</Td>
                <Td>+0.1</Td>
              </Tr>
              <Tr>
                <Td>Player Name Here</Td>
                <Td>Right Field</Td>
                <Td>+0.2</Td>
                <Td>+0.3</Td>
                <Td>+0.1</Td>
              </Tr>
              <Tr>
                <Td>Player Name Here</Td>
                <Td>Right Field</Td>
                <Td>+0.2</Td>
                <Td>+0.3</Td>
                <Td>+0.1</Td>
              </Tr>
              <Tr>
                <Td>Player Name Here</Td>
                <Td>Right Field</Td>
                <Td>+0.2</Td>
                <Td>+0.3</Td>
                <Td>+0.1</Td>
              </Tr>
              <Tr>
                <Td>Player Name Here</Td>
                <Td>Right Field</Td>
                <Td>+0.2</Td>
                <Td>+0.3</Td>
                <Td>+0.1</Td>
              </Tr>
              <Tr>
                <Td>Player Name Here</Td>
                <Td>Right Field</Td>
                <Td>+0.2</Td>
                <Td>+0.3</Td>
                <Td>+0.1</Td>
              </Tr>
              <Tr>
                <Td>Player Name Here</Td>
                <Td>Right Field</Td>
                <Td>+0.2</Td>
                <Td>+0.3</Td>
                <Td>+0.1</Td>
              </Tr>
              <Tr>
                <Td>Player Name Here</Td>
                <Td>Right Field</Td>
                <Td>+0.2</Td>
                <Td>+0.3</Td>
                <Td>+0.1</Td>
              </Tr>
              <Tr>
                <Td>Player Name Here</Td>
                <Td>Right Field</Td>
                <Td>+0.2</Td>
                <Td>+0.3</Td>
                <Td>+0.1</Td>
              </Tr>
            </tbody>
          </Table>
        </ScrollSection>
      </Container>
    </div>
  );
}

export default Report;
/*   <tbody>
          {Array(8).fill(null).map((_, index) => (
            <Tr key={index}>
              <Td>Player Name Here</Td>
              <Td>Right Field</Td>
              <Td>+0.2</Td>
              <Td>+0.3</Td>
              <Td>+0.1</Td>
            </Tr>
          ))}
        </tbody>*/

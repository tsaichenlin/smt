import "./components.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 30px;

  h
  color: var(--red);
`;

function Nav() {
  return (
    <Container>
      <h1>Baseball Data</h1>
      <Link>How It Works</Link>
      <Link>About</Link>
    </Container>
  );
}

export default Nav;

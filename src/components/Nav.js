import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 0px 30px;
`;

const LinkContainer = styled(Container)`
  margin: 0px;
  gap: 20px;
  font-weight: 600;
`;

const NavLink = styled(Link)`
  color: var(--white);
  text-decoration: none;
`;

function Nav() {
  return (
    <Container>
      <Link to="/sim" style={{ textDecoration: "none" }}>
        <h1>Baseball Data</h1>
      </Link>
      <LinkContainer>
        <NavLink to="/how">How It Works</NavLink>
        <NavLink to="/about">About</NavLink>
      </LinkContainer>
    </Container>
  );
}

export default Nav;

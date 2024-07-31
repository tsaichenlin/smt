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
  font-weight: 500;
`;

const Title = styled.h1`
  font-weight: 500;
`;

function Nav(props) {
  return (
    <Container>
      <Link to="/sim" style={{ textDecoration: "none" }}>
        <Title style={{ color: props.color }}>Baseball Data</Title>
      </Link>
      <LinkContainer>
        <NavLink to="/how" style={{ color: props.color }}>
          How It Works
        </NavLink>
        <NavLink to="/about" style={{ color: props.color }}>
          About
        </NavLink>
      </LinkContainer>
    </Container>
  );
}

export default Nav;

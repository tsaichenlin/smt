import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

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
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 0;
    height: 1.5px;
    background-color: var(--hover);
    transition: width 0.5s ease;
  }
  &:hover::after {
    width: 100%;
  }
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
        <NavLink
          to="/how"
          style={{ color: props.color, "--hover": props.color }}
        >
          How It Works
        </NavLink>
        <NavLink
          to="/about"
          style={{ color: props.color, "--hover": props.color }}
        >
          About
        </NavLink>
      </LinkContainer>
    </Container>
  );
}

export default Nav;

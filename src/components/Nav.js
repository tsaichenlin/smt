import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 0px 30px;
  flex-wrap: nowrap;
`;

const LinkContainer = styled(Container)`
  margin: 0px;
  gap: 20px;
  font-weight: 600;
  displau: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: var(--white);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  font-size: 18px;
  white-space: nowrap;

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
  display: inline-block;
  margin-right: 14px;
  font-size: 35px;
  white-space: nowrap;
  margin-bottom: 0;
`;

const HowIcon = styled.div`
  display: inline-block;
  font-weight: 500;
  font-size: 18px;
  color: var(--white);
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  visibility: hidden;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 0;
    height: 1.5px;
    background-color: var(--blue);
    transition: width 0.5s ease;
  }
  &:hover::after {
    width: 100%;
  }
  &.show {
    visibility: visible;
  }
`;
const P = styled.p`
  color: var(--blue);
  font-weight: 500;
  margin: 0;
  font-size: 20px;
`;
function Nav(props) {
  const { setIsPopup } = useContext(GlobalContext);
  return (
    <Container>
      <div>
        <Link to="/sim" style={{ textDecoration: "none" }}>
          <Title style={{ color: props.color }}>Who's on First?</Title>
        </Link>
        <P>Baseball Simulator</P>
      </div>
      <LinkContainer>
        <HowIcon
          className={props.tutorial ? "show" : ""}
          style={{ color: "var(--blue)" }}
          onClick={() => {
            setIsPopup(true);
          }}
        >
          Tutorial
        </HowIcon>
        <NavLink
          to="/how"
          style={{ color: props.color, "--hover": props.color }}
        >
          How It Works
        </NavLink>
      </LinkContainer>
    </Container>
  );
}

export default Nav;
/*  <NavLink
          to="/about"
          style={{ color: props.color, "--hover": props.color }}
        >
          About
        </NavLink>*/

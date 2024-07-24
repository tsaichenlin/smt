import Nav from "../components/Nav";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  justify-content: center;
`;

function About() {
  return (
    <div>
      <Nav />
      <Content>
        <h1>Meet the Team</h1>
      </Content>
    </div>
  );
}
export default About;

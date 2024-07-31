import Nav from "../components/Nav";
import styled from "styled-components";
import fullField from "../images/fullField.png";

const Div = styled.div`
  background-color: var(--dark-gray);
  min-height: 100vh;
  min-width: 100vw;
  overflow: hidden;
  position: relative;
`;
const Content = styled.div`
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  flex-direction: column;
  overflow: hidden;
`;
const Title = styled.h1`
  font-weight: 400;
  margin: 0;
  font-size: 50px;
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 10%;
`;

const P = styled.p`
  color: var(--white);
  font-size: 15px;
  font-weight: 300;
  letter-spacing: 0.6px;
  line-height: 1.5;
`;

const Img = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(10px, 10px) rotate(-135deg);
  object-fit: contain;
  opacity: 0.1;
  scale: 1.7;
`;

const TeamSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Card = styled.div`
  margin: 20px 0px;
  display: flex;
  width: 300px;
`;
const Name = styled(Title)`
  font-size: 30px;
  color: var(--blue);
`;
function About() {
  return (
    <Div>
      <Img src={fullField}></Img>

      <div style={{ position: "relative", overflow: "hidden" }}>
        <Nav color="var(--blue)" />
        <Content>
          <Section>
            <Title>ABOUT US.</Title>
            <P>
              We are two computer science students from Santa Clara University,
              each bringing our unique passions and strengths. This project is a
              product of our teamwork and highlights our technical skills. Thank
              you for taking the time to explore our work!
            </P>
          </Section>
          <Section>
            <Title>THE TEAM.</Title>
            <TeamSection>
              <Card>
                <Name>Jared Maeyama</Name>
              </Card>
              <Card>
                <Name>Mandy Lin</Name>
              </Card>
            </TeamSection>
          </Section>
        </Content>
      </div>
    </Div>
  );
}
export default About;

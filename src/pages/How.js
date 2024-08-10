import Nav from "../components/Nav";
import styled from "styled-components";

import stolenbase from "../images/stolenbase.png";
const Title = styled.h1`
  font-weight: 400;
  margin: 0;
  font-size: 40px;
`;
const Img = styled.img`
  width: 50%;
  min-width: 350px;
`;
const Fig = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  flex-direction: column;
`;
const Div = styled.div`
  background-color: var(--dark-gray);
  min-height: 100vh;
  min-width: 90vw;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`;

const Subtitle = styled(Title)`
  font-size: 30px;
  color: var(--blue);
`;
const Para = styled.p`
  color: var(--white);
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 1.3px;
  line-height: 1.5;
  span {
    color: var(--blue);
    font-weight: 600;
  }
`;
const Definitions = styled.p`
  color: var(--white);
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0.6px;
  line-height: 1.5;
  span {
    color: var(--blue);
    font-weight: 600;
  }
  width: 100%;
  margin-bottom: 0;
  min-width: 60%;
  padding-right: auto;
`;
const Word = styled.p`
  color: var(--blue);
  font-weight: 600;
  width: 250px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.6px;
  line-height: 1.5;
  margin-bottom: 0;

}`;
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
  align-items: center;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const Def = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  flex-wrap: nowrap;
  margin: 0;
  width: 100%;
`;

function How() {
  return (
    <Div>
      <Nav color="var(--white)" simulation={true} />
      <Content>
        <Title>Definitions</Title>
        <Def>
          <Word>Player's Expected Run Value (RV):</Word>
          <Definitions>
            Difference in amount of runs given up by a player with the
            <span> selected lineup</span> compared to an average player.
          </Definitions>
        </Def>
        <Def>
          <Word>Player's Expected Run Value Vacuum (RVv):</Word>
          <Definitions>
            Difference in amount of runs given up by a player with an{" "}
            <span> average lineup </span>compared to an average player.
          </Definitions>
        </Def>
        <Def>
          <Word>Player's RV difference (RV-RVv):</Word>
          <Definitions>
            This represents how much additional value a player brings to the
            defense as a whole (as opposed to players in a vacuum).
          </Definitions>
        </Def>
        <Def>
          <Word>Lineup's Expected Run Value (RV):</Word>
          <Definitions>
            Difference in amount of runs given up by the selected lineup
            compared to a lineup of average players.
          </Definitions>
        </Def>

        <Def>
          <Word>Lineup's Expected Run Value Vacuum (RVv):</Word>
          <Definitions>
            The sum of the executed RVv of the players in the selected lineup.
          </Definitions>
        </Def>
        <Def>
          <Word>Lineup's RV difference (RV-RVv):</Word>
          <Definitions>
            If positive players are worth more in the selected lineup than in an
            average lineup. Players can either help or are helped by their
            fellow teammates.
          </Definitions>
        </Def>
      </Content>
      <Content>
        <Title>Methodology</Title>
        <Subtitle>Runs Greater Than Outs</Subtitle>
        <Para>
          The inspiration for our evaluation metric came when I watched players
          not wanting to test Yasiel Puig’s arm as he gunned out more and more
          runners. One play in particular is when instead of trying to go first
          to third on a single to Puig, Brandon Phillips on his way back to
          second he bows to Puig, acknowledging that he doesn’t want to test his
          arm. Though I couldn’t find metrics backing up how a right fielder's
          arm affects runners going from first to third, there is a similar
          phenomenon with stolen base attempts. Yadier Molina’s presence on the
          diamond affected the opposing team's willingness to steal against the
          Cardinals. Molina and players like him should be rewarded not just in
          the runners they throw out but also in how they cripple the run game
          (Figure 1).
        </Para>
        <Fig>
          <Img src={stolenbase}></Img>
          <Para>Figure 1</Para>
        </Fig>
        <Para>
          Our premise for evaluating defense is to look at the resulting
          situation and translate that into runs scored and run expectancy. The
          run expectancy matrix factors in the positions of runners and the
          amount of outs. This allows for our evaluation to give players like
          right fielder credit for not allowing runners to take an extra base.
          An example of this is say there's a runner on first no outs with a
          soft single hit right. The right fielder cuts the ball off quickly and
          holds the runner to second. The expected run matrix says that on
          average with runners on first and second no outs 1.373 runs will
          score. Take that same scenario but the right fielder lets the runner
          advance to third. The expected run matrix says that on average with
          runners on first and third no outs 1.798 runs will score. The expected
          run difference in these two scenarios is 0.425 runs.
        </Para>
        <Para>
          The end goal is similar to UZR and DRS are similar in the aspect that
          we are both translating a player's defense into the amount of runs
          they save. The main difference being is that UZR and DRS break down a
          players defense in terms of if they made the out and other factors
          like if they were able to turn two or prevent a runner from advancing.
          To the best of my knowledge they don't capture the context of the
          amount of outs when a play is made.
        </Para>
        <Para>
          One thing to note is that we decided to only look at batted balls and
          excluding the catcher's specific impacts like pitch framing, and
          caught steals. This would lead the model to undervalue the defense of
          catchers and over project other people's ability to properly field the
          position.
        </Para>
        <Subtitle>Preprocessings</Subtitle>
        <Para>
          In order to make the data usable we needed to extract which players
          are playing which position, the starting situation (where runners are
          and how many outs), and the ball tracking data for plays with a ball
          in play. For ball flight, we track the ball from when it was to either
          bounced or was caught. For calculating the amount of outs, we looked
          at a change of base runners using the following formula.
        </Para>
        <Para
          style={{
            fontStyle: "italic",
            alignItems: "center",
            width: "70%",
            color: "var(--blue)",
            fontWeight: "600",
          }}
        >
          Outs = previous #of baserunners - resulting number of baserunners -
          runs scored +(1 if it was the end of an at bat)
        </Para>
        <Para>
          In the case where there is nobody on and the batter hits a single,
          then it's the end of an at bat and there is one more runner on first.
          Resulting in 0-1-0+1 = o outs made. If a runner tries to steal second
          and gets thrown out, then it would not be the end of an at bat and the
          difference in base runners would be 1 and no runners scored meaning
          one out was made.
        </Para>
        <Subtitle>Model</Subtitle>
        <Para>
          We developed a deep learning model to simulate plays and predict the
          amount of expected runs a lineup would give up. The model is given the
          starting situation (where runners are and how many outs), which
          players are playing each position, and the ball tracking data to
          predict the resulting run expectancy + runs scored during the play .
          To calculate the run value for a player we used the following
          equation.
        </Para>
        <Para
          style={{
            fontStyle: "italic",
            alignItems: "center",
            width: "70%",
            color: "var(--blue)",
            fontWeight: "600",
          }}
        >
          RV for player A = (# of runs given up with average player at position
          - # of runs given up with player A) * run scalar
        </Para>
        <Para>
          This can capture how much a player means to a specific defense. A RV
          of 0 is average and - is below average and + is above average. We also
          created RVv (Run value vacuum) which measures their run value with
          average players. RV-RVv is the difference between a player's RV in a
          specific lineup and RVv. In this, a positive number means that a
          player was worth more runs in the specific lineup than in a lineup up
          of average players. This may indicate that the fielder was able to
          pick up the slack of other players and elevate their game.
        </Para>
        <Para>
          By taking this approach to evaluate players, we can view a player’s
          defense in conjunction with other players.
        </Para>
        <Subtitle>Shortcomings of the approach</Subtitle>
        <Para>
          {" "}
          The shortcomings of our approach are our abilities to calculate the
          amount of runs for a given play and the amount of outs, the inherent
          ability of the model to predict the outcome of a play, and small
          sample sizes when determining a player's value.
        </Para>
        <Para>
          We had to derive whether or not there was an out made and runs scored.
          However, due to errors in the data, there were miscalculations in the
          number of outs and runs in a given play. We decided to throw out
          innings where more than or less than 3 outs were calculated. Throwing
          out plays limited the amount of data available to train the model.
          Access to more data would undoubtedly enhance the model's performance
          and validity of the metric.
        </Para>
        <Para>
          Also, the RE matrix does not take into account the ability of the
          runner. I'm sure we can agree it's far more impressive for a right
          fielder to stop Billy Hamilton from taking the extra base than to stop
          Daniel Vogelbach.
        </Para>
        <Para style={{ marginBottom: "100px" }}>
          We hope that this model can help to shed light on the value of player
          versatility and open doors for players who are blocked at the next
          level.
        </Para>
      </Content>
    </Div>
  );
}
export default How;

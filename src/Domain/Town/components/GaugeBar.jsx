import styled from "styled-components";
import gauge from "../../../assets/town/gauge.png";

const ProgressContainer = styled.div`
  position: absolute;
  margin-top: 1.55em;
  width: 98.5%;
  height: 13.2px;
  background-color: white;
  border-radius: 50px;
  overflow: hidden;
  border: none;
  z-index: 1;
`;

const ProgressFill = styled.div`
  background-color: red;
  width: ${({ progress }) => progress}%;
  height: 100%;
  transition: width 0.3s ease-in-out;
`;

const LevelText = styled.div`
  position: absolute;
  top: 2.5px;
  left: 28.5px;
  font-size: 18px;
  font-weight: light;
  color: black;
`;

const ClickText = styled.div`
  cursor: pointer;
  position: absolute;
  top: 5.5px;
  right: 2.5px;
  font-size: 16px;
  font-weight: bold;
  color: black;
`;

const GaugeWrapper = styled.div`
  position: relative;
  width: 90%;
  min-height: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${gauge});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const GaugeBar = ({ value, maxValue, level }) => {
  const progress = Math.floor((value / maxValue) * 100);
  const markers = [5, 10, 15, 20];

  return (
    <GaugeWrapper>
      <LevelText>lv. {level}</LevelText>
      <ClickText>click!</ClickText>
      <ProgressContainer>
        <ProgressFill progress={progress} />
      </ProgressContainer>
    </GaugeWrapper>
  );
};

export default GaugeBar;

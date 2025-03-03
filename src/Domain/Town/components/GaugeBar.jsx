import styled from "styled-components";
import gauge from "../../../assets/town/gauge.png";

const ProgressContainer = styled.div`
  position: absolute;
  margin-top: 1.6em;
  width: 98.5%;
  height: 14.5px;
  background-color: transparent;
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
  top: 5px;
  right: 0px;
  font-size: 18px;
  font-weight: bold;
  color: black;
  border-radius: 5px;
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
      <LevelText>Lv. {level}</LevelText>
      <ProgressContainer>
        <ProgressFill progress={progress} />
      </ProgressContainer>
    </GaugeWrapper>
  );
};

export default GaugeBar;

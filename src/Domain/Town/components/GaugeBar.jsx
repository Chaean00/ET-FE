import styled from "styled-components";

const ProgressContainer = styled.div`
  position: relative;
  width: 100%;
  height: 16px;
  background-color: white;
  border-radius: 30px;
  overflow: hidden;
  border: none;
  z-index: 1;
`;

const ProgressFill = styled.div`
  background-color: yellow;
  width: ${({ progress }) => progress}%;
  height: 100%;
  transition: width 0.3s ease-in-out;
`;

const Marker = styled.div`
  position: absolute;
  top: 1px;
  transform: translateX(-50%);
  width: 25px;
  height: 25px;
  background-color: yellow;
  color: white;
  font-size: 15px;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
  z-index: 3;
`;

const GaugeWrapper = styled.div`
  position: relative;
  width: 300px;
  min-height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const GaugeBar = ({ value, maxValue }) => {
  const progress = Math.floor((value / maxValue) * 100);
  const markers = [5, 10, 15, 20];

  return (
    <GaugeWrapper>
      {markers.map((mark, index) => (
        <Marker key={index} style={{ left: `${(mark / maxValue) * 100}%` }}>
          {mark}
        </Marker>
      ))}
      <ProgressContainer>
        <ProgressFill progress={progress} />
      </ProgressContainer>
    </GaugeWrapper>
  );
};

export default GaugeBar;

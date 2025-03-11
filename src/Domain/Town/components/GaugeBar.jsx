import { useState } from "react";
import styled from "styled-components";
import gauge from "../../../assets/town/gauge.png";
import PetAcqModal from "../components/PetAcqModal";

const ProgressContainer = styled.div`
  position: absolute;
  margin-top: 1.7em;
  width: 98.5%;
  height: 13px;
  background-color: white;
  border-radius: 50px;
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

const LevelText = styled.div`
  position: absolute;
  top: 2.5px;
  left: 28.5px;
  font-size: 18px;
  font-weight: light;
  color: black;
`;

const ClickText = styled.div`
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
  position: absolute;
  top: 5.5px;
  right: 2.5px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ clickable }) =>
    clickable ? "black" : "rgb(255,255,255); opacity : 0.45"};
  pointer-events: ${({ clickable }) => (clickable ? "auto" : "none")};
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
  const isClickable = value == maxValue;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <GaugeWrapper>
      {isModalOpen && (
        <PetAcqModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <LevelText>lv. {level}</LevelText>
      <ClickText clickable={isClickable} onClick={() => setIsModalOpen(true)}>
        click!
      </ClickText>
      <ProgressContainer>
        <ProgressFill progress={progress} />
      </ProgressContainer>
    </GaugeWrapper>
  );
};

export default GaugeBar;

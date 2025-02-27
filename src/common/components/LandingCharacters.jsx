import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import cow from "../../assets/animals/cow.png";
import dragon from "../../assets/animals/dragon.png";
import monkey from "../../assets/animals/monkey.png";
import human from "../../assets/animals/human.png";
import rabbit from "../../assets/animals/rabbit.png";
import siba from "../../assets/animals/siba.png";
import tiger from "../../assets/animals/tiger.png";

const characterImages = [tiger, cow, dragon, monkey, human, rabbit, siba];

export default function ZigzagWalkingImages() {
  const [charList, setCharList] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const START_X = isMobile ? window.innerWidth + 50 : window.innerWidth * 0.25;
  const BASE_Y = isMobile
    ? window.innerHeight * 0.82
    : window.innerHeight * 0.76;
  const ZIGZAG_OFFSET = 40;

  useEffect(() => {
    const newChars = Array.from({ length: characterImages.length }).map(
      (_, index) => ({
        id: Math.random(),
        img: characterImages[index],
        y: BASE_Y + (index % 2 === 0 ? ZIGZAG_OFFSET : -ZIGZAG_OFFSET),
        delay: index * 0.85,
      })
    );
    setCharList(newChars);
  }, [isMobile]);

  return (
    <div className="fixed inset-0">
      {charList.map(({ id, img, y, delay }) => (
        <ZigzagWalkingCharacter
          key={id}
          img={img}
          y={y}
          delay={delay}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}

function ZigzagWalkingCharacter({ img, y, delay, isMobile }) {
  return (
    <motion.img
      src={img}
      className="absolute"
      style={{
        width: "auto",
        height: "60px",
        maxWidth: "80px",
        maxHeight: "80px",
        objectFit: "contain",
        top: y,
      }}
      initial={{
        x: isMobile ? window.innerWidth + 50 : window.innerWidth * 0.25,
      }}
      animate={{ x: -100 }}
      transition={{
        duration: isMobile ? 5.8 : 5.2,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
    />
  );
}

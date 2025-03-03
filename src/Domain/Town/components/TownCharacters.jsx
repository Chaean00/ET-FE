import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import cow from "../../../assets/animals/cow.png";
import dragon from "../../../assets/animals/dragon.png";
import monkey from "../../../assets/animals/monkey.png";
import rabbit from "../../../assets/animals/rabbit.png";
import siba from "../../../assets/animals/siba.png";
import tiger from "../../../assets/animals/tiger.png";
import chicken from "../../../assets/animals/chicken.png";
import cat from "../../../assets/animals/cat.png";
import horse from "../../../assets/animals/horse.png";
import pig from "../../../assets/animals/pig.png";
import tomato from "../../../assets/animals/tomato.png";

const characterImages = [
  cow,
  dragon,
  monkey,
  rabbit,
  siba,
  tiger,
  chicken,
  horse,
  pig,
  cat,
  tomato,
];

const getRandomPosition = () => {
  const container = document.querySelector(".townbg");
  if (!container) return { x: 0, y: 0 };

  const maxWidth = container.clientWidth - 5;
  const maxHeight = container.clientHeight - 5;

  return {
    x: Math.max(0, Math.random() * maxWidth),
    y: Math.max(0, Math.random() * maxHeight),
  };
};

export default function TownCharacters() {
  const [charList, setCharList] = useState([]);

  useEffect(() => {
    const count = Math.floor(Math.random() * 6) + 8;
    const newChars = Array.from({ length: count }).map(() => ({
      id: Math.random(),
      image:
        characterImages[Math.floor(Math.random() * characterImages.length)],
      position: getRandomPosition(),
    }));
    setCharList(newChars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {charList.map(({ id, image, position }) => (
        <TownCharacter key={id} image={image} startPos={position} />
      ))}
    </div>
  );
}

function TownCharacter({ image, startPos }) {
  const [position, setPosition] = useState(startPos);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(getRandomPosition());
    }, 2000 + Math.random() * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute"
      animate={{ x: position.x, y: position.y }}
      transition={{ duration: 4, ease: "easeInOut" }}
    >
      <img src={image} alt="character" className="w-16 h-16" />
    </motion.div>
  );
}

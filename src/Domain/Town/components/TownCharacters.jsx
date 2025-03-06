import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getPets } from "../../../utils/pets";

import cat from "../../../assets/animals/cat.png";
import chicken from "../../../assets/animals/chicken.png";
import cow from "../../../assets/animals/cow.png";
import dragon from "../../../assets/animals/dragon.png";
import horse from "../../../assets/animals/horse.png";
import monkey from "../../../assets/animals/monkey.png";
import pig from "../../../assets/animals/pig.png";
import rabbit from "../../../assets/animals/rabbit.png";
import siba from "../../../assets/animals/siba.png";
import tiger from "../../../assets/animals/tiger.png";

const initialCharList = [
  { id: 1, image: cat, position: { x: 50, y: 50 } },
  { id: 2, image: chicken, position: { x: 100, y: 200 } },
  { id: 3, image: cow, position: { x: 300, y: 150 } },
  { id: 4, image: dragon, position: { x: 250, y: 350 } },
  { id: 5, image: horse, position: { x: 400, y: 100 } },
  { id: 6, image: monkey, position: { x: 150, y: 250 } },
  { id: 7, image: pig, position: { x: 350, y: 300 } },
  { id: 8, image: rabbit, position: { x: 200, y: 50 } },
  { id: 9, image: siba, position: { x: 450, y: 200 } },
  { id: 10, image: tiger, position: { x: 500, y: 400 } },
];

export default function TownCharacters() {
  // const [charList, setCharList] = useState(initialCharList);
  const [charList, setCharList] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const pets = await getPets();
        const newChars = pets.map((pet) => ({
          id: pet.pet_id,
          image: pet.image_url,
          position: getRandomPosition(),
        }));
        setCharList(newChars);
      } catch (error) {
        console.error("펫 데이터 불러오기 실패:", error);
      }
    };
    fetchPets();
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

function getRandomPosition() {
  const container = document.querySelector(".townbg");
  if (!container) return { x: 0, y: 0 };

  const maxWidth = container.clientWidth - 5;
  const maxHeight = container.clientHeight - 5;

  return {
    x: Math.max(0, Math.random() * maxWidth),
    y: Math.max(0, Math.random() * maxHeight),
  };
}

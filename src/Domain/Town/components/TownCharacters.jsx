import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TownCharacters({ charList }) {
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
      <img src={image} alt="character" className="w-12 h-12" />
    </motion.div>
  );
}

function getRandomPosition() {
  const container = document.querySelector(".townbg");
  if (!container) return { x: 0, y: 0 };

  const maxWidth = container.clientWidth - 50;
  const maxHeight = container.clientHeight - 50;

  return {
    x: Math.max(0, Math.random() * maxWidth),
    y: Math.max(0, Math.random() * maxHeight),
  };
}

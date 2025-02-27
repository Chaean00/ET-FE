import { motion } from "framer-motion";

import egg1 from "../../assets/egg/egg1.png";
import egg2 from "../../assets/egg/egg2.png";
import egg3 from "../../assets/egg/egg3.png";
import egg4 from "../../assets/egg/egg4.png";

const eggs = [
  { src: egg1, left: "5%", top: "3%" },
  { src: egg2, left: "65%", top: "10%" },
  { src: egg3, left: "2%", top: "30%" },
  { src: egg4, left: "60%", top: "40%" },
];

export default function FloatingEggs() {
  return (
    <div className="absolute w-full h-full overflow-hidden">
      {eggs.map((egg, index) => (
        <FloatingEgg key={index} src={egg.src} left={egg.left} top={egg.top} />
      ))}
    </div>
  );
}

function FloatingEgg({ src, left, top }) {
  return (
    <motion.img
      src={src}
      className="absolute w-35 h-35"
      style={{
        left: left,
        top: top,
      }}
      animate={{
        y: ["0%", "20%", "0%"],
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      }}
    />
  );
}

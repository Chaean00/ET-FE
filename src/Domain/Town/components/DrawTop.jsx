import { motion } from "framer-motion";

const DrawTop = ({ point }) => {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="font-town text-6xl font-black text-center"
        style={{
          WebkitTextStroke: "2.2px black",
          WebkitTextFillColor: "yellow",
        }}
        initial={{ scale: 1 }}
        animate={{ scale: [0.8, 1.2, 1] }}
        transition={{ duration: 0.4, ease: "easeInOut", repeat: 2 }}
      >
        알뽑기
      </motion.div>
      <div
        className="font-town mt-2 text-3xl font-black text-center"
        style={{
          WebkitTextStroke: "2px black",
          WebkitTextFillColor: "yellow",
        }}
      >
        {point.toLocaleString()}P
      </div>
    </div>
  );
};

export default DrawTop;

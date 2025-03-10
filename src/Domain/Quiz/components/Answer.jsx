import { motion } from "framer-motion";

const Answer = ({ text, visible }) => {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ x: 200, y: -100, opacity: 0, scale: 0.5, rotate: 0 }}
      animate={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 25 }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 20,
        ease: "easeInOut",
        duration: 0.25,
      }}
      className="absolute top-0 left-1/2 transform -translate-x-1/2"
    >
      <div className="px-6 py-1 rounded-lg text-[44px] font-bold text-red-600">
        {text}
      </div>
    </motion.div>
  );
};

export default Answer;

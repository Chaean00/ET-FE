import { motion } from "framer-motion";
import ShakingEgg from "./ShakingEgg";
import twinkle from "../../../assets/town/twinkle.png";

function EggAcqModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const starVariants = {
    initial: { opacity: 0, scale: 1 },
    animate: {
      opacity: [0, 1, 0],
      scale: [1, 1.3, 1],
      transition: {
        duration: 0.85,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

      <div className="relative bg-white w-50 p-6 rounded-3xl shadow-lg flex flex-col items-center min-h-[200px]">
        <button
          className="absolute top-1 right-3 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="relative mt-5 scale-125">
          <ShakingEgg />

          <motion.img
            src={twinkle}
            alt="star"
            className="absolute -top-2 -left-2 w-7 h-7"
            variants={starVariants}
            initial="initial"
            animate="animate"
          />
          <motion.img
            src={twinkle}
            alt="star"
            className="absolute -top-2 -right-2 w-7 h-7"
            variants={starVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.15 }}
          />
        </div>

        <h2 className="text-blue-700 text-xl font-bold mt-6">알 획득!</h2>
      </div>
    </div>
  );
}

export default EggAcqModal;

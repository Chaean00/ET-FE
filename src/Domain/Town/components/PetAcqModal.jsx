import { motion } from "framer-motion";
import monkey from "../../../assets/animals/human.png";
import heart from "../../../assets/town/heart.png";

function PetAcqModal({ isOpen, onClose, petName }) {
  if (!isOpen) return null;

  const starVariants = {
    initial: { opacity: 0.1, scale: 1, rotate: 0 },
    animate: (i) => ({
      opacity: [1, 0.6],
      scale: [1],
      x: [Math.cos((i / 8) * Math.PI * 2) * 60],
      y: [Math.sin((i / 8) * Math.PI * 2) * 60],
      transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
    }),
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

        <div className="relative w-28 h-28 flex items-center justify-center">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.img
              key={i}
              src={heart}
              alt="heart"
              className="absolute mt-[-5px] w-7 h-7 object-contain"
              style={{
                left: "38%",
                top: "42%",
                transform: "translate(-50%, -50%)",
              }}
              variants={starVariants}
              initial="initial"
              animate="animate"
              custom={i}
            />
          ))}

          <motion.img
            src={monkey}
            alt="animal"
            className="w-20 h-20 object-contain"
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </div>

        <h2 className="text-xl font-bold mt-6">{petName} 획득!</h2>
      </div>
    </div>
  );
}

export default PetAcqModal;

import { motion } from "framer-motion";
import monkey from "../../../assets/animals/monkey.png";

function PetAcqModal({ isOpen, onClose, petName }) {
  if (!isOpen) return null;

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

        <motion.img
          src={monkey}
          alt="펫 이미지"
          className="w-22 h-22 object-contain"
          initial={{ opacity: 0, filter: "blur(5px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        <h2 className="text-xl font-bold mt-4">{petName} 획득!</h2>
      </div>
    </div>
  );
}

export default PetAcqModal;

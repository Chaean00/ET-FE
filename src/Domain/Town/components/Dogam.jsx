import { motion } from "framer-motion";
import dogamframe from "../../../assets/town/dogamframe.png";
import monkey from "../../../assets/animals/monkey1.png";

const Dogam = () => {
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-md mx-auto place-items-center">
      {[...Array(30)].map((_, index) => (
        <div
          key={index}
          className="w-24 h-24 flex items-center justify-center bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${dogamframe})` }}
        >
          <motion.img
            src={monkey}
            className="w-12 h-12 object-contain"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
          />
        </div>
      ))}
    </div>
  );
};
export default Dogam;

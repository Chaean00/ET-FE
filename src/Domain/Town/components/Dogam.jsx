import { motion } from "framer-motion";
import dogamframe from "../../../assets/town/dogamframe.png";

const Dogam = ({ petList = [] }) => {
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-md mx-auto place-items-center">
      {[...Array(30)].map((_, index) => {
        const pet = petList[index];

        return (
          <div
            key={index}
            className="w-24 h-24 flex items-center justify-center bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${dogamframe})` }}
          >
            {pet ? (
              <motion.img
                src={pet.img}
                className="w-11.5 h-11.5 object-contain"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Dogam;

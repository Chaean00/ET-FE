import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import egg from "../../../assets/egg/egg.png";

const ShakingEgg = () => {
  const [isShaking, setIsShaking] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShaking(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const EGG_COUNT = 4;

  const shakeAnimation = isShaking
    ? {
        rotate: [-8, 8, -8],
        x: [-3, 3, -3],
      }
    : {
        rotate: 0,
        x: 0,
      };

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      {[...Array(EGG_COUNT)].map((_, i) => {
        const transitionOptions = isShaking
          ? {
              duration: 0.2,
              repeat: Infinity,
              repeatType: "mirror",
              delay: i * 0.02,
              ease: "easeInOut",
            }
          : {
              duration: 0.1,
              repeat: 0,
              ease: "easeOut",
            };

        return (
          <motion.img
            key={i}
            src={egg}
            alt="egg"
            className="absolute w-14 h-14 scale-120"
            style={{
              opacity: 1 - i * 0.3,
              zIndex: EGG_COUNT - i,
            }}
            initial={{ rotate: -8, x: -3 }}
            animate={shakeAnimation}
            transition={transitionOptions}
          />
        );
      })}
    </div>
  );
};

export default ShakingEgg;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import loading from "../../../assets/tradetown/loading.png";

const LoadingScreen = ({ onFinish }) => {
  const message = "TradeTown으로 이동중...";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(message.slice(0, index + 1));
      index++;
      if (index === message.length) clearInterval(interval);
    }, 150);

    const timer = setTimeout(() => {
      onFinish();
    }, 3300);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className="font-town fixed inset-0 flex items-center justify-center text-white text-xl font-semibold z-[100] bg-cover bg-center"
      style={{ backgroundImage: `url(${loading})` }}
    >
      <motion.p
        className="text-gray-800 text-xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          WebkitTextStroke: "0.3px white",
          textStroke: "0.25px white",
        }}
      >
        {displayedText}
      </motion.p>
    </div>
  );
};

export default LoadingScreen;

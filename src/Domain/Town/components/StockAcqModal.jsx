import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import eggcracked1 from "../../../assets/egg/eggcracked1.png";
import eggcracked2 from "../../../assets/egg/eggcracked2.png";
import eggcracked3 from "../../../assets/egg/eggcracked3.png";
import eggcracked4 from "../../../assets/egg/eggcracked4.png";
import default_img from "../../../assets/trade/default_img.png";

const StockAcqModal = ({
  isOpen,
  onClose,
  stockImg,
  stockName,
  stockAmount,
}) => {
  const [crackStage, setCrackStage] = useState(0);
  const [showText, setShowText] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [imgSrc, setImgSrc] = useState(stockImg || default_img);

  useEffect(() => {
    if (stockImg) {
      setImgSrc(stockImg);
    } else {
      setImgSrc(default_img);
    }
  }, [stockImg]);

  const handleImageError = () => {
    setImgSrc(default_img);
  };

  const handleImageLoad = (e) => {
    if (e.target.naturalWidth === 0) {
      setImgSrc(default_img);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setCrackStage(0);
      setShowText(false);

      const interval = setInterval(() => {
        setCrackStage((prev) => (prev < 3 ? prev + 1 : prev));
      }, 400);

      setTimeout(() => {
        clearInterval(interval);
        setShowText(true);
        setShowLogo(true);
      }, 1200);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const eggImages = [eggcracked1, eggcracked2, eggcracked3, eggcracked4];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

      <motion.div
        className="relative bg-white w-80 h-100 p-6 rounded-3xl shadow-lg flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <button
          className="absolute top-1 right-3 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        {showLogo && (
          <motion.img
            src={imgSrc}
            onError={handleImageError}
            onLoad={handleImageLoad}
            alt="STOCK"
            className="absolute top-24 w-22 h-22 opacity-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75 }}
          />
        )}
        <div className="relative w-40 h-40 flex items-end justify-center">
          <motion.img
            key={crackStage}
            src={eggImages[crackStage]}
            alt="깨지는 알"
            className="absolute bottom-0 object-contain w-40 h-40"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1.2] }}
            transition={{ duration: 0.2, repeat: 2 }}
          />
        </div>

        {showText && (
          <div className="text-center mt-2">
            <h2 className="text-2xl font-bold text-black">{stockName}</h2>
            <p className="text-2xl font-semibold text-black">
              {stockAmount
                .toString()
                .match(/^(\d+(\.\d{0,4})?)/)?.[0]
                .toLocaleString()}
              주 획득<span className="text-red-500">❗</span>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default StockAcqModal;

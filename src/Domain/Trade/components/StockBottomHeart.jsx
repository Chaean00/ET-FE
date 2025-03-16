import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import api from "../../../utils/api";

const StockBottomHeart = ({
  className,
  stockCode,
  isFavorite,
  onToggleFavorite,
}) => {
  const [heart, setHeart] = useState(isFavorite);
  useEffect(() => {
    setHeart(isFavorite);
  }, [isFavorite]);

  const handleHeart = async () => {
    if (!stockCode) {
      return;
    }

    if (!heart) {
      setHeart(true);
      try {
        await api.post("/users/favorite", { stockCode });
        onToggleFavorite(true);
      } catch (error) {
        setHeart(false);
      }
    } else {
      setHeart(false);
      try {
        await api.delete(`/users/favorite/${stockCode}`);
        onToggleFavorite(false);
      } catch (error) {
        setHeart(true);
      }
    }
  };

  return (
    <div
      className={`w-20 h-10 flex items-center justify-center border border-gray-300 rounded-xl cursor-pointer ${className}`}
      onClick={handleHeart}
    >
      {heart ? (
        <AiFillHeart
          color="red"
          size={32}
          className="transition-transform duration-400 ease-in-out scale-100 hover:scale-110"
        />
      ) : (
        <AiOutlineHeart
          size={32}
          className="transition-transform duration-400 ease-in-out scale-100 hover:scale-110"
        />
      )}
    </div>
  );
};

export default StockBottomHeart;

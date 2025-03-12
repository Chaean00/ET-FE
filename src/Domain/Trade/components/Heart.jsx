import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import api from "../../../utils/api";

const Heart = ({ className, stockCode, initialFavorite, onFavoriteChange }) => {
  const [heart, setHeart] = useState(initialFavorite);

  useEffect(() => {
    setHeart(initialFavorite);
  }, [initialFavorite]);

  const handleHeart = async () => {
    if (!stockCode) {
      console.error("Stock code is missing!");
      return;
    }

    if (!heart) {
      setHeart(true);
      try {
        await api.post("/users/favorite", { stockCode });
        onFavoriteChange(stockCode, true);
      } catch (error) {
        console.error("관심 종목 추가 실패:", error);
        setHeart(false);
      }
    } else {
      setHeart(false);
      try {
        await api.delete(`/users/favorite/${stockCode}`);
        onFavoriteChange(stockCode, false);
      } catch (error) {
        console.error("관심 종목 삭제 실패:", error);
        setHeart(true);
      }
    }
  };

  return (
    <div
      className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded-xl cursor-pointer ${className}`}
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

export default Heart;

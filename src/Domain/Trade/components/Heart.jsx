import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Heart = ({ className }) => {
  const [heart, setHeart] = useState(false);

  const handleHeart = () => {
    setHeart(!heart);
  };

  return (
    <div
      className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded-xl cursor-pointer ${className}`}
      onClick={handleHeart}
    >
      {heart ? (
        <AiFillHeart color="red" size={32} />
      ) : (
        <AiOutlineHeart size={32} />
      )}
    </div>
  );
};

export default Heart;

import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

const Heart = () => {
  const [heart, setHeart] = useState(false);

  const handleHeart = () => {
    setHeart(!heart);
  };
  return (
    <div className="border-2" onClick={handleHeart}>
      {heart ? (
        <AiFillHeart color="red" fontSize={"40px"} />
      ) : (
        <AiOutlineHeart fontSize={"40px"} />
      )}
    </div>
  );
};

export default Heart;

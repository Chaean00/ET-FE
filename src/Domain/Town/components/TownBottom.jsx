import { useNavigate } from "react-router-dom";
import draw from "../.././../assets/town/draw.png";
import friend from "../.././../assets/town/friend.png";
import dogam from "../.././../assets/town/dogam.png";

const TownBottom = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-around items-center w-full">
      <div className="cursor-pointer w-16 h-16">
        <img
          src={draw}
          onClick={() => {
            navigate("/egglist");
          }}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="cursor-pointer w-16 h-16">
        <img
          src={friend}
          onClick={() => {
            navigate("/friend");
          }}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="cursor-pointer w-16 h-16">
        <img
          src={dogam}
          onClick={() => {
            navigate("/dogam");
          }}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default TownBottom;

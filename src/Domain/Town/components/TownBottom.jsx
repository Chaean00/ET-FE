import draw from "../.././../assets/town/draw.png";
import friend from "../.././../assets/town/friend.png";
import dogam from "../.././../assets/town/dogam.png";

const TownBottom = () => {
  return (
    <div className="flex justify-around items-center w-full">
      <div className="w-16 h-16">
        <img src={draw} className="w-full h-full object-cover rounded-lg" />
      </div>
      <div className="w-16 h-16">
        <img src={friend} className="w-full h-full object-cover rounded-lg" />
      </div>
      <div className="w-16 h-16">
        <img src={dogam} className="w-full h-full object-cover rounded-lg" />
      </div>
    </div>
  );
};

export default TownBottom;

import { useNavigate } from "react-router-dom";
import Heart from "./Heart";
import Button from "../../../common/components/Button";

const StockBottom = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center space-x-2 w-full">
      <Heart className="w-15 h-15" />

      <div className="flex items-center space-x-1.5">
        <Button
          className="p-4 text-lg"
          variant={"small"}
          color={"blue"}
          onClick={() => navigate("/stocktrade")}
        >
          판매하기
        </Button>

        <Button
          className="p-4 text-lg"
          variant={"small"}
          color={"red"}
          onClick={() => navigate("/stocktrade")}
        >
          구매하기
        </Button>
      </div>
    </div>
  );
};

export default StockBottom;

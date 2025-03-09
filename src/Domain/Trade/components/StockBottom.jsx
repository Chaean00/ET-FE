import { useNavigate } from "react-router-dom";
import Heart from "./Heart";
import Button from "../../../common/components/Button";

const StockBottom = ({ stockId, ownedStocks = [] }) => {
  const navigate = useNavigate();

  const isOwned =
    Array.isArray(ownedStocks) &&
    ownedStocks.some((stock) => String(stock.stockCode) === String(stockId));

  return (
    <div className="px-2 flex items-center justify-center space-x-1 w-full">
      <Heart className="w-15 h-15" />

      <div
        className={`flex items-center w-full justify-center ${
          isOwned ? "space-x-2" : ""
        }`}
      >
        {isOwned ? (
          <>
            <Button
              className="p-4 text-lg rounded-2xl"
              variant={"small"}
              color={"blue"}
              onClick={() => navigate("/stocktrade")}
            >
              판매하기
            </Button>

            <Button
              className="p-4 text-lg rounded-2xl"
              variant={"small"}
              color={"red"}
              onClick={() => navigate("/stocktrade")}
            >
              구매하기
            </Button>
          </>
        ) : (
          <Button
            className="text-lg rounded-2xl w-full py-3.5"
            variant={"large"}
            color={"red"}
            onClick={() => navigate("/stocktrade")}
          >
            구매하기
          </Button>
        )}
      </div>
    </div>
  );
};

export default StockBottom;

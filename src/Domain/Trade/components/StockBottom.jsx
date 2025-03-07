import { useNavigate } from "react-router-dom";
import Heart from "./Heart";
import Button from "../../../common/components/Button";

const StockBottom = ({ stockId, ownedStocks }) => {
  const navigate = useNavigate();

  const isOwned = true;
  // Array.isArray(ownedStocks?.stocks) &&
  // ownedStocks.stocks.some((stock) => stock.stockCode === stockId);

  return (
    <div className="px-2 flex items-center justify-center space-x-2 w-full">
      <Heart className="w-15 h-15" />

      <div
        className={`flex items-center w-full justify-center ${
          isOwned ? "space-x-4.5" : ""
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
            className="text-lg rounded-2xl w-full"
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

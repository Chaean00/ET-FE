import { useNavigate, useSearchParams } from "react-router-dom";
import StockBottomHeart from "./StockBottomHeart";
import Button from "../../../common/components/Button";
import { useState, useEffect } from "react";
import api from "../../../utils/api";

const StockBottom = ({ stockId, ownedStocks = [], currentPrice }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const stockName = searchParams.get("name");

  const [isFavorite, setIsFavorite] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get("/users/favorite");
        if (Array.isArray(response.data)) {
          const isStockFavorite = response.data.some(
            (stock) => stock.stockCode === stockId
          );
          setIsFavorite(isStockFavorite);
        }
      } catch (error) {
        console.error("관심 종목 불러오기 실패:", error);
        setIsFavorite(false);
      }
    };

    if (stockId) {
      fetchFavorites();
    }
  }, [stockId]);

  const handleToggleFavorite = (newFavoriteStatus) => {
    setIsFavorite(newFavoriteStatus);
  };

  const isOwned =
    Array.isArray(ownedStocks) &&
    ownedStocks.some((stock) => String(stock.stockCode) === String(stockId));

  const handleNavigate = (type) => {
    navigate(
      `/stocktrade?code=${stockId}&name=${encodeURIComponent(
        stockName
      )}&price=${currentPrice}&type=${type}`
    );
  };

  return (
    <div className="px-2 flex items-center justify-center space-x-1 w-full">
      {isFavorite === null ? (
        <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-xl bg-gray-200" />
      ) : (
        <StockBottomHeart
          className="w-15 h-15"
          stockCode={stockId}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

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
              onClick={() => handleNavigate("sell")}
            >
              판매하기
            </Button>

            <Button
              className="p-4 text-lg rounded-2xl"
              variant={"small"}
              color={"red"}
              onClick={() => handleNavigate("buy")}
            >
              구매하기
            </Button>
          </>
        ) : (
          <Button
            className="text-lg rounded-2xl w-full py-3"
            variant={"large"}
            color={"red"}
            onClick={() => handleNavigate("buy")}
          >
            구매하기
          </Button>
        )}
      </div>
    </div>
  );
};

export default StockBottom;

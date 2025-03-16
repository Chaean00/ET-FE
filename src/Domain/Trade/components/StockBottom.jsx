import { useNavigate, useSearchParams } from "react-router-dom";
import StockBottomHeart from "./StockBottomHeart";
import Button from "../../../common/components/Button";
import { useState, useEffect } from "react";
import api from "../../../utils/api";

const StockBottom = ({
  stockId,
  ownedStocks = [],
  orders = [],
  closingPrice
}) => {
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
    ownedStocks.some(
      (stock) =>
        String(stock.stockCode) === String(stockId) && Number(stock.amount) >= 1
    );

  const handleNavigate = (type) => {
    if (orders.length < 2) {
      if (closingPrice) {
        navigate(
          `/stocktrade?code=${stockId}&name=${encodeURIComponent(
            stockName
          )}&price=${closingPrice}&type=${type}`
        );
      }
      return;
    }

    const price = type === "buy" ? orders[0].price : orders[1].price;

    navigate(
      `/stocktrade?code=${stockId}&name=${encodeURIComponent(
        stockName
      )}&price=${price}&type=${type}`
    );
  };

  return (
    <div className="flex space-x-3">
      {isFavorite === null ? (
        <div className="w-10 h-10 flex border border-gray-300 rounded-xl bg-gray-200" />
      ) : (
        <StockBottomHeart
          className="w-15 h-15"
          stockCode={stockId}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      <div className={`flex items-center w-full ${isOwned ? "space-x-2" : ""}`}>
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
            className="w-full pl-24 pr-24 text-lg rounded-2xl py-3"
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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import Heart from "../../Trade/components/Heart";
import useSSE from "../../../hooks/useSSE";

const MyInterested = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get("/users/favorite");
        if (Array.isArray(response.data)) {
          const formattedData = response.data.map((stock) => ({
            stockCode: stock.stockCode,
            stockName: stock.stockName,
            currentPrice: null,
            priceChange: null,
            changeRate: null,
            isFavorite: true,
          }));
          setInterests(formattedData);
        }
      } catch (error) {
        console.error("관심 종목 불러오기 실패:", error);
      }
    };

    fetchFavorites();
  }, []);

  const sseData = useSSE("/subscribe/interest-price");

  useEffect(() => {
    if (!sseData) return;

    setInterests((prevInterests) =>
      prevInterests.map((stock) =>
        stock.stockCode === sseData.stockCode
          ? {
              ...stock,
              currentPrice: Number(sseData.currentPrice),
              priceChange: Number(sseData.priceChange),
              changeRate: Number(sseData.changeRate),
            }
          : stock
      )
    );
  }, [sseData]);

  const handleFavoriteChange = (stockCode, isFavorite) => {
    setInterests((prevInterests) =>
      prevInterests.map((stock) =>
        stock.stockCode === stockCode ? { ...stock, isFavorite } : stock
      )
    );
  };

  return (
    <div className="w-full max-w-md p-4">
      <h2 className="text-lg font-bold mb-2">나의 관심종목</h2>

      {interests.length === 0 ? (
        <p className="text-gray-400 text-center">관심 종목이 없습니다.</p>
      ) : (
        interests.map((stock) => (
          <div
            key={stock.stockCode}
            className="bg-white rounded-2xl shadow-md px-4 py-2 flex items-center justify-between mb-2 cursor-pointer transition-transform duration-300 ease-in-out scale-100 hover:scale-102"
            onClick={() =>
              navigate(
                `/stock?code=${stock.stockCode}&name=${encodeURIComponent(
                  stock.stockName
                )}`
              )
            }
          >
            <div>
              <p className="text-sm font-semibold">{stock.stockName}</p>
              <p className="text-sm text-gray-400 font-light">
                {stock.currentPrice
                  ? `${Number(stock.currentPrice).toLocaleString()}원`
                  : "-"}
              </p>
              {stock.priceChange !== null && stock.changeRate !== null && (
                <p
                  className={`text-sm font-medium ${
                    stock.priceChange > 0 ? "text-red-500" : "text-blue-500"
                  }`}
                >
                  {stock.priceChange > 0
                    ? `+${stock.priceChange.toLocaleString()}`
                    : stock.priceChange.toLocaleString()}
                  (
                  {stock.changeRate > 0
                    ? `+${stock.changeRate}`
                    : stock.changeRate}
                  %)
                </p>
              )}
            </div>

            <div
              className="flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart
                className="w-11 h-11"
                stockCode={stock.stockCode}
                initialFavorite={stock.isFavorite}
                onFavoriteChange={handleFavoriteChange}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyInterested;

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
              currentPrice: sseData.currentPrice,
              priceChange: sseData.priceChange,
              changeRate: sseData.changeRate,
            }
          : stock
      )
    );
  }, [sseData]);

  return (
    <div className="w-full max-w-md p-4">
      <h2 className="text-lg font-bold mb-2">나의 관심종목</h2>

      {interests.length === 0 ? (
        <p className="text-gray-400 text-center">관심 종목이 없습니다.</p>
      ) : (
        interests.map((stock) => (
          <div
            key={stock.stockCode}
            className="bg-white rounded-2xl shadow-md px-4 py-2 flex items-center justify-between mb-2"
          >
            <div>
              <p
                className="cursor-pointer transition-transform duration-300 ease-in-out scale-100 hover:scale-102 text-sm font-semibold"
                onClick={() => navigate(`/stock/${stock.stockCode}`)}
              >
                {stock.stockName}
              </p>
              <p className="text-sm text-gray-400 font-light">
                {stock.currentPrice
                  ? `${Number(stock.currentPrice).toLocaleString()}원`
                  : "-"}
              </p>
              {stock.priceChange && (
                <p
                  className={`text-sm font-medium ${
                    stock.priceChange.startsWith("+")
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
                >
                  {stock.priceChange} ({stock.changeRate}%)
                </p>
              )}
            </div>

            <div className="flex items-center">
              <Heart className="w-11 h-11" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyInterested;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSSE from "../../../hooks/useSSE";
import api from "../../../utils/api";

const MyHeld = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [stockPrices, setStockPrices] = useState({});

  const sseData = useSSE("/subscribe/portfolio-price");

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await api.get("/users/stocks");
        setStocks(response.data);
      } catch (error) {
        console.error("Failed to fetch stocks:", error);
      }
    };

    fetchStocks();
  }, []);

  useEffect(() => {
    if (!sseData) return;

    setStockPrices((prevPrices) => ({
      ...prevPrices,
      [sseData.stockCode]: {
        currentPrice: Number(sseData.currentPrice),
        priceChange: sseData.priceChange,
        changeRate: sseData.changeRate,
      },
    }));

    setStocks((prevStocks) =>
      prevStocks.map((stock) => {
        if (stock.stockCode === sseData.stockCode) {
          const currentPrice = Number(sseData.currentPrice);
          const totalValue = stock.amount * currentPrice;
          const purchasePrice = stock.amount * stock.averagePrice;
          const totalReturn =
            ((totalValue - purchasePrice) / purchasePrice) * 100;

          return {
            ...stock,
            totalValue,
            totalReturn: totalReturn.toFixed(2),
          };
        }
        return stock;
      })
    );
  }, [sseData]);

  return (
    <div className="w-full max-w-md p-4">
      <h2 className="text-lg font-bold mb-2">나의 보유상품</h2>

      {stocks.length === 0 ? (
        <p className="font-light text-gray-400 text-center mt-4">
          보유 주식이 없습니다.
        </p>
      ) : (
        <>
          {stocks.slice(0, 3).map((stock) => (
            <StockItem
              key={stock.stockCode}
              stock={stock}
              stockPrices={stockPrices}
              navigate={navigate}
            />
          ))}

          {stocks.length > 3 && (
            <div className="text-center">
              <button
                className="cursor-pointer w-[45%] mt-3 py-1.5 text-gray-400 text-sm font-medium bg-white border-1 rounded-3xl"
                onClick={() => navigate("/mystock")}
              >
                보유상품 더 보기 &gt;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
const StockItem = ({ stock, stockPrices, navigate }) => {
  const priceData = stockPrices[stock.stockCode];

  const priceChange = priceData ? Number(priceData.priceChange) : null;
  const changeRate = priceData ? Number(priceData.changeRate) : null;

  return (
    <div
      className="cursor-pointer transition-transform duration-300 ease-in-out scale-100 hover:scale-102 bg-white rounded-2xl shadow-md p-4 flex items-center space-x-3 mb-2"
      onClick={() =>
        navigate(`/stock?code=${stock.stockCode}&name=${stock.stockName}`)
      }
    >
      <img
        src={stock.stockImage}
        alt={stock.stockName}
        className="rounded-3xl w-10 h-10"
      />

      <div className="flex-1">
        <p className="font-semibold">{stock.stockName}</p>
        <p className="text-gray-400 text-sm font-light">
          현금 {stock.amount}주
        </p>
      </div>

      <div className="text-right">
        <p className="text-md font-bold">
          {priceData ? priceData.currentPrice.toLocaleString() + "원" : "-"}
        </p>

        <p
          className={`text-xs font-medium ${
            priceChange !== null && priceChange < 0
              ? "text-blue-500"
              : "text-red-500"
          }`}
        >
          {priceChange !== null
            ? `${priceChange > 0 ? "+" : ""}${priceChange.toLocaleString()} (${
                changeRate > 0 ? "+" : ""
              }${changeRate.toLocaleString()}%)`
            : "-"}
        </p>
      </div>
    </div>
  );
};

export default MyHeld;

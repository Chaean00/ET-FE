import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSSE from "../../../hooks/useSSE.js";

const MyHeld = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [stockPrices, setStockPrices] = useState({});

  useEffect(() => {
    const dummyStocks = [
      {
        id: "005930",
        name: "삼성전자",
        quantity: 10,
        logo: "https://via.placeholder.com/40",
      },
      {
        id: "000660",
        name: "SK하이닉스",
        quantity: 5,
        logo: "https://via.placeholder.com/40",
      },
      {
        id: "035420",
        name: "네이버",
        quantity: 8,
        logo: "https://via.placeholder.com/40",
      },
    ];
    setStocks(dummyStocks);
  }, []);

  const sseData = useSSE("/subscribe/portfolio-price");

  useEffect(() => {
    if (sseData?.stockCode) {
      setStockPrices((prev) => ({
        ...prev,
        [sseData.stockCode]: {
          currentPrice: sseData.currentPrice,
          priceChange: sseData.priceChange,
          changeRate: sseData.changeRate,
        },
      }));
    }
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
              key={stock.id}
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
  const priceData = stockPrices[stock.id];

  return (
    <div
      className="cursor-pointer transition-transform duration-300 ease-in-out scale-100 hover:scale-102 bg-white rounded-2xl shadow-md p-4 flex items-center space-x-3 mb-2"
      onClick={() => navigate(`/stock?code=${stock.id}&name=${stock.name}`)}
    >
      <img
        src={stock.logo}
        alt={stock.name}
        className="rounded-3xl w-10 h-10"
      />

      <div className="flex-1">
        <p className="font-semibold">{stock.name}</p>
        <p className="text-gray-400 text-sm font-light">
          현금 {stock.quantity}주
        </p>
      </div>

      <div className="text-right">
        <p className="text-md font-bold">
          {priceData ? priceData.currentPrice.toLocaleString() + "원" : "-"}
        </p>
        <p
          className={`text-xs font-medium ${
            priceData?.priceChange?.includes("-")
              ? "text-blue-500"
              : "text-red-500"
          }`}
        >
          {priceData
            ? `${priceData.priceChange} (${priceData.changeRate}%)`
            : "-"}
        </p>
      </div>
    </div>
  );
};

export default MyHeld;

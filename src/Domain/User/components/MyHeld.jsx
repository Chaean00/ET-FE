import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSSE from "../../../hooks/useSSE";
import default_img from "../../../assets/trade/default_img.png";

const MyHeld = ({ heldStocks = [] }) => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState(heldStocks);
  const sseData = useSSE("/subscribe/portfolio-price");

  useEffect(() => {
    if (!sseData) return;

    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.stockCode === sseData.stockCode
          ? {
              ...stock,
              totalValue: Number(sseData.currentPrice) * stock.amount,
              totalReturn:
                stock.averagePrice > 0
                  ? ((Number(sseData.currentPrice) - stock.averagePrice) /
                      stock.averagePrice) *
                    100
                  : 0,
              diffPrice:
                (Number(sseData.currentPrice) - stock.averagePrice) *
                stock.amount,
            }
          : stock
      )
    );
  }, [sseData]);

  return (
    <div className="w-full max-w-md p-4">
      <h2 className="text-lg font-bold mb-2">나의 보유상품</h2>

      {stocks?.length === 0 ? (
        <p className="font-light text-gray-400 text-center mt-4">
          보유 주식이 없습니다.
        </p>
      ) : (
        stocks
          .slice(0, 3)
          .map((stock) => (
            <StockItem
              key={stock.stockCode}
              stock={stock}
              navigate={navigate}
            />
          ))
      )}

      {stocks?.length > 3 && (
        <div className="text-center">
          <button
            className="cursor-pointer w-[45%] mt-3 py-1.5 text-gray-400 text-sm font-medium bg-white border-1 rounded-3xl"
            onClick={() => navigate("/mystock")}
          >
            보유상품 더 보기 &gt;
          </button>
        </div>
      )}
    </div>
  );
};

const StockItem = ({ stock, navigate }) => {
  return (
    <div
      className="cursor-pointer transition-transform duration-300 ease-in-out scale-100 hover:scale-102 bg-white rounded-2xl shadow-md p-4 flex items-center space-x-3 mb-2"
      onClick={() =>
        navigate(`/stock?code=${stock.stockCode}&name=${stock.stockName}`)
      }
    >
      <img
        src={stock.stockImage || default_img}
        alt={stock.stockName}
        className="rounded-3xl w-10 h-10"
      />

      <div className="flex-1">
        <p className="font-semibold">{stock.stockName}</p>
        <p className="text-gray-400 text-sm font-light">
          현금{" "}
          {stock.amount
            ? Number(
                stock.amount.toString().match(/^(\d+(\.\d{0,4})?)/)?.[0] || 0
              ).toLocaleString()
            : "0"}
          주
        </p>
      </div>

      <div className="text-right">
        <p className="text-md font-bold">
          {stock.totalValue
            ? `${Math.round(stock.totalValue).toLocaleString()}원`
            : "-"}
        </p>
        <p
          className={`text-xs font-medium ${
            stock.totalReturn < 0 ? "text-blue-500" : "text-red-500"
          }`}
        >
          {stock.diffPrice > 0 ? "+" : ""}
          {Math.abs(Math.round(stock.diffPrice)).toLocaleString()}원 (
          {stock.totalReturn > 0 ? "+" : ""}
          {stock.totalReturn.toFixed(2)}%)
        </p>
      </div>
    </div>
  );
};

export default MyHeld;
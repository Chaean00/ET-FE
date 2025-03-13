import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSSE from "../../../hooks/useSSE";
import api from "../../../utils/api";

const MyHeld = ({ setTotalAccount, setTotalProfit, setTotalProfitRate }) => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const sseData = useSSE("/subscribe/portfolio-price");

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await api.get("/users/stocks");

        const updatedStocks = response.data.map((stock) => ({
          ...stock,
          totalValue: stock.amount * stock.averagePrice,
          totalReturn: 0,
        }));

        const closingPriceResponse = await api.get(
          "/users/stocks/closing-price"
        );

        const updatedStocksWithClosing = updatedStocks.map((stock) => {
          const closingStock = closingPriceResponse.data.find(
            (s) => s.stockCode === stock.stockCode
          );

          if (closingStock) {
            return {
              ...stock,
              closingPrice: closingStock.closingPrice,
              totalValue: closingStock.closingPrice * stock.amount,
              totalReturn:
                stock.averagePrice > 0
                  ? ((closingStock.closingPrice - stock.averagePrice) /
                      stock.averagePrice) *
                    100
                  : 0,
              diffPrice:
                (closingStock.closingPrice - stock.averagePrice) * stock.amount,
              displayPrice: closingStock.closingPrice,
            };
          }

          return {
            ...stock,
            closingPrice: null,
            totalValue: stock.amount * stock.averagePrice,
            totalReturn: 0,
            diffPrice: 0,
            displayPrice: stock.averagePrice,
          };
        });

        setStocks(updatedStocksWithClosing);
      } catch (error) {
        console.error(
          "데이터 불러오기 실패:",
          error.response?.data || error.message
        );
      }
    };

    fetchStockData();
  }, []);

  useEffect(() => {
    if (!sseData) return;

    setStocks((prevStocks) =>
      prevStocks.map((stock) => {
        if (stock.stockCode === sseData.stockCode) {
          const currentPrice = Number(sseData.currentPrice);
          const totalValue = currentPrice * stock.amount;

          return {
            ...stock,
            totalValue,
            totalReturn:
              stock.averagePrice > 0
                ? ((currentPrice - stock.averagePrice) / stock.averagePrice) *
                  100
                : 0,
            diffPrice: (currentPrice - stock.averagePrice) * stock.amount,
            displayPrice: totalValue,
          };
        }
        return stock;
      })
    );
  }, [sseData]);

  useEffect(() => {
    if (stocks.length === 0) {
      setTotalAccount(0);
      setTotalProfit(0);
      setTotalProfitRate(0);
      return;
    }

    const totalAccountValue = stocks.reduce(
      (acc, stock) => acc + stock.totalValue,
      0
    );
    const totalProfitValue = stocks.reduce(
      (acc, stock) =>
        acc + (stock.totalValue - stock.amount * stock.averagePrice),
      0
    );
    const totalProfitRateValue =
      totalAccountValue > 0
        ? ((totalProfitValue / totalAccountValue) * 100).toFixed(2)
        : 0;

    setTotalAccount(totalAccountValue);
    setTotalProfit(totalProfitValue);
    setTotalProfitRate(totalProfitRateValue);
  }, [stocks, setTotalAccount, setTotalProfit, setTotalProfitRate]);

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

const StockItem = ({ stock, navigate }) => {
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
          {stock.displayPrice
            ? Math.round(stock.displayPrice).toLocaleString() + "원"
            : "-"}
        </p>

        <p
          className={`text-xs font-medium ${
            stock.totalReturn !== undefined && stock.totalReturn < 0
              ? "text-blue-500"
              : "text-red-500"
          }`}
        >
          {stock.diffPrice !== undefined
            ? ` ${stock.diffPrice.toLocaleString()} `
            : "0원 "}
          {stock.totalReturn !== undefined
            ? `(${stock.totalReturn > 0 ? "+" : ""}${stock.totalReturn.toFixed(
                2
              )}%)`
            : "(-)"}
        </p>
      </div>
    </div>
  );
};

export default MyHeld;

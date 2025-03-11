import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSSE from "../../../hooks/useSSE";
import api from "../../../utils/api";

const MyHeld = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [totalAccount, setTotalAccount] = useState(0);  // totalAccount 상태 추가
  const sseData = useSSE("/subscribe/portfolio-price");

  // 주식 데이터 불러오기
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await api.get("/users/stocks");

        const updatedStocks = response.data.map((stock) => ({
          ...stock,
          totalValue: stock.amount * stock.averagePrice,
          totalReturn: 0,
        }));

        // 첫 번째 API 요청 후 stocks 업데이트
        setStocks(updatedStocks);

        // 두 번째 API 요청 (전날 종가 가져와서 값 업데이트)
        const closingPriceResponse = await api.get("/users/stocks/closing-price");

        const updatedStocksWithClosing = updatedStocks.map((stock) => {
          const closingStock = closingPriceResponse.data.find(
            (s) => s.stockCode === stock.stockCode
          );

          if (closingStock) {
            const totalValue = closingStock.closingPrice; // 새로운 총 금액
            const totalReturn =
              ((closingStock.closingPrice - stock.averagePrice) /
                stock.averagePrice) *
              100; // 수익률 계산
            const diffPrice = closingStock.closingPrice - stock.averagePrice;

            return {
              ...stock,
              closingPrice: closingStock.closingPrice,
              totalValue,
              totalReturn: totalReturn.toFixed(2), // 소수점 2자리까지 표시
              diffPrice,
            };
          }

          return stock;
        });

        setStocks(updatedStocksWithClosing);

        // 전체 평가금액 계산
        const totalAccountValue = updatedStocksWithClosing.reduce(
          (acc, stock) => acc + stock.totalValue, 0
        );
        setTotalAccount(totalAccountValue); // 전체 평가금액 상태 업데이트
      } catch (error) {
        console.error("데이터 불러오기 실패:", error.response?.data || error.message);
      }
    };

    fetchStockData();
  }, []);

  // SSE 데이터 처리
  useEffect(() => {
    if (!sseData) return;

    setStocks((prevStocks) =>
      prevStocks.map((stock) => {
        if (stock.stockCode === sseData.stockCode) {
          const currentPrice = Number(sseData.currentPrice);
          const totalValue = currentPrice * stock.amount;
          const purchasePrice = stock.amount * stock.averagePrice;
          const totalReturn =
            ((totalValue - purchasePrice) / purchasePrice) * 100;
          const diffPrice = currentPrice - stock.averagePrice;

          return {
            ...stock,
            totalValue,
            totalReturn: totalReturn.toFixed(2),
            diffPrice,
          };
        }
        return stock;
      })
    );

    // SSE 데이터 업데이트 후 전체 평가금액 계산
    const totalAccountValue = stocks.reduce(
      (acc, stock) => acc + stock.totalValue, 0
    );
    setTotalAccount(totalAccountValue); // 전체 평가금액 상태 업데이트
  }, [sseData, stocks]);

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

      {/* 전체 평가금액 표시 */}
      <div className="mt-4">
        <p className="font-semibold text-lg">전체 평가금액</p>
        <p className="text-xl font-bold">
          {totalAccount.toLocaleString()} 원
        </p>
      </div>
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
          {stock.totalValue ? stock.totalValue.toLocaleString() + "원" : "-"}
        </p>

        <p
          className={`text-xs font-medium ${
            stock.totalReturn !== undefined && stock.totalReturn < 0
              ? "text-blue-500"
              : "text-red-500"
          }`}
        >
          {stock.diffPrice !== undefined
            ? ` ${stock.diffPrice.toLocaleString()}원`
            : "-"}
          {stock.totalReturn !== undefined
            ? `(${stock.totalReturn > 0 ? "+" : ""}${stock.totalReturn}%)`
            : "(-)"}
        </p>
      </div>
    </div>
  );
};

export default MyHeld;
import api from "../../../utils/api";
import useSSE from "../../../hooks/useSSE";
import { useEffect, useState } from "react";

const MyTable = () => {
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

        setStocks(updatedStocks);

        const closingPriceResponse = await api.get(
          "/users/stocks/closing-price"
        );

        const updatedStocksWithClosing = updatedStocks.map((stock) => {
          const closingStock = closingPriceResponse.data.find(
            (s) => s.stockCode === stock.stockCode
          );

          if (closingStock) {
            const totalValue = stock.amount * closingStock.closingPrice;
            const totalReturn =
              ((closingStock.closingPrice - stock.averagePrice) /
                stock.averagePrice) *
              100;

            return {
              ...stock,
              closingPrice: closingStock.closingPrice,
              totalValue,
              totalReturn: totalReturn.toFixed(2),
            };
          }

          return stock;
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
    console.log("sseData:", sseData);
    if (!sseData) return;

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
    <div className="space-y-3 py-5 bg-white p-3 w-full max-w-xs">
      {stocks.length > 0 ? (
        <table className="w-full text-sm text-left">
          <thead>
            <tr>
              <th className="pb-2">종목명</th>
              <th className="pb-2">총 평가금액</th>
              <th className="pb-2">수익률</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index}>
                <td className="py-2">{stock.stockName}</td>
                <td className="py-2">{`${stock.totalValue.toLocaleString()} 원`}</td>
                <td className="py-2 font-bold">
                  <span
                    className={
                      stock.totalReturn >= 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {`${stock.totalReturn}%`}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">보유 주식이 없습니다.</p>
      )}
    </div>
  );
};

export default MyTable;

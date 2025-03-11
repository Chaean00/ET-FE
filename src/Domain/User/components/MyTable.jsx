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
      } catch (error) {
        console.error(
          "테이블 데이터 불러오기 실패:",
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
    <div className="space-y-3 py-5 bg-white p-4 w-full max-w-xs">
      {stocks.length > 0 ? (
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="pb-2">종목명</th>
              <th className="pb-2 text-right">총 평가금액</th>
              <th className="pb-2 text-right">수익률</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{stock.stockName}</td>
                <td className="py-2 text-right">{`${stock.totalValue.toLocaleString()} 원`}</td>
                <td className="py-2 text-right font-bold">
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

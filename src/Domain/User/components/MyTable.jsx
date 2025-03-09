import { useEffect, useState } from "react";
import api from "../../../utils/api";

const MyTable = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await api.get("/users/stocks");
        setStocks(response.data);
      } catch (error) {
        console.error(
          "테이블 데이터 불러오기 실패:",
          error.response?.data || error.message
        );
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className="space-y-3 py-5 bg-white p-4 w-full max-w-xs">
      {stocks.length > 0 ? (
        stocks.map((stock, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-black">{stock.stockName}</span>
            <span className="text-xs text-gray-600">
              {`${(stock.amount * stock.averagePrice).toLocaleString()} 원`}
            </span>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">보유주식이 없습니다.</p>
      )}
    </div>
  );
};

export default MyTable;

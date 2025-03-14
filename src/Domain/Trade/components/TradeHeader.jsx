import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useSSE from "../../../hooks/useSSE";
import api from "../../../utils/api";

const TradeHeader = () => {
  const [searchParams] = useSearchParams();
  const companyName = searchParams.get("name") || "알 수 없음";
  const stockCode = searchParams.get("code");

  const [closingPrice, setClosingPrice] = useState(null);
  const sseData = useSSE(stockCode ? `/cur-price/${stockCode}` : null);

  const currentPrice = sseData ? Number(sseData.currentPrice) : closingPrice;
  const changeRate = sseData ? Number(sseData.changeRate) : null;

  useEffect(() => {
    if (!stockCode) return;

    const fetchClosingPrice = async () => {
      try {
        const response = await api.get(
          `/users/stocks/closing-price/${stockCode}`
        );
        if (response.data && response.data.closingPrice) {
          setClosingPrice(Number(response.data.closingPrice));
        }
      } catch (error) {
        console.error("전날 종가를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchClosingPrice();
  }, [stockCode]);

  const changeColor =
    changeRate >= 0
      ? "text-red-500"
      : changeRate < 0
      ? "text-blue-500"
      : "text-gray-500";

  return (
    <div className="mt-2.5 flex flex-col items-center w-full">
      <p className="text-gray-400 text-md font-light text-center w-full">
        {companyName}
      </p>

      <div className="flex items-end space-x-2">
        <p className="text-md text-gray-800 font-light">
          {currentPrice !== null ? `${currentPrice.toLocaleString()}원` : "-"}
        </p>
        <p className={`text-md font-light ${changeColor}`}>
          {changeRate !== null
            ? `${changeRate > 0 ? "+" : ""}${changeRate.toFixed(2)}%`
            : "0.00%"}
        </p>
      </div>
    </div>
  );
};

export default TradeHeader;

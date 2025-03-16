import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useSSE from "../../../hooks/useSSE";
import api from "../../../utils/api";
import korea from "../../../assets/tradetown/korea.jpg";

const StockInfo = ({ setCurrentPrice, current }) => {
  const [searchParams] = useSearchParams();
  const stockCode = searchParams.get("code");
  const companyName = searchParams.get("name") || "알 수 없음";

  const [closingPrice, setClosingPrice] = useState(null);
  // const sseData = useSSE(stockCode ? `/cur-price/${stockCode}` : null);

  const currentPrice = current ? Number(current.currentPrice) : closingPrice;

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
      }
    };

    fetchClosingPrice();
  }, [stockCode]);

  useEffect(() => {
    if (currentPrice !== null) {
      setCurrentPrice(currentPrice);
    }
  }, [currentPrice, setCurrentPrice]);

  return (
    <div className="items-center space-y-1">
      <div className="flex text-gray-600 text-md">
        {stockCode}
        <img className="ml-1 h-[20px]" src={korea} alt="국기" />
      </div>
      <div>
        <span className="text-3xl font-bold">{companyName}</span>
      </div>

      <div className="text-3xl font-bold">
        {currentPrice !== null ? `${currentPrice.toLocaleString()}원` : "-"}
      </div>
    </div>
  );
};

export default StockInfo;

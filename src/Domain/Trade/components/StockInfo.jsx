import { useSearchParams } from "react-router-dom";
import useSSE from "../../../hooks/useSSE";
import korea from "../../../assets/tradetown/korea.jpg";

const StockInfo = () => {
  const [searchParams] = useSearchParams();
  const stockCode = searchParams.get("code");
  const companyName = searchParams.get("name") || "알 수 없음";

  const sseData = useSSE(stockCode ? `/cur-price/${stockCode}` : null);

  const currentPrice = sseData ? Number(sseData.currentPrice) : null;

  return (
    <div className="items-center space-y-1">
      <div className="flex text-gray-600 text-md">
        {stockCode}
        <img className="ml-1 h-[20px]" src={korea} />
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

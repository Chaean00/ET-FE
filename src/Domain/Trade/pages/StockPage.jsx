import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LineChart from "../components/LineChart";
import Footer from "../../../common/components/Footer";
import BackButton from "../../../common/components/BackButton";
import StockInfo from "../components/StockInfo";
import StockBottom from "../components/StockBottom";
import { BarLoader } from "react-spinners";
import api from "../../../utils/api";

const StockPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [stockInfo, setStockInfo] = useState(null);
  const [ownedStocks, setOwnedStocks] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const stockId = queryParams.get("code");
  const stockName = queryParams.get("name");

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await api.get(`/charts/${stockId}`);
        setStockInfo(response.data);
      } catch (error) {
        console.error("주식 정보 요청 실패:", error);
      }
    };

    const fetchOwnedStocks = async () => {
      try {
        const response = await api.get("/users/stocks");
        setOwnedStocks(response.data);
      } catch (error) {
        console.error("보유 주식 요청 실패:", error);
      }
    };

    fetchStockData();
    fetchOwnedStocks();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, [stockId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <BarLoader height={3} width={195} color="#0046FF" />
        <div className="mt-4 text-xl font-bold text-[#0046FF]">
          {stockName} 차트로 이동 중!
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-4 pt-6 pb-20">
      <div className="w-full max-w-md flex items-center relative">
        <span onClick={() => navigate(-1)} className="absolute left-0">
          <BackButton className="w-8 h-8" />
        </span>
      </div>

      {stockInfo && (
        <>
          <div className="w-full max-w-md mt-10.5 ml-8">
            <StockInfo stockCode={stockId} companyName={stockName} />
          </div>

          <div className="w-full max-w-md mt-6.5 h-[51.5vh] flex justify-center items-center">
            <LineChart stockId={stockId} />
          </div>

          <div className="w-full max-w-md flex justify-center fixed bottom-[65px]">
            <StockBottom stockId={stockId} ownedStocks={ownedStocks} />
          </div>
        </>
      )}

      <Footer className="fixed bottom-0 w-full max-w-md bg-white border-t" />
    </div>
  );
};

export default StockPage;

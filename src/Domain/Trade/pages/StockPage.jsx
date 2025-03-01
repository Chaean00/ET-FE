import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LineChart from "../components/LineChart";
import Footer from "../../../common/components/Footer";
import BackButton from "../../../common/components/BackButton";
import StockInfo from "../components/StockInfo";
import StockBottom from "../components/StockBottom";
import { BarLoader } from "react-spinners";

const StockPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <BarLoader height={3} width={195} color="#0046FF" />
        <div className="mt-4 text-xl font-bold text-[#0046FF]">
          삼성전자로 이동 중!
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

      <div className="w-full max-w-md mt-10.5 ml-8">
        <StockInfo stockCode="005930" companyName="삼성전자" price={57200} />
      </div>

      <div className="w-full max-w-md mt-1.5 h-[51.5vh] flex justify-center items-center">
        <LineChart />
      </div>

      <div className="w-full max-w-md flex justify-center fixed bottom-[65px]">
        <StockBottom />
      </div>

      <Footer className="fixed bottom-0 w-full max-w-md bg-white border-t" />
    </div>
  );
};

export default StockPage;

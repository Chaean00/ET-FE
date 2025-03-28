import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useSSE from "../../../hooks/useSSE";
import LineChart from "../components/LineChart";
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
  const [closingPrice, setClosingPrice] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [orders, setOrders] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const stockId = queryParams.get("code");
  const stockName = queryParams.get("name");

  const { current, askBid } = useSSE("/subscribe", stockId);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await api.get(`/charts/${stockId}`);
        setStockInfo(response.data);
      } catch (error) {
      }
    };

    const fetchOwnedStocks = async () => {
      try {
        const response = await api.get("/users/stocks");
        setOwnedStocks(response.data);
      } catch (error) {
      }
    };

    const fetchClosingPrice = async () => {
      try {
        const response = await api.get(
          `/users/stocks/closing-price/${stockId}`
        );
        if (response.data && response.data.closingPrice) {
          setClosingPrice(Number(response.data.closingPrice));
          setCurrentPrice(Number(response.data.closingPrice));
        }
      } catch (error) {
      }
    };

    fetchStockData();
    fetchOwnedStocks();
    fetchClosingPrice();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [stockId]);

  useEffect(() => {
    if (!current || !askBid) {
      if (closingPrice) {
        setOrders([
          {
            id: 1,
            price: closingPrice,
            sellVolume: 0,
            buyVolume: 0,
          },
          {
            id: 2,
            price: closingPrice,
            sellVolume: 0,
            buyVolume: 0,
          },
        ]);
      }
      return;
    }

    const updatedOrders = [
      {
        id: 1,
        price: Number(askBid.askp1),
        sellVolume: Number(askBid.askRSQN1),
        buyVolume: 0,
      },
      {
        id: 2,
        price: Number(askBid.bidp1),
        sellVolume: 0,
        buyVolume: Number(askBid.bidRSQN1),
      },
    ];

    setOrders(updatedOrders);
  }, [current, closingPrice]);

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
            <StockInfo
              stockCode={stockId}
              companyName={stockName}
              closingPrice={closingPrice}
              current={current}
              setCurrentPrice={setCurrentPrice}
            />
          </div>

          <div className="w-full max-w-md mt-[-35px] h-[65vh] flex justify-center items-center">
            <LineChart stockId={stockId} />
          </div>

          <div className="w-full max-w-md flex justify-center fixed bottom-[68px]">
            <StockBottom
              stockId={stockId}
              ownedStocks={ownedStocks}
              orders={orders}
              closingPrice={closingPrice}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default StockPage;

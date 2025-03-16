import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyChart from "../components/MyChart";
import MyTable from "../components/MyTable";
import BackButton from "../../../common/components/BackButton";
import { BarLoader } from "react-spinners";
import api from "../../../utils/api";
import useSSE from "../../../hooks/useSSE";

const MyStockPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [points, setPoints] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], series: [] });
  const [isLoading, setIsLoading] = useState(true);

  const sseData = useSSE("/subscribe/portfolio-price");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [
          userResponse,
          pointsResponse,
          stocksResponse,
          closingPriceResponse,
        ] = await Promise.all([
          api.get("/users"),
          api.get("/users/points"),
          api.get("/users/stocks"),
          api.get("/users/stocks/closing-price"),
        ]);

        setName(userResponse.data.name || "사용자");
        setPoints(pointsResponse.data.point || 0);

        const stocksData = stocksResponse.data.map((stock) => {
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

          return {
            ...stock,
            closingPrice: null,
            totalValue: stock.amount * stock.averagePrice,
            totalReturn: null,
          };
        });

        setStocks(stocksData);

        const stockMap = new Map();
        stocksData.forEach(({ stockName, totalValue }) => {
          stockMap.set(stockName, (stockMap.get(stockName) || 0) + totalValue);
        });

        const totalInvestment = Array.from(stockMap.values()).reduce(
          (sum, value) => sum + value,
          0
        );
        const labels = Array.from(stockMap.keys());
        const series = totalInvestment
          ? Array.from(stockMap.values()).map(
              (value) => (value / totalInvestment) * 100
            )
          : [];

        setChartData({ labels, series });
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <BarLoader height={3} width={195} color="#0046FF" />
        <div className="mt-4 text-xl font-bold text-[#0046FF]">
          나의 보유 주식으로 이동 중!
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-x-hidden flex flex-col items-center px-4 pt-6 pb-20">
      <div className="w-full max-w-md flex items-center relative">
        <span onClick={() => navigate(-1)} className="absolute left-0">
          <BackButton className="w-8 h-8" />
        </span>
      </div>

      <h1 className="font-bold text-2xl mt-8 w-full max-w-md self-start ml-2">
        보유 주식
      </h1>

      <div className="w-full max-w-md flex justify-center mt-4">
        <MyChart chartData={chartData} />
      </div>

      <div className="w-full shadow-md rounded-xl max-w-md mt-1 p-3">
        <MyTable stocks={stocks} />
      </div>

      <div className="w-full max-w-md mt-4 space-y-4">
        <div className="text-sm bg-white shadow-md rounded-xl py-5 w-full text-center">
          <span className="font-bold">{name}</span> 님의 보유 포인트🏅는
          <span className="font-bold"> {points.toLocaleString()}P</span>입니다.
        </div>
      </div>
    </div>
  );
};

export default MyStockPage;

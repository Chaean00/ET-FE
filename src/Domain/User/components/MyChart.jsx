import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import api from "../../../utils/api";

const MyChart = () => {
  const [chartData, setChartData] = useState({ labels: [], series: [] });

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await api.get("/users/stocks");
        const stocks = response.data;

        const stockMap = new Map();
        stocks.forEach(({ stockName, amount, averagePrice }) => {
          const totalValue = amount * averagePrice;
          stockMap.set(stockName, (stockMap.get(stockName) || 0) + totalValue);
        });

        const totalInvestment = Array.from(stockMap.values()).reduce(
          (sum, value) => sum + value,
          0
        );
        const labels = Array.from(stockMap.keys());
        const series = Array.from(stockMap.values()).map(
          (value) => (value / totalInvestment) * 100
        );

        setChartData({ labels, series });
      } catch (error) {
        console.error(
          "차트 데이터 불러오기 실패:",
          error.response?.data || error.message
        );
      }
    };

    fetchStockData();
  }, []);

  const options = {
    chart: {
      type: "donut",
      toolbar: { show: false },
    },
    labels: chartData.labels,
    dataLabels: { enabled: false },
    legend: { show: false },
    tooltip: {
      enabled: true,
      shared: false,
      y: { formatter: (val) => `${val.toFixed(2)}%` },
    },
    states: {
      active: {
        allowMultipleDataPointsSelection: false,
        filter: { type: "none" },
      },
    },
    plotOptions: { pie: { expandOnClick: false } },
  };

  return (
    <div className="flex flex-col items-center">
      {chartData.series.length > 0 ? (
        <Chart
          options={options}
          series={chartData.series}
          type="donut"
          width="250"
        />
      ) : (
        <p>데이터 없음</p>
      )}
    </div>
  );
};

export default MyChart;

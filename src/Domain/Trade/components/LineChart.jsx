import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import api from "../../../utils/api";

const LineChart = ({ stockId }) => {
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await api.get(`/charts/${stockId}`);
        const priceInfos = response.data.priceInfos.map((info) => ({
          x: new Date(info.localDate).getTime(),
          y: info.closePrice,
        }));
        setSeriesData(priceInfos);
      } catch (error) {
        console.error("🚨 차트 데이터 요청 실패:", error);
      }
    };

    fetchChartData();
  }, [stockId]);

  if (!seriesData.length) return <p>차트 데이터 로딩 중...</p>;

  const options = {
    chart: { type: "line", zoom: { enabled: false }, toolbar: { show: false } },
    stroke: { curve: "straight", width: 2.85, colors: ["#0046FF"] },
    dataLabels: { enabled: false },
    grid: { show: false },
    xaxis: { type: "datetime", labels: { show: false } },
    yaxis: { labels: { show: false } },
    tooltip: {
      x: { format: "yyyy-MM-dd" },
      y: { formatter: (value) => value.toLocaleString() },
    },
  };

  const series = [{ name: "Stock Price", data: seriesData }];

  return (
    <Chart options={options} series={series} height={"255%"} type="line" />
  );
};

export default LineChart;

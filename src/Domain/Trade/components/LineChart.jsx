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
          x: new Date(
            `${info.localDate.slice(0, 4)}-${info.localDate.slice(
              4,
              6
            )}-${info.localDate.slice(6, 8)}`
          ).getTime(),
          y: info.closePrice,
        }));
        setSeriesData(priceInfos);
      } catch (error) {
        console.error("차트 데이터 요청 실패:", error);
      }
    };

    fetchChartData();
  }, [stockId]);

  if (!seriesData.length) return <p>차트 데이터 로딩 중...</p>;

  const options = {
    chart: { type: "line", zoom: { enabled: false }, toolbar: { show: false } },
    stroke: { curve: "smooth", width: 2, colors: ["#0046FF"] },
    dataLabels: { enabled: false },
    grid: { show: false },
    xaxis: {
      type: "datetime",
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    tooltip: {
      x: { format: "yyyy-MM-dd" },
      y: { formatter: (value) => `${value.toLocaleString()} 원` },
      marker: { show: false },
    },
    legend: { show: false },
  };

  const series = [{ name: "", data: seriesData }];

  return (
    <Chart
      options={options}
      series={series}
      width={350}
      height={440}
      type="line"
    />
  );
};

export default LineChart;

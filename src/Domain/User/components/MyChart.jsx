import Chart from "react-apexcharts";

const MyChart = ({ chartData }) => {
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

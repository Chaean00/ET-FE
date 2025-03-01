import Chart from "react-apexcharts";

const MyChart = () => {
  const dummyStockData = {
    labels: ["삼성전자", "애플", "테슬라", "엔비디아", "구글"],
    series: [30, 25, 20, 15, 10],
  };

  const options = {
    chart: {
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    labels: dummyStockData.labels,
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: true,
      shared: false,
      y: {
        formatter: (val) => `${val}%`,
      },
    },
    states: {
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
        },
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <Chart
        options={options}
        series={dummyStockData.series}
        type="donut"
        width="250"
      />
    </div>
  );
};

export default MyChart;

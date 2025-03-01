import Chart from "react-apexcharts";

const LineChart = () => {
  const seriesData = [
    { x: new Date("2024-01-01").getTime(), y: 10000 },
    { x: new Date("2024-01-02").getTime(), y: 41000 },
    { x: new Date("2024-01-03").getTime(), y: 35000 },
    { x: new Date("2024-01-04").getTime(), y: 51000 },
    { x: new Date("2024-01-05").getTime(), y: 49000 },
    { x: new Date("2024-01-06").getTime(), y: 62000 },
    { x: new Date("2024-01-07").getTime(), y: 69000 },
    { x: new Date("2024-01-08").getTime(), y: 91000 },
    { x: new Date("2024-01-09").getTime(), y: 148000 },
  ];

  const maxValue = Math.max(...seriesData.map((d) => d.y));
  const minValue = Math.min(...seriesData.map((d) => d.y));
  const maxPoint = seriesData.find((d) => d.y === maxValue);
  const minPoint = seriesData.find((d) => d.y === minValue);

  const options = {
    chart: {
      type: "line",
      zoom: { enabled: false },
      toolbar: { show: false },
      background: "transparent",
    },
    stroke: {
      curve: "straight",
      width: 2.85,
      colors: ["#0046FF"],
    },
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
    },
    tooltip: {
      enabled: true,
      x: { format: "yyyy-MM-dd" },
      y: { formatter: (value) => value.toLocaleString() },
    },
    markers: {
      size: 0,
    },
    annotations: {
      points: [
        {
          x: maxPoint.x,
          y: maxPoint.y,
          marker: { size: 0 },
          label: {
            text: `최고 ${maxPoint.y.toLocaleString()}`,
            style: { color: "red", fontWeight: "550", padding: 0 },
            offsetX: -45,
          },
        },
        {
          x: minPoint.x,
          y: minPoint.y,
          marker: { size: 0 },
          label: {
            text: `최저 ${minPoint.y.toLocaleString()}`,
            style: {
              color: "blue",
              fontWeight: "550",
              padding: 0,
            },
            position: "left",
            offsetX: 50,
          },
        },
      ],
    },
    fill: {
      opacity: 1,
    },
    theme: {
      mode: "light",
    },
  };

  const series = [{ name: "Stock Price", data: seriesData }];

  return (
    <div>
      <Chart options={options} series={series} height={"255%"} type="line" />
    </div>
  );
};

export default LineChart;

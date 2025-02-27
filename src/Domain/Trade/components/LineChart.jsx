import Chart from "react-apexcharts";

const LineChart = () => {
  const seriesData = [
    { x: new Date("2024-01-01").getTime(), y: 10 },
    { x: new Date("2024-01-02").getTime(), y: 41 },
    { x: new Date("2024-01-03").getTime(), y: 35 },
    { x: new Date("2024-01-04").getTime(), y: 51 },
    { x: new Date("2024-01-05").getTime(), y: 49 },
    { x: new Date("2024-01-06").getTime(), y: 62 },
    { x: new Date("2024-01-07").getTime(), y: 69 },
    { x: new Date("2024-01-08").getTime(), y: 91 },
    { x: new Date("2024-01-09").getTime(), y: 148 },
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
      width: 4,
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
    <div
      style={{ width: "90%", height: "350px", backgroundColor: "transparent" }}
    >
      <Chart options={options} series={series} type="line" height="100%" />
    </div>
  );
};

export default LineChart;

import MyTradeEach from "./MyTradeEach";

const MyTrade = () => {
  const tradesData = [
    {
      id: 1,
      company: "삼성전자",
      type: "구매",
      price: "56,700",
      logo: "/images/samsung-logo.png",
    },
    {
      id: 2,
      company: "삼성전자",
      type: "구매",
      price: "56,700",
      logo: "/images/samsung-logo.png",
    },
    {
      id: 3,
      company: "삼성전자",
      type: "구매",
      price: "56,700",
      logo: "/images/samsung-logo.png",
    },
  ];

  return (
    <div>
      <MyTradeEach date="2월 25일 화요일" trades={tradesData} />
      <MyTradeEach date="2월 25일 화요일" trades={tradesData} />
    </div>
  );
};
export default MyTrade;

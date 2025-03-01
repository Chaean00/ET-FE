import MyTradeEach from "./MyTradeEach";
import samsung from "../../../assets/trade/samsung.png";

const MyTrade = () => {
  const tradesData = [
    {
      id: 1,
      company: "삼성전자",
      type: "구매",
      price: "56,700",
      logo: samsung,
    },
    {
      id: 2,
      company: "삼성전자",
      type: "구매",
      price: "56,700",
      logo: samsung,
    },
    {
      id: 3,
      company: "삼성전자",
      type: "구매",
      price: "56,700",
      logo: samsung,
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

import { useState } from "react";
import SearchCompany from "../components/SearchCompany";
import MyAccount from "../../User/components/MyAccount";
import MyHeld from "../../User/components/MyHeld";
import MyInterested from "../../User/components/MyInterested";
import Footer from "../../../common/components/Footer";
import samsung from "../../../assets/trade/samsung.png";

const TradeMainPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const stocks = [
    {
      id: 1,
      name: "삼성전자",
      price: 57200,
      quantity: 1,
      profit: 5000,
      profitRate: 4.3,
      logo: samsung,
    },
    {
      id: 2,
      name: "LG전자",
      price: 103000,
      quantity: 2,
      profit: -3000,
      profitRate: -2.1,
      logo: samsung,
    },
    {
      id: 3,
      name: "SK하이닉스",
      price: 123400,
      quantity: 1,
      profit: 2500,
      profitRate: 2.0,
      logo: samsung,
    },
    {
      id: 4,
      name: "네이버",
      price: 215000,
      quantity: 3,
      profit: 10000,
      profitRate: 5.5,
      logo: samsung,
    },
  ];

  const interests = [
    { id: 1, name: "위너스", price: 34000, change: 1500, changeRate: 4.6 },
    { id: 2, name: "삼성전자", price: 57200, change: -500, changeRate: -1.2 },
    { id: 3, name: "LG화학", price: 783000, change: 3200, changeRate: 0.5 },
    { id: 4, name: "카카오", price: 63000, change: -2200, changeRate: -3.4 },
    { id: 5, name: "네이버", price: 215000, change: 1500, changeRate: 0.7 },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-md mx-auto flex justify-between items-center mt-3 space-x-14">
        <div className="text-3xl font-bold">투자</div>
        <SearchCompany onSearch={handleSearch} />
      </div>

      <div className="bg-white rounded-lg ">
        <MyAccount
          accountNumber="212-23-565655"
          evaluationAmount={1222333}
          profit={935}
          profitRate={4.31}
          availableAmount={110}
        />
      </div>

      <div className="mb-6">
        <MyHeld stocks={stocks} />
      </div>

      <div className="mb-12">
        <MyInterested interests={interests} />
      </div>

      <Footer className="fixed bottom-0 w-full max-w-md bg-white border-t" />
    </div>
  );
};

export default TradeMainPage;

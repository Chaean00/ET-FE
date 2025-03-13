import { useState, useEffect } from "react";
import api from "../../../utils/api";
import SearchCompany from "../components/SearchCompany";
import MyAccount from "../../User/components/MyAccount";
import MyHeld from "../../User/components/MyHeld";
import MyInterested from "../../User/components/MyInterested";

const TradeMainPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [totalAccount, setTotalAccount] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalProfitRate, setTotalProfitRate] = useState(0);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const fetchStocks = async () => {
      try {
        const response = await api.get(`/stocks/search?query=${searchQuery}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error("주식 검색 실패:", error);
      }
    };

    fetchStocks();
  }, [searchQuery]);

  return (
    <div className="w-full flex flex-col pb-15">
      <div className="max-w-md mx-auto flex justify-between items-center mt-3 space-x-14">
        <div className="text-3xl font-bold mb-2">투자</div>

        <SearchCompany onSearch={handleSearch} searchResults={searchResults} />
      </div>
      <div className="flex-1 w-full max-w-md mx-auto mt-6">
        <div className="bg-white rounded-lg">
          <MyAccount
            evaluationAmount={totalAccount}
            profit={totalProfit}
            profitRate={totalProfitRate}
          />
        </div>

        <div className="mb-6">
          <MyHeld
            setTotalAccount={setTotalAccount}
            setTotalProfit={setTotalProfit}
            setTotalProfitRate={setTotalProfitRate}
          />
        </div>

        <div className="mb-12">
          <MyInterested />
        </div>
      </div>
    </div>
  );
};

export default TradeMainPage;

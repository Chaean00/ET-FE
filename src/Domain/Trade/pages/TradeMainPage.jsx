import { useState, useEffect } from "react";
import api from "../../../utils/api";
import SearchCompany from "../components/SearchCompany";
import MyAccount from "../../User/components/MyAccount";
import MyHeld from "../../User/components/MyHeld";
import MyInterested from "../../User/components/MyInterested";
import { BarLoader } from "react-spinners";

const TradeMainPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [accountData, setAccountData] = useState({
    accountNumber: "정보 없음",
    availableAmount: 0,
  });

  const [heldStocks, setHeldStocks] = useState([]);
  const [totalAccount, setTotalAccount] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalProfitRate, setTotalProfitRate] = useState(0);
  const [interestedStocks, setInterestedStocks] = useState([]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await api.get(`/stocks/search?query=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      setSearchResults([]);
    }
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        accountRes,
        heldRes,
        heldClosingPriceRes,
        interestedRes,
        interestedClosingPriceRes,
      ] = await Promise.all([
        api.get("/users/account"),
        api.get("/users/stocks"),
        api.get("/users/stocks/closing-price"),
        api.get("/users/favorite"),
        api.get("/users/stocks/favorite/close-price"),
      ]);

      setAccountData({
        accountNumber: accountRes.data.account || "정보 없음",
        availableAmount: accountRes.data.deposit || 0,
      });

      const heldData = Array.isArray(heldRes.data)
        ? heldRes.data.map((stock) => {
            const closingStock = Array.isArray(heldClosingPriceRes.data)
              ? heldClosingPriceRes.data.find(
                  (s) => s.stockCode === stock.stockCode
                )
              : null;

            const closingPrice =
              closingStock?.closingPrice || stock.averagePrice || 0;

            return {
              ...stock,
              closingPrice,
              totalValue: closingPrice * stock.amount,
              totalReturn:
                stock.averagePrice > 0
                  ? ((closingPrice - stock.averagePrice) / stock.averagePrice) *
                    100
                  : 0,
              diffPrice: (closingPrice - stock.averagePrice) * stock.amount,
            };
          })
        : [];

      setHeldStocks(heldData);

      const totalAccountValue = heldData.reduce(
        (acc, stock) => acc + stock.totalValue,
        0
      );
      const totalProfitValue = heldData.reduce(
        (acc, stock) =>
          acc + (stock.totalValue - stock.amount * stock.averagePrice),
        0
      );
      const totalProfitRateValue =
        totalAccountValue > 0
          ? ((totalProfitValue / totalAccountValue) * 100).toFixed(2)
          : 0;

      setTotalAccount(totalAccountValue);
      setTotalProfit(totalProfitValue);
      setTotalProfitRate(totalProfitRateValue);

      const interestedData = interestedRes.data.map((stock) => {
        const closingStock = interestedClosingPriceRes.data.find(
          (s) => s.stockCode === stock.stockCode
        );

        return {
          stockCode: stock.stockCode,
          stockName: stock.stockName,
          currentPrice: closingStock ? closingStock.closingPrice : null,
          priceChange: 0,
          changeRate: 0,
          closingPrice: closingStock ? closingStock.closingPrice : null,
          isFavorite: true,
        };
      });

      setInterestedStocks(interestedData);
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
      setError("데이터를 불러오는 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="scrollbar-custom overflow-y-auto relative w-full h-screen flex flex-col pb-15">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
          <BarLoader height={3} width={195} color="#0046FF" />
          <div className="mt-4 text-xl font-bold text-[#0046FF]">
            투자 페이지로 이동 중!
          </div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
          <div className="text-red-500 text-lg font-bold">🚨 {error}</div>
        </div>
      ) : (
        <>
          <div className="max-w-md mx-auto flex justify-between items-center mt-3 space-x-14">
            <div className="text-3xl font-bold mb-2">투자</div>
            <SearchCompany
              onSearch={handleSearch}
              searchResults={searchResults}
            />
          </div>

          <div className="flex-1 w-full max-w-md mx-auto mt-6">
            <div className="bg-white rounded-lg">
              <MyAccount
                evaluationAmount={totalAccount}
                profit={totalProfit}
                profitRate={totalProfitRate}
                accountData={accountData}
              />
            </div>

            <div className="mb-6">
              <MyHeld heldStocks={heldStocks} />
            </div>

            <div className="mb-12">
              <MyInterested interestedStocks={interestedStocks} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TradeMainPage;

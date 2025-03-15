import { useState, useEffect, useCallback } from "react";
import api from "../../../utils/api";
import SearchCompany from "../components/SearchCompany";
import MyAccount from "../../User/components/MyAccount";
import MyHeld from "../../User/components/MyHeld";
import MyInterested from "../../User/components/MyInterested";
import { BarLoader } from "react-spinners";
import default_img from "../../../assets/trade/default_img.png";
import useSSE from "../../../hooks/useSSE";
import throttle from "lodash/throttle";

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
  const [interestedStocks, setInterestedStocks] = useState([]);
  const [totalAccount, setTotalAccount] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalProfitRate, setTotalProfitRate] = useState(0);
  const [stockCodes, setStockCodes] = useState("");

  // SSE로부터 실시간 체결 데이터 받음
  const { current } = useSSE("/subscribe", stockCodes);

  // 검색 핸들러
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

  // 전체 데이터 Fetch: 계좌 정보, 보유주식, 전일 종가, 관심주식, 관심주식의 전일 종가
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

      // 보유종목 데이터 생성
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
              stockImage:
                stock.stockImage && stock.stockImage.trim() !== ""
                  ? stock.stockImage
                  : default_img,
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

      // 총 계좌값 계산
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

      // 관심종목 데이터 생성 (초기엔 전일 종가 정보를 그대로 사용)
      const interestedData = Array.isArray(interestedRes.data)
        ? interestedRes.data.map((stock) => {
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
          })
        : [];
      setInterestedStocks(interestedData);

      // 보유종목과 관심종목에서 중복 없이 stockCode를 모아서 stockCodes 생성
      const heldCodes = heldData.map((stock) => stock.stockCode);
      const interestedCodes = interestedData.map((stock) => stock.stockCode);
      const codes = [...new Set([...heldCodes, ...interestedCodes])].join(",");
      setStockCodes(codes);
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

  // throttled 함수를 통해 지나치게 잦은 업데이트를 방지 (100ms 간격)
  const throttledUpdateStocks = useCallback(
    throttle((sseData) => {
      const { stockCode, currentPrice, priceChange, changeRate } = sseData;
      const newPrice = Number(currentPrice);


      // 보유종목 업데이트 및 총계 계산
      setHeldStocks((prevStocks) => {
        const updatedStocks = prevStocks.map((stock) => {
          if (stock.stockCode === stockCode) {
            return {
              ...stock,
              totalValue: newPrice * stock.amount,
              totalReturn:
                stock.averagePrice > 0
                  ? ((newPrice - stock.averagePrice) / stock.averagePrice) *
                    100
                  : 0,
              diffPrice: (newPrice - stock.averagePrice) * stock.amount,
            };
          }
          return stock;
        });

        // 총계 계산
        const newTotalAccount = updatedStocks.reduce(
          (acc, stock) => acc + stock.totalValue,
          0
        );
        const newTotalProfit = updatedStocks.reduce(
          (acc, stock) =>
            acc + (stock.totalValue - stock.amount * stock.averagePrice),
          0
        );
        setTotalAccount(newTotalAccount);
        setTotalProfit(newTotalProfit);
        setTotalProfitRate(
          newTotalAccount > 0
            ? (newTotalProfit / newTotalAccount * 100).toFixed(2)
            : 0
        );

        return updatedStocks;
      });

      // 관심종목 업데이트: SSE 데이터가 있으면 해당 값으로 덮어쓰고, 없으면 기존 closingPrice 유지
      setInterestedStocks((prevStocks) =>
        prevStocks.map((stock) => {
          if (String(stock.stockCode) === String(stockCode)) {
            // console.log("업데이트 관심종목:", stock.stockCode);
            // console.log(
            //   "전달받은 SSE 데이터:",
            //   currentPrice,
            //   priceChange,
            //   changeRate
            // );
            return {
              ...stock,
              // SSE 데이터가 있다면 무조건 덮어씁니다.
              currentPrice: currentPrice !== undefined ? Number(currentPrice) : stock.closingPrice,
              priceChange: priceChange !== undefined ? Number(priceChange) : 0,
              changeRate: changeRate !== undefined ? Number(changeRate) : 0,
            };
          }
          return stock;
        })
      );
    }, 100),
    []
  );

  // SSE에서 들어온 실시간 데이터 업데이트 처리
  useEffect(() => {
    if (!current || !current.stockCode) return;
    throttledUpdateStocks(current);
  }, [current, throttledUpdateStocks]);

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
            <div>
              <MyInterested interestedStocks={interestedStocks} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TradeMainPage;
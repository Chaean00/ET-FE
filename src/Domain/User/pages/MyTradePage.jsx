import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MyTrade from "../components/MyTrade";
import BackButton from "../../../common/components/BackButton";
import api from "../../../utils/api";
import { BarLoader } from "react-spinners";

const MyTradePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [tradeStatus, setTradeStatus] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const tradeCache = useMemo(() => new Map(), []);

  useEffect(() => {
    setCurrentPage(0);
  }, [tradeStatus, pageSize]);

  const fetchTradeHistory = useCallback(async () => {
    const cacheKey = `${currentPage}-${pageSize}-${tradeStatus || "all"}`;

    if (tradeCache.has(cacheKey)) {
      const cachedData = tradeCache.get(cacheKey);
      setTradeHistory(cachedData.content);
      setTotalPages(cachedData.totalPages);
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.get("/users/history", {
        params: {
          page: currentPage,
          size: pageSize,
          tradeStatus: tradeStatus || null,
        },
      });

      const data = response.data;

      tradeCache.set(cacheKey, {
        content: data.content,
        totalPages: data.totalPages,
      });

      setTradeHistory(data.content);
      setTotalPages(data.totalPages);

      if (data.totalPages === 0) {
        setTotalPages(0);
        setCurrentPage(-1);
      }
    } catch (error) {
      console.error(
        "거래 내역 불러오기 실패:",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize, tradeStatus, tradeCache]);

  useEffect(() => {
    fetchTradeHistory();
  }, [fetchTradeHistory]);

  const handleCancelTrade = async (trade) => {
    try {
      await api.post("/trades/cancel", {
        tradeId: trade.historyId,
        position: trade.position,
        stockCode: trade.stockCode,
        price: trade.price,
      });

      setTradeHistory((prevTrades) =>
        prevTrades.map((t) =>
          t.historyId === trade.historyId
            ? { ...t, tradeStatus: "CANCELLED" }
            : t
        )
      );
      setShowSuccessModal(true);
    } catch (error) {
      console.error("거래 취소 실패:", error.response?.data || error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <BarLoader height={3} width={195} color="#0046FF" />
        <div className="mt-4 text-xl font-bold text-[#0046FF]">
          나의 거래 내역으로 이동 중!
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden flex flex-col items-center pb-10">
      <div className="w-full max-w-md mx-auto flex items-center relative pt-6">
        <span onClick={() => navigate(-1)} className="absolute left-0">
          <BackButton className="w-8 h-8" />
        </span>
      </div>

      <h1 className="font-bold text-2xl ml-2 mt-8 w-full max-w-md mx-auto">
        거래 내역
      </h1>

      <div className="mt-5 w-full max-w-md px-2 space-y-4 mx-auto mb-10">
        <MyTrade
          trades={tradeHistory}
          onCancelTrade={handleCancelTrade}
          tradeStatus={tradeStatus}
          setTradeStatus={setTradeStatus}
          pageSize={pageSize}
          setPageSize={setPageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          showSuccessModal={showSuccessModal}
          setShowSuccessModal={setShowSuccessModal}
        />
      </div>
    </div>
  );
};

export default MyTradePage;

import { useEffect, useState, useMemo, useCallback } from "react";
import api from "../../../utils/api";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import UnholdSuccessModal from "../../Trade/components/UnholdSuccessModal";
import default_img from "../../../assets/trade/default_img.png";

dayjs.locale("ko");

const MyTrade = () => {
  const [tradeHistory, setTradeHistory] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [tradeStatus, setTradeStatus] = useState(""); // 필터링 상태 (전체, PENDING, EXECUTED, CANCELLED)
  const [pageSize, setPageSize] = useState(10); // 한 페이지당 데이터 개수
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

  // tradeCache: 동일한 요청 결과를 저장하기 위한 Map (캐싱)
  const tradeCache = useMemo(() => new Map(), []);

  // tradeStatus 또는 pageSize가 변경되면 현재 페이지를 0으로 초기화
  useEffect(() => {
    setCurrentPage(0);
  }, [tradeStatus, pageSize]);

  // fetchTradeHistory 함수: 캐싱을 적용해 API 호출 결과를 재사용
  const fetchTradeHistory = useCallback(async () => {
    // 캐시 키 생성 (현재 페이지, 페이지 크기, 필터 상태)
    const cacheKey = `${currentPage}-${pageSize}-${tradeStatus || "all"}`;

    // 캐시에 저장된 데이터가 있으면 해당 데이터를 사용
    if (tradeCache.has(cacheKey)) {
      const cachedData = tradeCache.get(cacheKey);
      setTradeHistory(cachedData.content);
      setTotalPages(cachedData.totalPages);
      return;
    }

    try {
      const response = await api.get("/users/history", {
        params: {
          page: currentPage,
          size: pageSize,
          tradeStatus: tradeStatus || null, // 필터 적용
        },
      });

      const data = response.data;
      // 캐시에 저장
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
    }
  }, [currentPage, pageSize, tradeStatus, tradeCache]);

  // 페이지, 필터, 크기가 변경될 때마다 fetchTradeHistory 호출
  useEffect(() => {
    fetchTradeHistory();
  }, [fetchTradeHistory]);

  // 거래 취소 함수
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

  return (
    <div className="w-full overflow-y max-w-md space-y-4">
      {/* 필터링 및 페이지 크기 선택 */}
      <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
        <select
          value={tradeStatus}
          onChange={(e) => setTradeStatus(e.target.value)}
          className="rounded p-2 text-sm"
        >
          <option value="">전체</option>
          <option value="PENDING">대기 중</option>
          <option value="EXECUTED">체결됨</option>
          <option value="CANCELLED">취소됨</option>
        </select>

        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="rounded p-2 text-sm"
        >
          <option value="5">5개씩 보기</option>
          <option value="10">10개씩 보기</option>
        </select>
      </div>

      {/* 거래 내역 */}
      {tradeHistory.length > 0 ? (
        tradeHistory.map((trade, index) => {
          const date =
            trade.tradeStatus === "PENDING" ? trade.createdAt : trade.updatedAt;
          const formattedDate = dayjs(date).format("M월 D일 dddd");

          const isBuy = trade.position === "BUY";
          const isExecuted = trade.tradeStatus === "EXECUTED";
          const isCancelled = trade.tradeStatus === "CANCELLED";
          const isPending = trade.tradeStatus === "PENDING";

          let statusText = "";
          if (isExecuted) statusText = isBuy ? "구매 체결" : "판매 체결";
          if (isCancelled) statusText = isBuy ? "구매 취소" : "판매 취소";
          if (isPending) statusText = isBuy ? "구매 대기" : "판매 대기";

          let textColor = "text-black";
          if (isExecuted) textColor = isBuy ? "text-red-500" : "text-blue-500";
          if (isCancelled) textColor = "text-black line-through";
          if (isPending) textColor = "text-gray-400";

          return (
            <div key={index} className="space-y-3">
              {index === 0 ||
              formattedDate !==
                dayjs(
                  tradeHistory[index - 1].tradeStatus === "PENDING"
                    ? tradeHistory[index - 1].createdAt
                    : tradeHistory[index - 1].updatedAt
                ).format("M월 D일 dddd") ? (
                <h2 className="text-gray-700 text-md font-bold">
                  {formattedDate}
                </h2>
              ) : null}
              <div className="bg-white shadow-md rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img
                      src={trade.img}
                      className="w-14 h-14 object-contain rounded-4xl"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold text-black">{trade.stockName}</p>
                      <p className={`text-sm font-light ${textColor}`}>
                        {statusText} <br />
                        {trade.amount}주
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <p className={`font-bold text-md ${textColor}`}>
                      {trade.price.toLocaleString()}원
                    </p>
                    {isPending && (
                      <button
                        onClick={() => handleCancelTrade(trade)}
                        className="cursor-pointer underline text-sm"
                      >
                        취소
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500 min-h-[1314px]">
          거래 내역이 없습니다.
        </p>
      )}

      {/* 페이지네이션 버튼 */}
      <div className="flex justify-center space-x-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage <= 0}
          className={`px-3 py-2 rounded ${
            currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          이전
        </button>

        <span className="px-3 py-2 text-sm">
          {currentPage + 1} / {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          disabled={currentPage === totalPages - 1}
          className={`px-3 py-2 rounded ${
            currentPage === totalPages - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          다음
        </button>
      </div>

      {showSuccessModal && (
        <UnholdSuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
    </div>
  );
};

export default MyTrade;

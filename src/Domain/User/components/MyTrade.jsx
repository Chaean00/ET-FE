import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import UnholdSuccessModal from "../../Trade/components/UnholdSuccessModal";
import default_img from "../../../assets/trade/default_img.png";

dayjs.locale("ko");

const MyTrade = () => {
  const [tradeHistory, setTradeHistory] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [tradeStatus, setTradeStatus] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

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

      const updatedTrades = data.content.map((trade) => ({
        ...trade,
        img: trade.img && trade.img.trim() !== "" ? trade.img : default_img,
      }));

      setTradeHistory(data.content);
      setTotalPages(data.totalPages);

      if (data.totalPages === 0) {
        setTotalPages(0);
        setCurrentPage(-1);
      }
    } catch (error) {}
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
    } catch (error) {}
  };

  return (
    <div className="w-full overflow-y max-w-md space-y-4">
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

      {trades.length > 0 ? (
        trades.map((trade, index) => {
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
                  trades[index - 1].tradeStatus === "PENDING"
                    ? trades[index - 1].createdAt
                    : trades[index - 1].updatedAt
                ).format("M월 D일 dddd") ? (
                <h2 className="text-gray-700 text-md font-bold">
                  {formattedDate}
                </h2>
              ) : null}

              <div className="bg-white shadow-md rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img
                      src={trade.img || default_img}
                      className="w-14 h-14 object-contain rounded-4xl"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = default_img;
                      }}
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
                        onClick={() => onCancelTrade(trade)}
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
        <p className="text-center text-gray-500">거래 내역이 없습니다.</p>
      )}
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

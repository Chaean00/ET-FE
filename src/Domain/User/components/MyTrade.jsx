import { useEffect, useState } from "react";
import api from "../../../utils/api";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

const MyTrade = () => {
  const [tradeHistory, setTradeHistory] = useState([]);

  useEffect(() => {
    const fetchTradeHistory = async () => {
      try {
        const response = await api.get("/users/history");
        let data = response.data;

        data.sort((a, b) => {
          const dateA =
            a.tradeStatus === "PENDING"
              ? new Date(a.createdAt)
              : new Date(a.updatedAt);
          const dateB =
            b.tradeStatus === "PENDING"
              ? new Date(b.createdAt)
              : new Date(b.updatedAt);
          return dateB - dateA;
        });

        setTradeHistory(data);
      } catch (error) {
        console.error(
          "거래 내역 불러오기 실패:",
          error.response?.data || error.message
        );
      }
    };

    fetchTradeHistory();
  }, []);

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
          t.id === trade.id ? { ...t, tradeStatus: "CANCELLED" } : t
        )
      );
    } catch (error) {
      console.error("거래 취소 실패:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
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
              <div className="bg-white shadow-md rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://static.toss.im/png-icons/securities/icn-sec-fill-005930.png"
                      className="w-12 h-12 object-contain rounded-4xl"
                    />
                    <div className="flex flex-col">
                      <p className="font-bold text-black">{trade.stockName}</p>
                      <p className={`text-sm font-light ${textColor}`}>
                        {statusText}
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
        <p className="text-center text-gray-500">거래 내역이 없습니다.</p>
      )}
    </div>
  );
};

export default MyTrade;

const MyTradeEach = ({ date, trades }) => {
  return (
    <div className="w-full max-w-md">
      <div className="text-gray-600 text-sm font-semibold mb-2 mt-7.5">
        {date}
      </div>

      <div className="space-y-2 text-md">
        {trades.map((trade) => {
          const isBuy = trade.type === "구매";
          const isCompleted = trade.state === "체결";
          const isCancelled = trade.state === "취소";
          const isPending = trade.state === "대기";

          const priceColor = isCompleted
            ? isBuy
              ? "text-red-500"
              : "text-blue-500"
            : isCancelled
            ? "text-gray-400 line-through"
            : "text-gray-500";

          return (
            <div
              key={trade.id}
              className="bg-white shadow-md rounded-2xl p-2.5 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={trade.logo}
                  alt={trade.company}
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <div className="text-black font-bold">{trade.company}</div>
                  <div className="text-gray-400 font-light text-sm flex items-center space-x-1">
                    <span>{trade.type}</span>

                    <span>{trade.state}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <div className={`font-semibold text-sm ${priceColor}`}>
                  {trade.price}원
                </div>
                {isPending && (
                  <button className="cursor-pointer text-sm text-black font-bold border-bottom border-gray-400 px-1 py-1 rounded-md underline">
                    취소
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyTradeEach;

const MyTradeEach = ({ date, trades }) => {
  return (
    <div className="w-full max-w-md">
      <div className="text-gray-600 text-sm font-semibold mb-2 mt-7.5">
        {date}
      </div>

      <div className="space-y-2 text-md">
        {trades.map((trade) => (
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
                <div className="text-gray-400 font-light text-sm">
                  {trade.type}
                </div>
              </div>
            </div>

            <div className="text-red-500 font-semibold text-sm">
              {trade.price}원
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTradeEach;

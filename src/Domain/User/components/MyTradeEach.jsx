const MyTradeEach = ({ date, trades }) => {
  return (
    <div className="w-full max-w-md">
      <div className="text-gray-600 text-sm font-semibold mb-2">{date}</div>

      <div className="space-y-2">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="bg-white shadow-md rounded-2xl p-2.5 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              {/* <img
                src={trade.logo}
                alt={trade.company}
                className="w-12 h-12 object-contain"
              /> 메모 : 나중에 로고 이미지 넣기 */}
              <div>
                <div className="text-black font-bold">{trade.company}</div>
                <div className="text-gray-500 text-sm">{trade.type}</div>
              </div>
            </div>

            <div className="text-red-500 font-semibold">{trade.price}원</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTradeEach;

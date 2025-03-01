const TradeHeader = ({ companyName, currentPrice, changePercent }) => {
  const changeColor =
    changePercent > 0
      ? "text-red-500"
      : changePercent < 0
      ? "text-blue-500"
      : "text-gray-500";

  return (
    <div className="mt-2.5 flex flex-col items-center w-full">
      <p className="text-gray-400 text-md font-light text-center w-full">
        {companyName}
      </p>

      <div className="flex items-end space-x-2">
        <p className="text-md text-gray-800 font-light">
          {currentPrice.toLocaleString()}원
        </p>
        <p className={`text-md font-light ${changeColor}`}>
          {changePercent > 0
            ? `+${changePercent.toFixed(2)}%`
            : `${changePercent.toFixed(2)}%`}
        </p>
      </div>
    </div>
  );
};

export default TradeHeader;

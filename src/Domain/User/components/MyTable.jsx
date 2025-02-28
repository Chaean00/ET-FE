const MyTable = () => {
  const stocks = [
    {
      id: 1,
      name: "삼성전자",
      amount: "전체 금액",
      profit: "전체 수익률%",
      isProfit: false,
    },
    {
      id: 2,
      name: "SK하이닉스",
      amount: "전체 금액",
      profit: "전체 수익률%",
      isProfit: true,
    },
    {
      id: 3,
      name: "하이브",
      amount: "전체 금액",
      profit: "전체 수익률%",
      isProfit: true,
    },
    {
      id: 4,
      name: "하이브",
      amount: "전체 금액",
      profit: "전체 수익률%",
      isProfit: false,
    },
  ];

  return (
    <div className="space-y-3 py-10 bg-white shadow-md rounded-xl p-4 w-full max-w-xs">
      {stocks.map((stock) => (
        <div key={stock.id} className="flex justify-between items-center">
          <span className="text-sm text-black">{stock.name}</span>

          <span
            className={`text-xs ${
              stock.isProfit ? "text-blue-500" : "text-red-500"
            }`}
          >
            {stock.isProfit
              ? `+ ${stock.amount}(${stock.profit})`
              : `- ${stock.amount}(${stock.profit})`}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MyTable;

const MyTable = ({ stocks }) => {
  return (
    <div className="space-y-3 py-5 bg-white p-3 w-full max-w-xs">
      {stocks.length > 0 ? (
        <table className="w-full text-sm text-left">
          <thead>
            <tr>
              <th className="pb-2">종목명</th>
              <th className="pb-2">총 평가금액</th>
              <th className="pb-2 text-right">수익률</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={index}>
                <td className="py-2">{stock.stockName}</td>
                <td className="py-2">{`${Math.round(
                  stock.totalValue
                ).toLocaleString()} 원`}</td>
                <td className="text-right py-2">
                  {stock.totalReturn !== null ? (
                    <span
                      className={
                        stock.totalReturn >= 0
                          ? "text-red-500"
                          : "text-blue-500"
                      }
                    >
                      {`${stock.totalReturn}%`}
                    </span>
                  ) : (
                    <span className="text-gray-400">0%</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">보유 주식이 없습니다.</p>
      )}
    </div>
  );
};

export default MyTable;
